async function login() {
    let emailLogin = document.getElementById('email');
    let passwordLogin = document.getElementById('password');
    let user = users.find(u => u.email == emailLogin.value && u.password == passwordLogin.value);
    //console.log(user);
    if (user) {
        saveUserinLocalStorge(user.email,user.name);
        window.location.href = './html/summary.html';

    } else {
        showPopup('Email and/or password are incorrect.');
    }
}

function saveUserinLocalStorge(u,n) {
    user = JSON.stringify(u);
    user_name = JSON.stringify(n);
    localStorage.setItem('user', user);
    localStorage.setItem('name', user_name);
}
