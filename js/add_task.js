let taskPrio = "";
let subtasks = [];
let allTasks = [];


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
                    <div class="task-contacts-color-icon"></div>
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
    let subtaskTextCon = document.getElementById('task-sub-text');
    subtaskTextCon.innerHTML = "";

    subtasks.push(subtaskInput.value);
    subtaskInput.value = "";

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        
        subtaskTextCon.innerHTML += /*html*/`
            <div class="task-sub-text-sgl">${subtask}</div>`;
    }

}

// Create new Task (in progress ...)

function createNewTask(event) {
    // event.preventDefault();

    let taskTitle = document.getElementById('task-title').value;
    let taskDescription = document.getElementById('task-description').value;
    let assignedTo = [];
    let dueDate = document.getElementById('task-date').value;
    let taskCategory = document.getElementById('category').value;
    
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
        if(item.checked === true) {
            assignedTo.push(item.value);
        }
    });

    let newTask = {
        'title': taskTitle,
        'description': taskDescription,
        'assigned-to': [assignedTo],
        'due-date': dueDate,
        'prio': taskPrio,
        'category': taskCategory,
        'subtask': subtasks,
    }

    console.log(newTask);

    allTasks.push(newTask);

    // let allTasksAsString = JSON.stringify(allTasks);
    // localStorage.setItem('allTasks', allTasksAsString); bzw. auf ext. Server speichern
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