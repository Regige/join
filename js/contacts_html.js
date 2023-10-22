function createContactsListLetters(firstCha) {
    return /*html*/`
        <div>
            <div class="contacts-list-letters">${firstCha}</div>
            <div class="contacts-hr-line"></div>
        </div>`;
}


function createContactsHTML(i, contact) {
    return /*html*/`
            <div id="contact-con-${i}" class="contacts-list-sgl-con" onclick="showContact(${i})">
                <div class="contacts-color-icon" style="background-color:${contact['hex_color']};">${contact['logogram']}</div>
                <div>
                    <h3 class="contact-name" id="contact-${i}">${contact['name']}</h3>
                    <div class="contact-email" id="email-${i}">${contact['email']}</div>
                </div>
            </div>`;
}


function createSglContactHTML(i, contact) {
    return /*html*/`
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


function createPopupContact() {
    return /*html*/`
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
                            <input type="submit" value="Create contact" id="create-bt-submit" class="contacts-button contacts-bt-create contacts-bt-ft contacts-bt-check">
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
}


function createPopupExistContactIcon(i) {
    return /*html*/`
        <div style="background-color:${contacts[i]['hex_color']};" class="contacts-color-icon contacts-user-logo contacts-user-popup">${contacts[i]['logogram']}</div>`;
}

function createPopupExistContactBt(i) {
    return /*html*/`
        <input type="button" value="Delete" onclick="deleteContacts(${i})" class="contacts-button contacts-bt-delet contacts-bt-ft">
        <input type="submit" value="Save" onclick="saveChangedContact(${i})" class="contacts-button contacts-bt-create contacts-bt-ft contacts-bt-check">`;
}
