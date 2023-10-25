//let users ={ 'email': 'test@test.de', 'password': 'test' };

//const user = users.email;

function toggleCheckmark(elementId, elementIdNone) {
    const element = document.getElementById(elementId);
    const elementNone = document.getElementById(elementIdNone);
    const checkbox = document.getElementById('privacyPolicyCheckbox');

    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
        elementNone.classList.add('d-none');
        checkbox.checked = false;
    } else {
        element.classList.add('d-none');
        elementNone.classList.remove('d-none');
        checkbox.checked = true;
    }
}


function showSignUpHideSignUp(action) {
    if (action === 'show') {
        document.getElementById('sign-up').classList.remove('d-none');
        document.getElementById('login').classList.add('d-none');
    } else if (action === 'hide') {
        document.getElementById('sign-up').classList.add('d-none');
        document.getElementById('forgot-password-container').classList.add('d-none');
        document.getElementById('password-container').classList.add('d-none');
        document.getElementById('login').classList.remove('d-none');
    }
}

function showForgotPassword(mode) {
    if (mode === 'forgot') {
        document.getElementById('forgot-password-container').classList.remove('d-none');
        document.getElementById('login').classList.add('d-none');
    } else if (mode === 'reset') {
        document.getElementById('password-container').classList.remove('d-none');
        document.getElementById('forgot-password-container').classList.add('d-none');
        
    }
}

function handleForgotPasswordFormSubmit() {
    let passwordEmail = document.getElementById('passwordEmail');
    passwordEmail.value = '';

    document.getElementById('forgot-password-container').classList.add('d-none');
    document.getElementById('password-container').classList.remove('d-none');
    
    // Zeige das Popup mit der Nachricht "Passwort erfolgreich zurückgesetzt"
    showPopupAndRedirect('Passwort erfolgreich zurückgesetzt', 'index.html');
    
    return false;
}

function validatePasswords() {
    const password1 = document.getElementById('ForgotPassword1').value;
    const password2 = document.getElementById('ForgotPassword2').value;
    const errorMessage = document.getElementById('register-error2');
    if (password1 !== password2) {
        
        showPopup('Your password does not match.')
        return false; // Verhindert das Absenden des Formulars
    } else {
        errorMessage.style.display = 'none';
         // Hier wird das Passwort zurückgesetzt
        return true; // Lässt das Formular absenden
    }
}

function showPopupAndRedirect(message) {
    alert(message);
    // Wenn Sie den Benutzer nach dem Anzeigen des Popup-Fensters auf eine andere Seite umleiten möchten, 
    // können Sie den folgenden Befehl verwenden und die URL entsprechend ändern.
    // Zum Beispiel: window.location.href = 'https://www.example.com';
}



async function resetPassword(email, newPassword) {
    // Durchsuche die Benutzerdatenbank nach dem Benutzer mit der angegebenen E-Mail-Adresse
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
        showPopup('Benutzer mit dieser E-Mail-Adresse wurde nicht gefunden.');
        return;
    }

    // Setze das neue Passwort für den Benutzer
    users[userIndex].password = newPassword;

    // Speichere die aktualisierte Benutzerliste in deinem Speichermechanismus (z.B. localStorage)
    await setItem('users', JSON.stringify(users));

    showPopupAndRedirect('Passwort wurde erfolgreich zurückgesetzt.');
}








function checkUserEmail() {
    let passwordEmail = document.getElementById('passwordEmail').value;

    let user = users.find(u => u.email === passwordEmail);
    if (user) {
        // Wenn der Benutzer in der Liste gefunden wurde
        document.getElementById('forgot-password-container').classList.add('d-none');
        document.getElementById('password-container').classList.remove('d-none');
    } else {
        showPopup('Diese E-Mail-Adresse ist nicht registriert. Bitte überprüfen Sie Ihre Eingabe oder registrieren Sie sich.');
    }
}

function handleForgotPasswordFormSubmit() {
    // Überprüfen Sie die E-Mail-Adresse
    checkUserEmail();

    // Verhindert das tatsächliche Senden des Formulars
    return false;
}





function checkUserLogin() {
    if (user == undefined) {
        console.log('fehler')
        openPage('/index.html');
    }
}

function openPage(page) {
    window.location.href = page;
}

function closeCurrentTab() {
    window.close();
}

function setGuestUser() {
    user = JSON.stringify('guest');
    localStorage.setItem('user', user);
}

function showPopupAndRedirect(text, url) {
    // Zeige das Popup
    var popup = document.createElement("div");
    popup.textContent = text;
    popup.classList.add("popup");
    document.body.appendChild(popup);
    setTimeout(function () {
        popup.style.top = "30px";
    }, 100);
    setTimeout(function () {
        popup.style.top = "-100px";
        setTimeout(function () {
            document.body.removeChild(popup);
            // Nachdem das Popup verschwunden ist, leite zur angegebenen URL weiter
            if (url) {
                window.location.href = url;
            }
        }, 500);
    }, 3000);
}

function showPopup(text) {
    var popup = document.createElement("div");
    popup.textContent = text;
    popup.classList.add("popup");
    document.body.appendChild(popup);
    setTimeout(function () {
        popup.style.top = "30px";
    }, 100);
    setTimeout(function () {
        popup.style.top = "-100px";
        setTimeout(function () {
            document.body.removeChild(popup);
        }, 500);
    }, 3000);
}

function openHTML(html) {
    location.href = html;
}

// Header
function userNavbar() {
    let navbar = document.getElementById('navbar');
    if (navbar.classList.contains('d-none')) {
        navbar.classList.remove('d-none');
    } else {
        navbar.classList.add('d-none');
    }
}