let contactsGuest = [
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

let letters = [];       // Variable (renderContacts()) to render contacts list letters


let allContacts = [];       // Variable for function createContact()

let hexColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646',
              '#FF9633', '#8B45FF', '#7C82FF', '#FF8DFC', '#FFD345', '#2DE9D7', '#5C47A6', '#FF7E7E',
              '#FFA64E', '#AD63FF', '#9DA8FF', '#FF9AFD', '#FFE14D', '#4EEBCF', '#6B5BC1', '#FF6666',
              '#FFC074', '#C685FF', '#B6C4FF', '#FFB6FE', '#FFF47E', '#62F3E5']


// show contacts list on the side

async function initContacts() {
    await loadUserData();
    loadFromLocalStorageContacts();
    renderContacts();
}


function renderContacts() {
    if(contacts) {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = "";
    letters = [];

        sortContactsList();

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstCha = contact['logogram'].charAt(0);
        
        checkContactsListLetter(firstCha, contactsList);
        renderContactsHTML(contactsList, i, contact);
    }}
}

function sortContactsList() {
    contacts = contacts.sort((a,b) => {
        if(a.name < b.name) {
            return -1;
        }
    })
}

function checkContactsListLetter(firstCha, contactsList) {
    if(!letters.includes(firstCha)) {
    letters.push(firstCha);
    renderContactsListLetters(firstCha, contactsList);
    }
}

function renderContactsListLetters(firstCha, contactsList) {
    return contactsList.innerHTML += /*html*/`
        <div>
            <div class="contacts-list-letters">${firstCha}</div>
            <div class="contacts-hr-line"></div>
        </div>`;
}

function renderContactsHTML(contactsList, i, contact) {
    return contactsList.innerHTML += /*html*/`
            <div id="contact-con-${i}" class="contacts-list-sgl-con" onclick="showContact(${i})">
                <div class="contacts-color-icon" style="background-color:${contact['hex_color']};">${contact['logogram']}</div>
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
    let clickedContact = document.getElementById('contact-clicked');
    clickedContact.innerHTML = "";

    if (window.matchMedia("(max-width: 700px)").matches) {
    document.getElementById('contacts-main').classList.remove('d-none-700');
    document.getElementById('contacts-list-section').classList.add('d-none');
}

    renderSglContactHTML(i, contact, clickedContact);
}


function renderSglContactHTML(i, contact, clickedContact) {
        clickedContact.innerHTML = /*html*/`
        <div id="contact-con-${i}" class="flx-col">
            <div class="contact-sgl-head-con">
                <div class="contacts-color-icon con-icon-sz" style="background-color:${contact['hex_color']};">${contact['logogram']}</div>
                <div>
                    <h2 class="contact-name-sgl" id="contact-${i}">${contact['name']}</h2>
                    <div class="flx">
                        <button class="contact-bt-sgl contact-bt-sgl-edit" onclick="showPopupContact(${i})">Edit</button>
                        <button class="contact-bt-sgl contact-bt-sgl-delete" onclick="showPopupContact(${i})">Delete</button>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="contact-sgl-text">Contact Information</h3>
                <h4 class="contact-h4">Email</h4>
                <a href="mailto:${contact['email']}" class="contact-email" id="email-${i}">${contact['email']}</a>
                <h4 class="contact-h4">Phone</h4>
                <div class="contact-phone" id="phone-${i}">${contact['phone']}</div>
            </div>
        </div>
    `
}

function backToContactsList() {
    document.getElementById('contacts-main').classList.add('d-none-700');
    document.getElementById('contacts-list-section').classList.remove('d-none');
}

// window.addEventListener("resize", function(){
//     if (window.matchMedia("(max-width: 700px)").matches) {
//         document.getElementById('contacts-main').classList.remove('d-none-700');
//         document.getElementById('contacts-list-section').classList.add('d-none');
// }
// });



// Add new contacts - Button + PopUp (in progress...)

function showPopupContact(filter) {
    // if (window.matchMedia("(max-width: 950px)").matches) {
    //     document.getElementById('contacts-main').classList.remove('d-none-700');
    //     document.getElementById('contacts-list-section').classList.add('d-none');
    // }
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
                <div class="contacts-add-close-con" onclick="closeNewContacts()"></div>
                <div class="contacts-con-sub">
                    <!-- user Icon -->
                    <div id="popuo-contact-user-icon">
                        <img src="./img/contacts-user-logo.svg" alt="" class="contacts-user-logo"/>
                    </div>
                    <form onsubmit="createNewContact(); return false;" class="contacts-form">
                        <div class="contacts-input-con">
                            <input required type="text" name="name" id="popup-contact-name" placeholder="Name" class="contacts-input"/>
                            <img src="./img/person.svg" alt="" />
                        </div>
                        <div class="contacts-input-con">
                            <input required type="email" name="email" id="popup-contact-email" placeholder="Email" class="contacts-input"/>
                            <img src="./img/mail.svg" alt="" />
                        </div>
                        <div class="contacts-input-con">
                            <input type="tel" name="phone" id="popup-contact-phone" placeholder="Phone" class="contacts-input"/>
                            <img src="./img/add_call.svg" alt="" />
                        </div>
                        <div id="popup-contact-button-con" class="contacts-button-con">
                            <input type="button" value="Cancel" onclick="closeNewContacts()" class="contacts-button contacts-bt-cancel contacts-bt-ft contacts-bt-cancel">
                            <input type="submit" value="Create contacts" id="create-bt-submit" class="contacts-button contacts-bt-create contacts-bt-ft contacts-bt-check">
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
        <div style="background-color:${contacts[i]['hex_color']};" class="contacts-color-icon contacts-user-logo contacts-user-popup">${contacts[i]['logogram']}</div>`;
    document.getElementById('popup-contact-name').value = `${contacts[i]['name']}`;
    document.getElementById('popup-contact-email').value = `${contacts[i]['email']}`; 
    document.getElementById('popup-contact-phone').value = `${contacts[i]['phone']}`; 
    document.getElementById('popup-contact-button-con').innerHTML = /*html*/`
        <input type="button" value="Delete" onclick="deleteContacts(${i})" class="contacts-button contacts-bt-delet contacts-bt-ft">
        <input type="submit" value="Save" onclick="saveChangedContact(${i})" class="contacts-button contacts-bt-create contacts-bt-ft contacts-bt-check">`;
}



// Create new Contact

async function createNewContact() {
    let contactName = document.getElementById('popup-contact-name');
    let contactEmail = document.getElementById('popup-contact-email');
    let contactPhone = document.getElementById('popup-contact-phone');
    let contactNameAlterd = contactName.value.charAt(0).toUpperCase() + contactName.value.slice(1)
    let logogram = getLogogram(contactNameAlterd);
    let contactColor = getContactColor();
    
    let newContact = {
        'name': contactNameAlterd,
        'email': contactEmail.value,
        'phone': contactPhone.value,
        'logogram': logogram,
        'hex_color': contactColor
    };

    contacts.push(newContact);

    await SaveInLocalStorageAndServer(user, contactsString, contacts);

    resetForm(contactName, contactEmail, contactPhone);
    closeNewContacts();
    renderContacts();
}

function resetForm(contactName, contactEmail, contactPhone) {
    contactName.value = "";
    contactEmail.value = "";
    contactPhone.value = "";
}
 
function getLogogram(name) {
    let firstCha = name.toString().charAt(0);
    let secondCha = name.toString().trim().split(" ").splice(-1).toString().charAt(0);

    return firstCha + secondCha;
}

function getContactColor() {
    let randomColor = hexColors[Math.floor(Math.random()*hexColors.length)];
    return randomColor;
}



// Delete Contacts

async function deleteContacts(i) {
    contacts.splice(i,1);

    await SaveInLocalStorageAndServer(user, contactsString, contacts);
    renderContacts();
    closeNewContacts();
    removeFromMainPage();
}

function removeFromMainPage() {
    document.getElementById('contact-clicked').innerHTML = "";
}



// Save changed contact

async function saveChangedContact(i) {
    let contactName = document.getElementById('popup-contact-name');
    let contactEmail = document.getElementById('popup-contact-email');
    let contactPhone = document.getElementById('popup-contact-phone');
    let contactNameAlterd = contactName.value.charAt(0).toUpperCase() + contactName.value.slice(1)
    let logogram = getLogogram(contactNameAlterd);
    let contactColor = getContactColor();

    let newContact = {
        'name': contactNameAlterd,
        'email': contactEmail.value,
        'phone': contactPhone.value,
        'logogram': logogram,
        'hex_color': contactColor
    };

    contacts.splice(i, 1, newContact);
    await SaveInLocalStorageAndServer(user, contactsString, contacts);
    renderContacts();
    resetForm(contactName, contactEmail, contactPhone);
    closeNewContacts();
    removeFromMainPage();
}