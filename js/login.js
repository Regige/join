async function login(){
    let emailLogin = document.getElementById('email');
    let passwordLogin = document.getElementById('password');
    let user = users.find(u => u.email == emailLogin.value && u.password == passwordLogin.value);
    console.log(user);
    if (user) {
        console.log('user gefunden');
        window.location.href = 'summary.html';
    } else {
        console.log('Falsche Anmeldeinformationen');
        document.getElementById("login-error").style.display = "block";
    }
}