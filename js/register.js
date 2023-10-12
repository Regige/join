let users = [];

async function init(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function register() {
    let email = document.getElementById('emailregister');
    let password = document.getElementById('passwordregister');
    let name = document.getElementById('nameregister');
    registerBtn.disabled = true;
    users.push({
        name: name.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    window.location.href = 'index.html';
    resetForm();
}

function resetForm() {
    nameregister.value = '';
    emailregister.value = '';
    passwordregister.value = '';
    registerBtn.disabled = false;
}

