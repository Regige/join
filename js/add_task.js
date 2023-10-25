let taskPrio = "";
let subtasks = [];
let taskBoardField = "";


// Create new Task

/**
 * This function starts the functions to create a new task.
 */

async function createNewTask() {
    if(user === 'guest') {
        showPopup('Cannot be saved as a guest. Please create an account');
        closeNewContacts();
    } else {
    let taskTitle = document.getElementById('task-title');
    let taskDescription = document.getElementById('task-description');
    let assignedTo = getAssignedToUsers();
    let dueDate = document.getElementById('task-date');
    let taskCategory = getTaskCategory();
    let idIndex = getIdIndex();
    let taskBoard = getTaskBoardField();
    

    await saveNewTask(taskTitle, taskDescription, assignedTo, dueDate, taskCategory, idIndex, taskBoard);
    resetTaskForm();
    removeStringFromLocalStorage();
    showPopup('Task added to board');
    openHTML('/board.html');
    }
}

/**
 * This function saves the values from the form field and saves them as an object within the list array.
 * The list array is than saved in localStorage and on the server as well.
 * 
 * @param {string} taskTitle This variable is the name of the task
 * @param {string} taskDescription This variable is the description of the task
 * @param {object} assignedTo This variable is an array of all the assigned contacts
 * @param {string} dueDate This variable is the date of the task
 * @param {string} taskCategory This variable is the category of the task
 * @param {number} idIndex This variable is the given Id of the task
 * @param {string} taskBoard This variable is the name of the board where the task will be placed
 */

async function saveNewTask(taskTitle, taskDescription, assignedTo, dueDate, taskCategory, idIndex, taskBoard) {
    let newTask = {
        'id':idIndex,
        'headline': taskTitle.value,
        'text': taskDescription.value,
        'task_user': assignedTo,
        'date': dueDate.value,
        'priority': taskPrio,
        'category': taskCategory,
        'subtasks': subtasks,
        'task_board': taskBoard,
    }

    list.push(newTask);

    await SaveInLocalStorageAndServer(user, listString, list);
}


/**
 * This function empties all the input fileds from the form element
 */

function resetTaskForm() {
    document.getElementById('task-title').value = "";
    document.getElementById('task-description').value = "";
    document.getElementById('task-date').value = "";
    if(taskPrio) {
    document.getElementById(`prio-bt-${taskPrio}`).style = null;
    taskPrio = "";
    }
    document.getElementById('category').value = "";
    document.getElementById('task-sub-text').innerHTML = "";
    subtasks = [];
}

/**
 * This function saves the checked contacts with their additional information within an object
 * and than inside the array assignedTo.
 * 
 * @returns An array of all the choosen contacts
 */

function getAssignedToUsers() {
    let assignedTo = [];

    document.querySelectorAll('[type="checkbox"]').forEach(item => {
        if(item.checked === true) {
            let divSib = item.previousElementSibling;
            let divIcon = divSib.firstElementChild;
         
            assignedTo.push({
                'full_name': item.value,
                'color': divIcon.style.backgroundColor,
                'name': divIcon.innerHTML,
            });
        } 
    });

    return assignedTo;
}

/**
 * This function assigns the right color to the category and saves it within an object.
 * 
 * @returns An object with the task category and its corresponding color
 */

function getTaskCategory() {
    let taskCategoryValue = document.getElementById('category').value;

    if(taskCategoryValue === "Work") {
        color = '#1FD7C1'
    } if(taskCategoryValue === "Privat") {
        color = '#0038FF'; 
    } if(taskCategoryValue === "Shopping") {
        color = '#FF7A00';
    } if(taskCategoryValue === "Other") {
        color = '#FFBB2B';
    };

    let taskCategory = {
        'text': taskCategoryValue,
        'color': color
    };
    return taskCategory;
}

/**
 * This function sets a Id. First a array of all the excisting Id's is created. 
 * Than the array listOfIds is sorted form lowest number to highest. 
 * 
 * @returns The function getFreeIdIndex(listOfIds) returns a Id which is not given yet.
 */

function getIdIndex() {
    let listOfIds = [];

    for (let i = 0; i < list.length; i++) {
        const task = list[i];
            listOfIds.push(task['id']);
    } 

    listOfIds.sort(function(a, b) {
        return a - b;
        });

    return getFreeIdIndex(listOfIds);
}

/**
 * This function checks the not given Id's through a for loop and returns a number is not used yet.
 * 
 * @param {number} listOfIds This variable is a array of Id's form the list array.
 * @returns The function getFreeIdIndex(listOfIds) returns a Id which is not given yet.
 */

function getFreeIdIndex(listOfIds) {
    let freeIdIndex = [];

    for (let j = 0; j < listOfIds.length; j++) {
        if(j != listOfIds[j]) {
            freeIdIndex.push(j);
        }
    }

    if(freeIdIndex.length === 0) {
        let lastId = listOfIds[listOfIds.length - 1];
        return lastId + 1;
    } else {
        return freeIdIndex[0];
    }
}

/**
 * This function sets the global variable taskPrio with the content of prio and 
 * calls setPrioButtonColor(prio).
 * 
 * @param {string} prio This variable stands for the choosen priority.
 */

function setTaskPrio(prio) {
    taskPrio = prio;

    setPrioButtonColor(prio);
}

/**
 * This function sets the color to the according prio.
 * 
 * @param {string} prio This variable stands for the choosen priority.
 */

function setPrioButtonColor(prio) {
    let prios = ['Urgent', 'Medium', 'Low'];
    for (let i = 0; i < prios.length; i++) {
        const prioSgl = prios[i];
        document.getElementById(`prio-bt-${prioSgl}`).style = null;
    }

    let prioButton = document.getElementById(`prio-bt-${prio}`)
    
    if(prio == 'Urgent') {
        prioButton.style = "backGround-color: #ff3d00; color: white";
    }
    if(prio == 'Medium') {
        prioButton.style = "backGround-color: #ffa800; color: white";
    }
    if(prio == 'Low') {
        prioButton.style = "backGround-color: #7AE129; color: white";
    };
}

/**
 * This function saves the board category in localStorage. On the board page the add new task buttons
 * will call this function to save a board category.
 * 
 * @param {string} fieldCategory This variable is the name of the board category
 */

function saveStringInLocalStorage(fieldCategory) {
    localStorage.setItem('fieldCategory', fieldCategory);
}

/**
 * This function loads at the beginning of initalizing the page the value. 
 */

function loadStringFromLocalStorage() {            
    taskBoardField = localStorage.getItem('fieldCategory');
    if(taskBoardField == null){
        taskBoardField = "";
    }
}

/**
 * This function will delete the what is saved in localStorage with the key 'fieldCategory'.
 */

function removeStringFromLocalStorage() {
localStorage.removeItem('fieldCategory');
taskBoardField = "";
}

/**
 * This function returns a value depending on what is defined in taskBoardField.
 * 
 * @returns A string which defines the board catergory
 */

function getTaskBoardField() {
    if(taskBoardField === "") {
        return "to_do";
    } else {
        return taskBoardField;
    }
}



// Edit Task

/**
 * This function starts the edit function for regular users or shows a popup for 
 * guest users
 * 
 * @param {number} id This variable is the assigned id of the task
 */

function editTask(id) {
    if(user === 'guest') {
        showPopup('Cannot be changed as a guest. Please create an account');
        closeNewContacts();
    } else {
        insertInputValues(id);
}
}

/**
 * This function calls changeBoardDetailCard() to change the appearance of the card
 * and inserts the input values
 * 
 * @param {number} id This variable is the assigned id of the task
 */

function insertInputValues(id) {
        let index = getIndexTaskEdit(id);
        changeBoardDetailCard(id, index);
        let task = list[index];
        let taskTitle = document.getElementById('task-title');
        let taskDescription = document.getElementById('task-description');
        let dueDate = document.getElementById('task-date');
        let taskCategory = document.getElementById('category');
        taskPrio = task['priority'];

        setPrioButtonColor(taskPrio);
        saveSubtasksListEdit(task);
        renderInputText();

        taskTitle.value = task['headline'];
        taskDescription.value = task['text'];
        dueDate.value = task['date'];
        taskCategory.value = task['category']['text']; 
}


/**
 * This function changes the appearance of the card to a form element
 */

function changeBoardDetailCard(id, i) {
        let boardDetailBoxCon = document.getElementById('board_detail_box_content');
        let cardStroy = document.getElementById(`Card_story${id}`); 
        let editButton = document.getElementById('board_card_bt_edit');
        document.getElementById('board_card_bt_delete').innerHTML = "";
        boardDetailBoxCon.innerHTML = "";
        cardStroy.innerHTML = "";
        editButton.innerHTML = "";
        
        let formContainer = document.createElement("form");
        let subButton = document.createElement("input");

        formContainer.innerHTML = createAddTask();
        boardDetailBoxCon.appendChild(formContainer);
        formContainer.appendChild(subButton);

        changeBoardAttribute(id, i, formContainer, subButton, );
        changeBoardStyle(subButton, cardStroy, formContainer);
}

/**
 * This function sets attributes to the elements 
 * 
 * @param {number} id This variable is the assigned id of the task
 * @param {number} i This variable is the task index in the list array
 * @param {*} formContainer 
 * @param {*} subButton 
 */

function changeBoardAttribute(id, i, formContainer, subButton) {
        formContainer.setAttribute('onsubmit', `changeTask(${id}, ${i}); return false`);
        formContainer.setAttribute('id', 'edit-task-form');
        subButton.setAttribute('type', 'submit');
        subButton.setAttribute('value', 'OK');
}

/**
 * This function sets styles to the elements
 * 
 * @param {*} subButton 
 * @param {*} cardStroy 
 * @param {*} formContainer 
 */

function changeBoardStyle(subButton, cardStroy, formContainer) {
        subButton.classList.add('task-button');
        subButton.classList.add('task-bt-create');
        subButton.classList.add('task-bt-change');
        cardStroy.classList.remove('board_detail_header');
        formContainer.style = 'overflow-y:scroll; height:68vh;';
        document.getElementById('board_detail_card').style = 'padding-bottom: 60px';
        document.getElementById('task-input-left').style.width = '100%';
        document.getElementById('task-input-right').style.width = '100%';
        document.getElementById('task-hr').classList.add('d-none');
}

/**
 * This function gets the tasks index 
 * 
 * @param {number} id This variable is the assigned id of the task
 * @returns The index of the task within the list array
 */

function getIndexTaskEdit(id) {
        for (let i = 0; i < list.length; i++) {
            const task = list[i];
            if(id == task['id']) {
                return i;
            }
        };
}

/**
 * This function saves the subtasks in the global array subtasks
 * 
 * @param {object} task 
 */

function saveSubtasksListEdit(task) {
        subtasks = [];
        let taskSubtasks = task['subtasks'];
        for (let j = 0; j < taskSubtasks.length; j++) {
            const subtask = taskSubtasks[j];
                subtasks.push(subtask);
        }
}

/**
 * 
 * @param {number} id This variable is the assigned id of the task
 * @param {number} i This variable is the task index in the list array
 */

async function changeTask(id, i) {
    let taskTitle = document.getElementById('task-title');
    let taskDescription = document.getElementById('task-description');
    let assignedTo = getAssignedToUsersEditTask(i);
    let dueDate = document.getElementById('task-date');
    let taskCategory = getTaskCategory(); 
    let taskBoard = list[i]['task_board'];

    await saveChangedTask(id, i, taskTitle.value, taskDescription.value, assignedTo, dueDate.value, taskCategory, taskBoard);

    closeBoardCard();
    showPopup('Task changed');
    //render or
    // openHTML('/board.html');
    loadTaskBoard();
}

/**
 * This function saves the values within the variable changedTask and replaces the old task
 * with the new inside the list array. Than everything is saved in localStorage and on the server agian.
 * 
 * @param {number} id This variable is the assigned id of the task
 * @param {number} i This variable is the task index in the list array
 * @param {string} taskTitle This variable is the task title
 * @param {string} taskDescription This variable is the task text
 * @param {object} assignedTo This variable is the task assigned users in an object
 * @param {string} dueDate This variable is the due date
 * @param {object} taskCategory This varibale is the category the task is assigned to
 * @param {string} taskBoard This varibale is the category for the board fields
 */

async function saveChangedTask(id, i, taskTitle, taskDescription, assignedTo, dueDate, taskCategory, taskBoard) {
        let changedTask = {
        'id':id,
        'headline': taskTitle,
        'text': taskDescription,
        'task_user': assignedTo,
        'date': dueDate,
        'priority': taskPrio,
        'category': taskCategory,
        'subtasks': subtasks,
        'task_board': taskBoard,
    }

    list.splice(i, 1, changedTask);
    await SaveInLocalStorageAndServer(user, listString, list);
}

/**
 * This function gets the assigned to users by either the checkbox input or
 * if it wasn't changed, by the saved values inside the task object.
 * 
 * @param {number} i This variable is the task index in the list array
 * @returns A object with the assigned to users
 */

function getAssignedToUsersEditTask(i) {
    let assignedToUser = getAssignedToUsers(); 
    let assignedTo = [];
    if(assignedToUser.length === 0) {
        let taskUsers = list[i]['task_user']
        for (let j = 0; j < taskUsers.length; j++) {
            const sglContacts = taskUsers[j];
            assignedTo.push(sglContacts);
        }
        return assignedTo;
    } else {
        return assignedToUser;
    }
}