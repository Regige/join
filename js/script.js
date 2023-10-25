
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
    
    showPopupAndRedirect('Passwort erfolgreich zurückgesetzt', 'index.html');
    
    return false;
}

function showPopupAndRedirect(message) {
    alert(message);
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

function checkUserEmail() {
    let passwordEmail = document.getElementById('passwordEmail').value;

    let user = users.find(u => u.email === passwordEmail);
    if (user) {
        // Wenn der Benutzer in der Liste gefunden wurde
        document.getElementById('forgot-password-container').classList.add('d-none');
        document.getElementById('password-container').classList.remove('d-none');
    } else {
        showPopup('This email address is not registered. Please check your input or register.');
    }
}

function handleForgotPasswordFormSubmit() {
    checkUserEmail();

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

/**
 * This function generates a popup window which is displayed in the top center
 * 
 * @param {String} text text that should be displayed
 */
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