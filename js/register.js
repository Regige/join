let users = [];

/**
 * Initialize the application by loading users from local storage and any external source.
 * @returns {Promise<void>}
 */
async function init() {
    loadUsersFromLocalStorage();
    loadUsers(); 
}

/**
 * Save the current users array to local storage.
 */
function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

/**
 * Load users from local storage and update the users array.
 */
function loadUsersFromLocalStorage() {
    let storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = [];
    }
}

/**
 * Load users from an external source, update the users array, and then save to local storage.
 * @returns {Promise<void>}
 */
async function loadUsers() {
    try {
        let parsedUsers = JSON.parse(await getItem('users'));
        if (Array.isArray(parsedUsers)) {
            users = parsedUsers;
        } else {
            console.error('Parsed users is not an array:', parsedUsers);
            users = [];
        }
        saveUsersToLocalStorage(); // Speichern Sie die `users` im LocalStorage.
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Handle the registration process for a new user.
 * @returns {Promise<void>}
 */
async function register() {
    if (!validateRegistrationFields()) {
        return;
    }
    
    await processRegistration();
}

/**
 * Validate the registration form fields.
 * @returns {boolean} Whether the form fields are valid or not.
 */
function validateRegistrationFields() {
    let checkbox = document.getElementById('privacyPolicyCheckbox');
    if (!checkbox.checked) {
        showPopup('Please accept the privacy policy before proceeding.');
        return false;
    }

    let email = document.getElementById('emailregister').value;
    let password1 = document.getElementById('passwordregister1').value;
    let password2 = document.getElementById('passwordregister2').value;
    let existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showPopup('This email address is already registered. Please use a different one.');
        return false;
    }

    if (password1 !== password2) {
        showPopup('Your password does not match.');
        return false;
    }
    return true;
}

/**
 * Process the registration of a new user.
 * @returns {Promise<void>}
 */
async function processRegistration() {
    let email = document.getElementById('emailregister');
    let password1 = document.getElementById('passwordregister1');
    let name = document.getElementById('nameregister');
    let registerBtn = document.getElementById('registerBtn');

    registerBtn.disabled = true;
    users.push({
        name: name.value,
        email: email.value,
        password: password1.value,
    });
    await setItem('users', JSON.stringify(users));
    await loadStandardUserListAndContacts(email.value, name.value);
    showPopupAndRedirect('You have successfully registered.', 'index.html');
    resetFormValue();
}

/**
 * Reset the registration form values.
 */
function resetFormValue() {
    document.getElementById('nameregister').value = '';
    document.getElementById('emailregister').value = '';
    document.getElementById('passwordregister1').value = '';
    document.getElementById('passwordregister2').value = '';
    document.getElementById('registerBtn').disabled = false;
}

/**
 * Load a standard user list and contacts for the provided user and name.
 * @param {string} user - The email of the user.
 * @param {string} name - The name of the user.
 * @returns {Promise<void>}
 */
async function loadStandardUserListAndContacts(user, name) {
    let new_list = JSON.parse(await getItem('guest-list'));
    await setItem(user + '-list', new_list);
    let new_contact = JSON.parse(await getItem('guest-contacts'));
    addUserToContacts(user, name, new_contact);
    await setItem(user + '-contacts', new_contact);
}

/**
 * Add a user to the provided contacts list.
 * @param {string} user - The email of the user.
 * @param {string} name - The name of the user.
 * @param {Array} new_contact - The contacts list to which the user should be added.
 * @returns {number} The new length of the contacts list after adding the user.
 */
function addUserToContacts(user, name, new_contact) {
    if(user !== 'guest') {
        let nameAlterd = name.charAt(0).toUpperCase() + name.slice(1);
        let ownContactData = {
            'name': nameAlterd,
            'email': user,
            'phone': "",
            'logogram': getLogogram(nameAlterd),
            'hex_color': getContactColor()
        }
        return new_contact.push(ownContactData);
    }
}