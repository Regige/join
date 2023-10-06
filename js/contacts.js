let contacts = [
    {
        'name': 'Anton Mayer',
        'email': 'anton@gmail.com',
        'phone': '+49 1111 111 11 1'
    },
    {
        'name': 'Anna Buk',
        'email': 'anna@gmail.com',
        'phone': '+49 2222 222 22 2'
    },
    {
        'name': 'Benedikt Ziegler',
        'email': 'benedikt@gmail.com',
        'phone': '+49 3333 333 33 3'
    },
    {
        'name': 'Dara Maria Fischer',
        'email': 'dara@gmail.com',
        'phone': '+49 4444 444 44 4'
    },
    {
        'name': 'Markus Mayer-Schmidt',
        'email': 'markus@gmail.com',
        'phone': '+49 5555 555 55 5'
    },
];

let letters = [];

// Variable for function createContact()
let allContacts = []; 

// show contacts list on the side

function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = "";
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstCha = getfirstLetter(i);
        let secondCha = getsecondLetter(i);
        
        if(!letters.includes(firstCha)) {
            letters.push(firstCha);
            renderContactsListLetters(firstCha, contactsList);
        }

        renderContactsHTML(contactsList, i, contact, firstCha, secondCha);
    };
}

function getfirstLetter(i,) {
    return contacts[i]['name'].charAt(0);
}
function getsecondLetter(i) {
    return contacts[i]['name'].trim().split(" ").splice(-1).toString().charAt(0);
}

function renderContactsListLetters(firstCha, contactsList) {
    return contactsList.innerHTML += /*html*/`
        <div>
            <div class="contacts-list-letters">${firstCha}</div>
            <div class="contacts-hr-line"></div>
        </div>`;
}

function renderContactsHTML(contactsList, i, contact, firstCha, secondCha) {
    return contactsList.innerHTML += /*html*/`
            <div id="contact-con-${i}" class="contacts-list-sgl-con" onclick="showContact(${i})">
                <div class="contacts-color-icon">${firstCha}${secondCha}</div>
                <div>
                    <h3 class="contact-name" id="contact-${i}">${contact['name']}</h3>
                    <div class="contact-email" id="email-${i}">${contact['email']}</div>
                </div>
            </div>`;
}


// show clicked contact on the main page

function showContact(i) {
    // document.getElementById(`contact-con-${i}`).style = null;
    // let clickedCon = document.getElementById(`contact-con-${i}`)
    // clickedCon.style = "backGround-color: #2A3647";

    let contact = contacts[i];
    let firstCha = getfirstLetter(i);
    let secondCha = getsecondLetter(i);
    let clickedContact = document.getElementById('contact-clicked');
    clickedContact.innerHTML = "";

    renderSglContactHTML(i, contact, firstCha, secondCha, clickedContact);
}


function renderSglContactHTML(i, contact, firstCha, secondCha, clickedContact) {
        clickedContact.innerHTML = /*html*/`
        <div id="contact-con-${i}" class="flx-col">
            <div class="contact-sgl-head-con">
                <div class="contacts-color-icon con-icon-sz">${firstCha}${secondCha}</div>
                <div>
                    <h2 class="contact-name-sgl" id="contact-${i}">${contact['name']}</h2>
                    <div class="flx">
                        <button class="contact-bt-sgl"><img src="./img/edit.svg" alt="">Edit</button>
                        <button class="contact-bt-sgl"><img src="./img/delete.svg" alt="">Delete</button>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="contact-sgl-text">Contact Information</h3>
                <h4 class="contact-h4">Email</h4>
                <div class="contact-email" id="email-${i}">${contact['email']}</div>
                <h4 class="contact-h4">Phone</h4>
                <div class="contact-phone" id="phone-${i}">${contact['phone']}</div>
            </div>
        </div>
    `
}


// Add new contacts - Button + PopUp (in progress...)

function showAddNewContactsPopup() {
    renderAddNewContacts();
    addNewContacts();
}


function renderAddNewContacts() {
    let addNewContactsPopup = document.getElementById('contacts-add-bg');
    addNewContactsPopup.innerHTML = /*html*/`
        <div id="contacts-add-con" class="contacts-add-con" onclick="stopClosing(event)">
            <div class="contacts-add-con-left">
                <img src="./img/contacts-join-logo.svg" alt="" class="contacts-join-logo"/>
                <h2 class="contacts-h2">Add contact</h2>
                <p class="contacts-add-text">Tasks are better with a team!</p>
                <div class="contacts-hr-ho"></div>
            </div>
            <div class="contacts-add-con-right">
                <div class="contacts-add-close-con" onclick="closeNewContacts()">
                    <img src="./img/task_cancel.svg" alt="" />
                </div>
                <div class="contacts-con-sub">
                    <img src="./img/contacts-user-logo.svg" alt="" class="contacts-user-logo"/>
                    <form action="" class="contacts-form">
                        <div class="contacts-input-con">
                            <input type="text" name="name" id="new-contact-name" placeholder="Name" class="contacts-input"/>
                            <img src="./img/person.svg" alt="" />
                        </div>
                        <div class="contacts-input-con">
                            <input type="email" name="email" id="new-contact-email" placeholder="Email" class="contacts-input"/>
                            <img src="./img/mail.svg" alt="" />
                        </div>
                        <div class="contacts-input-con">
                            <input type="tel" name="phone" id="new-contact-phone" placeholder="Phone" class="contacts-input"/>
                            <img src="./img/call.svg" alt="" />
                        </div>
                        <div class="contacts-button-con">
                            <button id="contacts-bt-cancel" onclick="closeNewContacts()" class="contacts-button contacts-bt-clear       contacts-bt-ft">
                                Cancel
                                <img id="img_cancel" src="./img/task_cancel.svg" alt=""/>
                            </button>
                            <button onclick="createNewContact()" class="contacts-button contacts-bt-create contacts-bt-ft">
                                Create contacts
                                <img src="./img/task_check.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
}


function addNewContacts() {
    document.getElementById('contacts-add-bg').classList.remove('d-none');
    setTimeout(showAddCon, 0)

    // document.getElementById('contacts-add-con').classList.add('contacts-add-con-show');
}

function showAddCon() {
    document.getElementById('contacts-add-con').classList.add('contacts-add-con-show');
}


function closeNewContacts() {
    let overlayBg = document.getElementById('contacts-add-bg');
    overlayBg.classList.add('d-none');

    let overlayCon = document.getElementById('contacts-add-con');
    overlayCon.classList.remove('contacts-add-con-show');
}

function stopClosing(event) {
    event.stopPropagation();
}

// document.getElementById('contacts-bt-cancel').addEventListener("mousemove", function(){
//     document.getElementById('img_cancel').src = "./img/task_cancel_hover.svg";
// })


// Create new Contact (in progress ...)

function createNewContact() {
    let contactName = document.getElementById('new-contact-name').value;
    let contactEmail = document.getElementById('new-contact-email').value;
    let contactPhone = document.getElementById('new-contact-phone').value;

    let newContact = {
        'name': contactName,
        'email': contactEmail,
        'phone': contactPhone
    }

    allContacts.push(newContact);

    let allContactsAsString = JSON.stringify(allContacts);
    // localStorage.setItem('allContacts', allContctsAsString); bzw. auf ext. Server speichern
}