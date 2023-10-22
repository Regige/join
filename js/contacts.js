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
              '#FFC074', '#C685FF', '#B6C4FF', '#FFB6FE', '#FFF47E', '#62F3E5'];



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
    return contactsList.innerHTML += createContactsListLetters(firstCha);
}

function renderContactsHTML(contactsList, i, contact) {
    return contactsList.innerHTML += createContactsHTML(i, contact);
}



// show clicked contact on the main page

function showContact(i) {
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
        clickedContact.innerHTML = createSglContactHTML(i, contact);
}

function backToContactsList() {
    document.getElementById('contacts-main').classList.add('d-none-700');
    document.getElementById('contacts-list-section').classList.remove('d-none');
}

window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 701px)").matches) {
    document.getElementById('contacts-list-section').classList.remove('d-none');
  } 
    if (window.matchMedia("(max-width: 700px)").matches) {
    document.getElementById('contacts-main').classList.add('d-none-700');
  } 
})



// Add new contacts - Button + PopUp

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
    addNewContactsPopup.innerHTML = createPopupContact();
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



// change existing contact - Button + PopUp

function showPopupExistContact(i) {
    document.getElementById('popup-contact-header').innerHTML = "Edit contact";
    document.getElementById('popup-contact-p').innerHTML = "";
    document.getElementById('popuo-contact-user-icon').innerHTML = createPopupExistContactIcon(i);
    document.getElementById('popup-contact-name').value = `${contacts[i]['name']}`;
    document.getElementById('popup-contact-email').value = `${contacts[i]['email']}`; 
    document.getElementById('popup-contact-phone').value = `${contacts[i]['phone']}`; 
    document.getElementById('popup-contact-button-con').innerHTML = createPopupExistContactBt();
}



// Create new Contact

async function createNewContact() {
    let contactName = document.getElementById('popup-contact-name');
    let contactNameAlterd = contactName.value.charAt(0).toUpperCase() + contactName.value.slice(1);
    let contactEmail = document.getElementById('popup-contact-email');
    let contactPhone = document.getElementById('popup-contact-phone');
    let logogram = getLogogram(contactNameAlterd);
    let contactColor = getContactColor();
    
    await saveNewContactValues(contactNameAlterd, contactEmail, contactPhone, logogram, contactColor);
    resetForm(contactName, contactEmail, contactPhone);
    closeNewContacts();

    if ( document.URL.includes("add_task.html") ) {
        sortContactsList();
        renderAssignedToBt();
    } else {
        renderContacts();
    };

    showPopup('New contact created');
}

async function saveNewContactValues(contactNameAlterd, contactEmail, contactPhone, logogram, contactColor) {
    let newContact = {
        'name': contactNameAlterd,
        'email': contactEmail.value,
        'phone': contactPhone.value,
        'logogram': logogram,
        'hex_color': contactColor
    };

    contacts.push(newContact);
    await SaveInLocalStorageAndServer(user, contactsString, contacts);
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

    await saveContactValues(i, contactName, contactEmail, contactPhone, contactNameAlterd, logogram, contactColor);
    renderContacts();
    resetForm(contactName, contactEmail, contactPhone);
    closeNewContacts();
    removeFromMainPage();
    showPopup('Contact changed');
}

async function saveContactValues(i, contactName, contactEmail, contactPhone, contactNameAlterd, logogram, contactColor) {
    let newContact = {
        'name': contactNameAlterd,
        'email': contactEmail.value,
        'phone': contactPhone.value,
        'logogram': logogram,
        'hex_color': contactColor
    };

    contacts.splice(i, 1, newContact);
    await SaveInLocalStorageAndServer(user, contactsString, contacts);
}
