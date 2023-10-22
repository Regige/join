let taskPrio = "";
let subtasks = [];
let taskBoardField = "";

async function initAddTask() {
    await loadUserData();
    loadFromLocalStorage();
    loadFromLocalStorageContacts();
    loadStringFromLocalStorage();
}


//  Assigned To Field - render Contacts list 
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

function renderAssignedToBt() {
    let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');
    contactsListToAssignCon.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        contactsListToAssignCon.innerHTML += createAssignedToBt(i, contact);
    }
}


//  Assigned To Field - Popup and Close Function 

function closeAssignedToField() {
    document.getElementById('task-contacts-list-to-assign').classList.add('d-none');
    document.getElementById('add-new-contact-bt').classList.add('d-none');
}

function stopClosing(event) {
    event.stopPropagation();
}


// subtask input field

function changeToSubText() {
    let subtaskButtonOpen = document.getElementById('task-sub-bt-open');
    subtaskButtonOpen.classList.add('d-none');
    let subtaskInputText = document.getElementById('task-sub-input-text-con');
    subtaskInputText.classList.remove('d-none');
}


function deleteInputText() {
    document.getElementById('task-sub-input-text').value = "";
}


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


function renderInputText() {
    let subtaskTextCon = document.getElementById('task-sub-text');
    subtaskTextCon.innerHTML = "";

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        
        subtaskTextCon.innerHTML += createInputText(i, subtask);
    }
}


function deleteSubtask(i) {
    subtasks.splice(i,1);

    renderInputText();
}


function editSubtask(i) {
    document.getElementById(`subtask-field-${i}`).classList.remove('d-none');
    document.getElementById(`subtask-li-${i}`).classList.add('d-none');
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtaskInputField.value = subtasks[i]['text'];
}


function saveEditedSubtask(i) {
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtasks[i]['text'] = subtaskInputField.value;

    document.getElementById(`subtask-field-${i}`).classList.add('d-none');
    document.getElementById(`subtask-li-${i}`).classList.remove('d-none');

    renderInputText();
}



// Create new Task

async function createNewTask() {
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


function setTaskPrio(prio) {
    taskPrio = prio;

    setPrioButtonColor(prio);
}

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


function saveStringInLocalStorage(fieldCategory) {
    localStorage.setItem('fieldCategory', fieldCategory);
}

function loadStringFromLocalStorage() {            
    taskBoardField = localStorage.getItem('fieldCategory');
    if(taskBoardField == null){
        taskBoardField = "";
    }
}

function removeStringFromLocalStorage() {
localStorage.removeItem('fieldCategory');
taskBoardField = "";
}

function getTaskBoardField() {
    if(taskBoardField === "") {
        return "to_do";
    } else {
        return taskBoardField;
    }
}