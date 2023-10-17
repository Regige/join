async function msgBoxRender() {
    let urlParams = new URLSearchParams(window.location.search);
    let msg = urlParams.get('msg');
    let msgBox = document.getElementById('msgBox');

    if (msg) {
        msgBox.innerHTML = msg;
        msgBox.style.display = 'block'; // Hier ändern, um das Element anzuzeigen

        setTimeout(function () {
            msgBox.style.display = 'none';
        }, 8000);
    } else {
        msgBox.style.display = 'none'; // Hier ändern, um das Element auszublenden
    }
}

async function login() {
    let emailLogin = document.getElementById('email');
    let passwordLogin = document.getElementById('password');
    let user = users.find(u => u.email == emailLogin.value && u.password == passwordLogin.value);
    //console.log(user);
    if (user) {
        saveUserinLocalStorge(user.email,user.name);
        window.location.href = 'summary.html';
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

function saveUserinLocalStorge(u,n) {
    user = JSON.stringify(u);
    user_name = JSON.stringify(n);
    localStorage.setItem('user', user);
    localStorage.setItem('name', user_name);
}

