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
    let password1 = document.getElementById('passwordregister1');
    let password2 = document.getElementById('passwordregister2');
    let name = document.getElementById('nameregister');
    let registerBtn = document.getElementById('registerBtn'); // Hinzugefügt

    if (password1.value !== password2.value) {
        alert('Die beiden Passwörter stimmen nicht überein.');
        return;
    }

    registerBtn.disabled = true;
    users.push({
        name: name.value,
        email: email.value,
        password: password1.value,
    });
    await setItem('users', JSON.stringify(users));
    window.location.href = 'index.html';
    resetForm();
}

function resetForm() {
    document.getElementById('nameregister').value = '';
    document.getElementById('emailregister').value = '';
    document.getElementById('passwordregister1').value = '';
    document.getElementById('passwordregister2').value = '';
    document.getElementById('registerBtn').disabled = false;
}