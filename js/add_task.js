
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