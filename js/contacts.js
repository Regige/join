let letters = [];       // Variable (renderContacts()) to render contacts list letters
let allContacts = [];       // Variable for function createContact()
let hexColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646',
              '#FF9633', '#8B45FF', '#7C82FF', '#FF8DFC', '#FFD345', '#2DE9D7', '#5C47A6', '#FF7E7E',
              '#FFA64E', '#AD63FF', '#9DA8FF', '#FF9AFD', '#FFE14D', '#4EEBCF', '#6B5BC1', '#FF6666',
              '#FFC074', '#C685FF', '#B6C4FF', '#FFB6FE', '#FFF47E', '#62F3E5'];   // Variable for contact icon



// show contacts list on the side

/**
 * This function starts all the necessary functions to run the contacts.html
 */

async function initContacts() {
    await loadUserData();
    loadFromLocalStorageContacts();
    renderContacts();
}


/**
 * This function starts all the functions to generate the contact list on the left side of the page
 */

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

/**
 * This function sorts the elements in the contacts array alphabetically
 */

function sortContactsList() {
    contacts = contacts.sort((a,b) => {
        if(a.name < b.name) {
            return -1;
        }
    })
}

/** 
 * This function creates the subdivision of the generated contact list on the page
 *  by adding the first letter in a alphabetically order between the contacts */

function checkContactsListLetter(firstCha, contactsList) {
    if(!letters.includes(firstCha)) {
    letters.push(firstCha);
    renderContactsListLetters(firstCha, contactsList);
    }
}

/**
 * This function generates the html code for the subdivision within the contacts list on the page
 * 
 * @param {string} firstCha This variable is the letter which divides the contacts 
 * @param {*} contactsList This variable is the container where all the contacts are generated in
 * @returns It returns the html code for the divison within the contacts list
 */

function renderContactsListLetters(firstCha, contactsList) {
    return contactsList.innerHTML += createContactsListLetters(firstCha);
}

/**
 * This function generates the html code for the contacts list on the contact page
 * 
 * @param {*} contactsList This variable is the container where all the contacts are generated in
 * @param {number} i This variable is the index of the current contact
 * @param {object} contact This variable is the current contact form the contacts array
 * @returns It returns the html code
 */

function renderContactsHTML(contactsList, i, contact) {
    return contactsList.innerHTML += createContactsHTML(i, contact);
}



// show clicked contact on the main page

/**
 * This function is responsible for showing the clicked contact on the right side of the contact page
 * 
 * @param {number} i This is the index of the current contact
 */

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

/**
 * This function creates the html code to show the clicked contact.
 * 
 * @param {number} i This variable is the index of the current contact
 * @param {object} contact This variable is the clicked contact
 * @param {*} clickedContact This variable is the container where the contact will be generated
 */

function renderSglContactHTML(i, contact, clickedContact) {
        clickedContact.innerHTML = createSglContactHTML(i, contact);
}

/**
 * This function is used to show or hide the clicked contact, depending on the window size of the page.
 */

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

/**
 * This function starts the right function to either show the popup window for adding new contacts 
 * or changing excisting contacts.
 * 
 * @param {number} filter This varible is the index of the contact. If it is empty, the function to 
 * create new contacts is being called.
 */

function showPopupContact(filter) {
    renderPopupContact();
    let filterPlusOne = filter + 1;
    if(filterPlusOne){
        showPopupExistContact(filter);
    }
    showPopupContactContainer();
}

/**
 * This function generates the html code for the popup window to create a new contact
 */

function renderPopupContact() {
    let addNewContactsPopup = document.getElementById('contacts-add-bg');
    addNewContactsPopup.innerHTML = createPopupContact();
}

/**
 * This function is responsible to show the popup background
 */

function showPopupContactContainer() {
    document.getElementById('contacts-add-bg').classList.remove('d-none');
    setTimeout(showPopupContactContent, 0)
}

/**
 * This function is responsible to show the popup window
 */

function showPopupContactContent() {
    document.getElementById('contacts-add-con').classList.add('contacts-add-con-show');
}

/**
 * This function closes the popup window
 */

function closeNewContacts() {
    let overlayBg = document.getElementById('contacts-add-bg');
    overlayBg.classList.add('d-none');

    let overlayCon = document.getElementById('contacts-add-con');
    overlayCon.classList.remove('contacts-add-con-show');
}

/**
 * This function stops the function closeNewContacts() from closing the popup window
 * 
 * @param {*} event 
 */

function stopClosing(event) {
    event.stopPropagation();
}



// change existing contact - Button + PopUp

/**
 * This function changes the renderPopupContact() function and creats the html code for an excisting 
 * contact popup window.
 * 
 * @param {number} i This variable is the index of the clicked contact
 */

function showPopupExistContact(i) {
    document.getElementById('popup-contact-header').innerHTML = "Edit contact";
    document.getElementById('popup-contact-p').innerHTML = "";
    document.getElementById('popuo-contact-user-icon').innerHTML = createPopupExistContactIcon(i);
    document.getElementById('popup-contact-name').value = `${contacts[i]['name']}`;
    document.getElementById('popup-contact-email').value = `${contacts[i]['email']}`; 
    document.getElementById('popup-contact-phone').value = `${contacts[i]['phone']}`; 
    document.getElementById('popup-contact-button-con').innerHTML = createPopupExistContactBt(i);
}



// Create new Contact

/**
 * This function starts the necessary functions to create and save a new contact
 */

async function createNewContact() {
    if(user === 'guest') {
        showPopup('Cannot be created as a guest. Please create an account');
        closeNewContacts();
    } else {
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

    showPopup('New Contact created');
    }
}

/**
 * This function saves the input form createNewContact() into an object and than into the contacts array.
 * The variable contacts is than save in localStorage and on the server.
 * 
 * @param {string} contactNameAlterd This varable is the name of the new contact
 * @param {string} contactEmail This varable is the email of the new contact 
 * @param {string} contactPhone This varable is the phone number of the new contact
 * @param {string} logogram This varable is the logogram of the new contacts icon
 * @param {string} contactColor This varable is the color of the new contacts icon
 */

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

/**
 * This function empties the input fields 
 * 
 * @param {string} contactName This varable is the name of the new contact 
 * @param {string} contactEmail This varable is the email of the new contact  
 * @param {string} contactPhone This varable is the phone number of the new contact 
 */

function resetForm(contactName, contactEmail, contactPhone) {
    contactName.value = "";
    contactEmail.value = "";
    contactPhone.value = "";
}
 
/**
 * This function creats the logogram form the name
 * 
 * @param {string} name This variable is the name of the contact
 * @returns The first letters of the fist and last name
 */

function getLogogram(name) {
    let firstCha = name.toString().charAt(0);
    let secondCha = name.toString().trim().split(" ").splice(-1).toString().charAt(0);

    return firstCha + secondCha;
}

/**
 * This function chooses randomly a color form the hexColor array
 * 
 * @returns A color code
 */

function getContactColor() {
    let randomColor = hexColors[Math.floor(Math.random()*hexColors.length)];
    return randomColor;
}



// Delete Contacts

/**
 * This function starts the functions to remove a contact form the contacts array and saves the changes.
 * 
 * @param {number} i This is the index of a contact
 */

async function deleteContacts(i) {
    if(user === 'guest') {
        showPopup('Cannot be deleted as a guest. Please create an account');
        closeNewContacts();
    } else {
    contacts.splice(i,1);

    await SaveInLocalStorageAndServer(user, contactsString, contacts);
    renderContacts();
    closeNewContacts();
    removeFromMainPage();
    }
}

/**
 * This function empties the html content form the container
 */

function removeFromMainPage() {
    document.getElementById('contact-clicked').innerHTML = "";
}



// Save changed contact

/**
 * This function starts the functions to change a contact within the contacts array and saves the changes.
 * 
 * @param {number} i This is the index of the contact
 */

async function saveChangedContact(i) {
    if(user === 'guest') {
        showPopup('Cannot be changed as a guest. Please create an account');
        closeNewContacts();
    } else {
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
}

/**
 * This function saves the input values in an object and changes the contacts array. Everyting is 
 * saved in localStorage and on the server again.
 * 
 * @param {number} i This variable is the index of the contact
 * @param {string} contactName This variable is the name of the contact
 * @param {string} contactEmail This variable is the emai of the contact
 * @param {string} contactPhone This variable is the phone number of the contact
 * @param {string} contactNameAlterd This variable is the alterd name of the contact
 * @param {string} logogram This variable is the logogram of the contact
 * @param {string} contactColor This variable is the color for the contacts icon
 */

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


let contactsGuestOld = [
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