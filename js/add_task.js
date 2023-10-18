let taskPrio = "";
let subtasks = [];
// let allTasks = [];

async function initAddTask() {
    await loadUserData();
    loadFromLocalStorage();
    loadFromLocalStorageContacts();
}


//  Assigned To Field - render Contacts list 
function showAssignedToBt() {
    document.getElementById('task-contacts-list-to-assign').classList.remove('d-none');
    document.getElementById('add-new-contact-bt').classList.remove('d-none');

    let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');
    contactsListToAssignCon.innerHTML = "";

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        contactsListToAssignCon.innerHTML += /*html*/`
            <div class="task-contacts-list-to-assign-sub">
                <div class="flex-just-btw-ct">
                    <div style="background-color:${contact['hex_color']};" class="task-contacts-color-icon">${contact['logogram']}</div>
                    <label for="contact-${i}">${contact['name']}</label>
                </div>
                <input type="checkbox" name="contact" id="contact-${i}" value="${contact['name']}">
            </div>`;
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

    subtasks.push(subtaskInput.value);
    subtaskInput.value = "";

    renderInputText();
}


function renderInputText() {
    let subtaskTextCon = document.getElementById('task-sub-text');
    subtaskTextCon.innerHTML = "";

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        
        subtaskTextCon.innerHTML += /*html*/`
        <div id="subtask-field-${i}" class="d-none flex-just-btw-ct">
            <input id="subtask-input-field-${i}" type="text" class="task-sub-input" minlength="1"/>
            <div class="flex-just-btw-ct">
                <div onclick="deleteSubtask(${i})"><img src="/img/delete.svg" alt=""/></div>
                <div class="task-sub-hr"></div>
                <div onclick="saveEditedSubtask(${i})" class="flex"><img class="task-sub-input-img" 
                    src="/img/task_check_bl.svg" alt=""/>
                </div>
            </div>
        </div>
        <div id="subtask-li-${i}" class="flex-just-btw-ct">
            <li class="task-sub-text-sgl">
                ${subtask}
            </li>
            <div class="flx task-sub-text-sgl-icons">                        
                <div onclick="editSubtask(${i})" class="flex-just-btw-ct"><img src="/img/edit.svg" alt=""/></div>
                <div class="task-sub-hr"></div>
                <div onclick="deleteSubtask(${i})" class="flex-just-btw-ct"><img src="/img/delete.svg" alt=""/></div>
            </div>
        </div>`;
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
    subtaskInputField.value = subtasks[i];
}


function saveEditedSubtask(i) {
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtasks[i] = subtaskInputField.value;

    document.getElementById(`subtask-field-${i}`).classList.add('d-none');
    document.getElementById(`subtask-li-${i}`).classList.remove('d-none');

    renderInputText();
}


// Create new Task (in progress ...)

async function createNewTask() {
    let taskTitle = document.getElementById('task-title');
    let taskDescription = document.getElementById('task-description');
    let assignedTo = [];
    let dueDate = document.getElementById('task-date');
    let taskCategory = document.getElementById('category');
    
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
        if(item.checked === true) {
            assignedTo.push(item.value);
        }
    });

    let newTask = {
        'title': taskTitle.value,
        'description': taskDescription.value,
        'assigned-to': [assignedTo],
        'due-date': dueDate.value,
        'prio': taskPrio,
        'category': taskCategory.value,
        'subtask': subtasks,
    }

    console.log(newTask);

    list.push(newTask);

    await SaveInLocalStorageAndServer(user, listString, list);
    resetTaskForm(taskTitle, taskDescription, assignedTo, dueDate, taskCategory);
}

function resetTaskForm(taskTitle, taskDescription, assignedTo, dueDate, taskCategory) {
    taskTitle.value = "";
    taskDescription.value = "";
    assignedTo = [];
    dueDate.value = "";
    taskCategory.value = "";
    document.getElementById('task-sub-text').innerHTML = "";
    document.getElementById(`prio-bt-${taskPrio}`).style = null;
    taskPrio = "";
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