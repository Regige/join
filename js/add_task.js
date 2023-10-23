let taskPrio = "";
let subtasks = [];
let taskBoardField = "";


/**
 * This function starts the functions to load all the necessary data
 */

async function initAddTask() {
    await loadUserData();
    loadFromLocalStorage();
    loadFromLocalStorageContacts();
    loadStringFromLocalStorage();
}


//  Assigned To Field - render Contacts list 

/**
 * This function handles the appearance of the assigned to Button
 */

function showAssignedToBt() {
    document.getElementById('task-contacts-list-to-assign').classList.remove('d-none');
    document.getElementById('add-new-contact-bt').classList.remove('d-none');
    let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');

    if(!contacts) {
        contactsListToAssignCon.innerHTML = "";
        contactsListToAssignCon.innerHTML = /*html*/`<p>&emsp; No contacts yet</p>`;
    } else {
        renderAssignedToBt();
    }
}

/**
 * This function generates the html code for the assigned to Button with all the saved contacts.
 */

function renderAssignedToBt() {
    let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');
    contactsListToAssignCon.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        contactsListToAssignCon.innerHTML += createAssignedToBt(i, contact);
    }
}


//  Assigned To Field - Popup and Close Function 

/**
 * This function closes the container with all the contacts listed.
 */

function closeAssignedToField() {
    document.getElementById('task-contacts-list-to-assign').classList.add('d-none');
    document.getElementById('add-new-contact-bt').classList.add('d-none');
}

/**
 * This function stops closeAssignedToField() from closing when clicked on that particular element.
 * 
 * @param {*} event 
 */

function stopClosing(event) {
    event.stopPropagation();
}


// subtask input field

/**
 * This function opens the subtext input by clicking on the subtask Button.
 */

function changeToSubText() {
    let subtaskButtonOpen = document.getElementById('task-sub-bt-open');
    subtaskButtonOpen.classList.add('d-none');
    let subtaskInputText = document.getElementById('task-sub-input-text-con');
    subtaskInputText.classList.remove('d-none');
}

/**
 * This function deletes the input value.
 */

function deleteInputText() {
    document.getElementById('task-sub-input-text').value = "";
}

/**
 * This function saves the input value as an object in newSubtask and than within the array subtasks.
 */

function saveInputText() {
    let subtaskInput = document.getElementById('task-sub-input-text'); 

    let newSubtask = {
        'text': subtaskInput.value,
        'completed': 0
    }
    subtasks.push(newSubtask);
    subtaskInput.value = "";

    renderInputText();
}

/**
 * The new subtask within the subtasks array is generated under the subtask Button
 */

function renderInputText() {
    let subtaskTextCon = document.getElementById('task-sub-text');
    subtaskTextCon.innerHTML = "";

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        
        subtaskTextCon.innerHTML += createInputText(i, subtask);
    }
}

/**
 * This function delets the subtask form the subtasks array and starts the
 * renderInputText() function again.
 * 
 * @param {number} i This is the index of the subtask
 */

function deleteSubtask(i) {
    subtasks.splice(i,1);

    renderInputText();
}

/**
 * This fuction opens a new input field with the value of the choosen subtask to be changed.
 * 
 * @param {number} i This is the index of the subtask
 */

function editSubtask(i) {
    document.getElementById(`subtask-field-${i}`).classList.remove('d-none');
    document.getElementById(`subtask-li-${i}`).classList.add('d-none');
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtaskInputField.value = subtasks[i]['text'];
}

/**
 * This function saves the changed input value and renders the subtasks again.
 * 
 * @param {number} i This is the index of the subtask
 */

function saveEditedSubtask(i) {
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtasks[i]['text'] = subtaskInputField.value;

    document.getElementById(`subtask-field-${i}`).classList.add('d-none');
    document.getElementById(`subtask-li-${i}`).classList.remove('d-none');

    renderInputText();
}



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
    showPopup('Task created');
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