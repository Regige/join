let taskPrio = "";
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
            <div class="task-contacts-list-to-assign-sub"><div class="flex-just-btw-ct"><div class="task-contacts-color-icon"></div><label for="contact-${i}">${contact['name']}</label></div><input type="checkbox" name="" id="contact-${i}"></div>
        `;
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


// Create new Task (in progress ...)

function createNewTask() {
    let taskTitle = document.getElementById('task-title').value;
    let taskDescription = document.getElementById('task-description').value;
    // mit einer for-Schleife alle checkboxen abfragen? + in einer variable alle namen in einem array abspeichern
    // let assignedTo = document.getElementById('').; 
    let dueDate = document.getElementById('task-date').value;
    let taskCategory = document.getElementById('category').value;
    // let subtask = document.getElementById('task-subtask').value;


    let newTask = {
        'title': taskTitle,
        'description': taskDescription,
        // 'assigned-to': [assignedTo],
        'due-date': dueDate,
        'prio': taskPrio,
        'category': taskCategory,
        // 'subtask': subtask,
    }

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