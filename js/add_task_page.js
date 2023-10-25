// Add Task page functionality

/**
 * This function starts the functions to load all the necessary data
 */

async function initAddTask() {
    loadAddTaskForm();
    await loadUserData();
    loadFromLocalStorage();
    loadFromLocalStorageContacts();
    loadStringFromLocalStorage();
}


// Load Add Task Form Element

function loadAddTaskForm() {
    let AddTaskForm = document.getElementById('task-input-con');
    AddTaskForm.innerHTML = "";
    AddTaskForm.innerHTML = createAddTask();
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
    let listOfContactsToAssigne = document.getElementById('task-contacts-list-to-assign');
    if(listOfContactsToAssigne) {
    listOfContactsToAssigne.classList.add('d-none');
    document.getElementById('add-new-contact-bt').classList.add('d-none');

    // showAssignedToIcons();
    }
}

/**
 * This function stops closeAssignedToField() from closing when clicked on that particular element.
 * 
 * @param {*} event 
 */

function stopClosing(event) {
    event.stopPropagation();
}


// function showAssignedToIcons() {
//     document.querySelectorAll('[type="checkbox"]').forEach(item => {
//         if(item.checked === true) { 
//             let divSib = item.previousElementSibling;
//             let divIcon = divSib.firstElementChild;
//             let divIconColor = divIcon.style.backgroundColor;
//             let divIconLogogram = divIcon.innerHTML;

//         let IconCon = document.getElementById('task-assigned-to-icon-shown');
//         IconCon += /*html*/`
//         <div style="background-color:${divIconColor};" class="task-contacts-color-icon">${divIconLogogram}</div>`;
            // createAssignedToIcon(divIconColor, divIconLogogram);
//         } 
//     });
// }

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
