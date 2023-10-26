let users = [];

async function init() {
    loadUsersFromLocalStorage();
    loadUsers(); 
}

function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsersFromLocalStorage() {
    let storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = [];
    }
}

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

async function register() {
    if (!validateRegistrationFields()) {
        return;
    }
    
    await processRegistration();
}

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

function resetFormValue() {
    document.getElementById('nameregister').value = '';
    document.getElementById('emailregister').value = '';
    document.getElementById('passwordregister1').value = '';
    document.getElementById('passwordregister2').value = '';
    document.getElementById('registerBtn').disabled = false;
}

async function loadStandardUserListAndContacts(user, name) {
    let new_list = JSON.parse(await getItem('guest-list'));
    await setItem(user + '-list', new_list);
    let new_contact = JSON.parse(await getItem('guest-contacts'));
    addUserToContacts(user, name, new_contact);
    await setItem(user + '-contacts', new_contact);
}

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