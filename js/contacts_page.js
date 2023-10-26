// Contacts page functionality

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
    loadFromLocalStorage();
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
        let myData = "";
        checkContactsListLetter(firstCha, contactsList);
        if(user === contact['email']){
            myData = "(me)";
        } 
        renderContactsHTML(contactsList, i, contact, myData);
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

function renderContactsHTML(contactsList, i, contact, myData) {
    return contactsList.innerHTML += createContactsHTML(i, contact, myData);
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
    if (window.matchMedia("(min-width: 701px)").matches && document.URL.includes("contacts.html")) {
    document.getElementById('contacts-list-section').classList.remove('d-none');
  } 
    if (window.matchMedia("(max-width: 700px)").matches && document.URL.includes("contacts.html")) {
    document.getElementById('contacts-main').classList.add('d-none-700');
  } 
})



// Button + PopUp (For Add new contacts)

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



//  Button + PopUp (Change existing contact)

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
