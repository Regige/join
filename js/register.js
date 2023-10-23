let users = [];

async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    let email = document.getElementById('emailregister');
    let password1 = document.getElementById('passwordregister1');
    let password2 = document.getElementById('passwordregister2');
    let name = document.getElementById('nameregister');
    let registerBtn = document.getElementById('registerBtn'); // Hinzugefügt

    if (password1.value === password2.value) {
        registerBtn.disabled = true;
        users.push({
            name: name.value,
            email: email.value,
            password: password1.value,
        });
        await setItem('users', JSON.stringify(users));
        await loadStandardUserListAndContacts(email.value);
        showPopupAndRedirect('Du hast dich erfolgreich registriert', 'index.html');
        resetForm();
    } else {
        document.getElementById("register-error").style.display = "block";
    }
}

function resetForm() {
    document.getElementById('nameregister').value = '';
    document.getElementById('emailregister').value = '';
    document.getElementById('passwordregister1').value = '';
    document.getElementById('passwordregister2').value = '';
    document.getElementById('registerBtn').disabled = false;
}

async function loadStandardUserListAndContacts(user) {
    let new_list = JSON.parse(await getItem('guest-list'));
    await setItem(user + '-list', new_list);
    let new_contact = JSON.parse(await getItem('guest-contacts'));
    await setItem(user + '-contacts', new_contact);
}

