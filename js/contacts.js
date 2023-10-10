let contacts = [
    {
        'name': 'Anton Mayer',
        'email': 'anton@gmail.com',
        'phone': '+49 1111 111 11 1',
        'logogram': 'AM'
    },
    {
        'name': 'Anna Buk',
        'email': 'anna@gmail.com',
        'phone': '+49 2222 222 22 2',
        'logogram': 'AB'
    },
    {
        'name': 'Benedikt Ziegler',
        'email': 'benedikt@gmail.com',
        'phone': '+49 3333 333 33 3',
        'logogram': 'BZ'
    },
    {
        'name': 'Dara Maria Fischer',
        'email': 'dara@gmail.com',
        'phone': '+49 4444 444 44 4',
        'logogram': 'DF'
    },
    {
        'name': 'Markus Mayer-Schmidt',
        'email': 'markus@gmail.com',
        'phone': '+49 5555 555 55 5',
        'logogram': 'MM'
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
// Wenn Kürzel im Server gespeichert werden kann, dann können firstCha und secondCha rausgelöscht werden
        renderContactsHTML(contactsList, i, contact, firstCha, secondCha);
    };
}

function getfirstLetter(i) {
        return contacts[i]['name'].charAt(0);
}

// Kann evtl entfallen, wenn Kürzel im JSON Objekt gespeichert wird! Dann muss firstCha & secondCha in den meisten functions raus gelöscht werden!
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

if (window.matchMedia("(max-width: 700px)").matches) {
    document.getElementById('contacts-main').classList.remove('d-none');
    document.getElementById('contacts-list-section').classList.add('d-none');
}

    // if (window.screen.width <= 700) {
    //    document.getElementById('contacts-main').classList.remove('d-none');
    //    document.getElementById('contacts-list-section').classList.add('d-none');
    // }

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
                        <button class="contact-bt-sgl" onclick="showPopupContact(${i})"><img src="./img/edit.svg" alt="">Edit</button>
                        <button class="contact-bt-sgl" onclick="showPopupContact(${i})"><img src="./img/delete.svg" alt="">Delete</button>
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

function showPopupContact(filter) {
    renderPopupContact();
    let filterPlusOne = filter + 1;
    if(filterPlusOne){
        showPopupExistContact(filter);
    }
    showPopupContactContainer();
}


function renderPopupContact() {
    let addNewContactsPopup = document.getElementById('contacts-add-bg');
    addNewContactsPopup.innerHTML = /*html*/`
        <div id="contacts-add-con" class="contacts-add-con" onclick="stopClosing(event)">
            <div class="contacts-add-con-left">
                <img src="./img/contacts-join-logo.svg" alt="" class="contacts-join-logo"/>
                <h2 id="popup-contact-header" class="contacts-h2">Add contact</h2>
                <p id="popup-contact-p" class="contacts-add-text">Tasks are better with a team!</p>
                <div class="contacts-hr-ho"></div>
            </div>
            <div class="contacts-add-con-right">
                <div class="contacts-add-close-con" onclick="closeNewContacts()">
                    <img src="./img/task_cancel.svg" alt="" />
                </div>
                <div class="contacts-con-sub">
                    <!-- user Icon -->
                    <div id="popuo-contact-user-icon">
                        <img src="./img/contacts-user-logo.svg" alt="" class="contacts-user-logo"/>
                    </div>
                    <form action="" class="contacts-form">
                        <div class="contacts-input-con">
                            <input type="text" name="name" id="popup-contact-name" placeholder="Name" class="contacts-input"/>
                            <img src="./img/person.svg" alt="" />
                        </div>
                        <div class="contacts-input-con">
                            <input type="email" name="email" id="popup-contact-email" placeholder="Email" class="contacts-input"/>
                            <img src="./img/mail.svg" alt="" />
                        </div>
                        <div class="contacts-input-con">
                            <input type="tel" name="phone" id="popup-contact-phone" placeholder="Phone" class="contacts-input"/>
                            <img src="./img/add_call.svg" alt="" />
                        </div>
                        <div id="popup-contact-button-con" class="contacts-button-con">
                            <!-- Delete  ohne img-->
                            <button id="contacts-bt-cancel" onclick="closeNewContacts()" class="contacts-button contacts-bt-clear       contacts-bt-ft">
                                Cancel
                                <img id="img_cancel" src="./img/task_cancel.svg" alt=""/>
                            </button>
                            <!-- Save + img -->
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


function showPopupContactContainer() {
    document.getElementById('contacts-add-bg').classList.remove('d-none');
    setTimeout(showPopupContactContent, 0)
}

function showPopupContactContent() {
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


// change existing contact - Button + PopUp (in progress...)

function showPopupExistContact(i) {
    document.getElementById('popup-contact-header').innerHTML = "Edit contact";
    document.getElementById('popup-contact-p').innerHTML = "";
    document.getElementById('popuo-contact-user-icon').innerHTML = /*html*/`
        <div class="contacts-color-icon con-icon-sz">${contacts[i]['logogram']}</div>`;
    document.getElementById('popup-contact-name').value = `${contacts[i]['name']}`;
    document.getElementById('popup-contact-email').value = `${contacts[i]['email']}`; 
    document.getElementById('popup-contact-phone').value = `${contacts[i]['phone']}`; 
    document.getElementById('popup-contact-button-con').innerHTML = /*html*/`
        <button id="contacts-bt-cancel" onclick="closeNewContacts()" class="contacts-button contacts-bt-clear       contacts-bt-ft">
            Delete
        </button>
        <button onclick="createNewContact()" class="contacts-button contacts-bt-create contacts-bt-ft">
            Save
        <img src="./img/task_check.svg" alt="" />`;
}


// Create new Contact (in progress ...)

function createNewContact() {
    let contactName = document.getElementById('popup-contact-name').value;
    let contactEmail = document.getElementById('popup-contact-email').value;
    let contactPhone = document.getElementById('popup-contact-phone').value;
    let logogram = getLogogram(contactName);


    let newContact = {
        'name': contactName,
        'email': contactEmail,
        'phone': contactPhone,
        'logogram': logogram
    };

    allContacts.push(newContact);

    let allContactsAsString = JSON.stringify(allContacts);
    // localStorage.setItem('allContacts', allContctsAsString); bzw. auf ext. Server speichern
}
 

function getLogogram(name) {
    let firstCha = name.toString().charAt(0);
    let secondCha = name.toString().trim().split(" ").splice(-1).toString().charAt(0);

    return firstCha + secondCha;
}

