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
]
let letters = [];


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