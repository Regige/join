//let users ={ 'email': 'test@test.de', 'password': 'test' };

//const user = users.email;

function toggleCheckmark(elementId, elementIdNone) {
    const element = document.getElementById(elementId);
    const elementNone = document.getElementById(elementIdNone);

    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
        elementNone.classList.add('d-none');
    } else {
        element.classList.add('d-none');
        elementNone.classList.remove('d-none');
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
        showPopup('Hallo');
    }
}

function handleForgotPasswordFormSubmit() {
    let passwordEmail = document.getElementById('passwordEmail');
    passwordEmail.value = '';

    document.getElementById('forgot-password-container').classList.add('d-none');
    document.getElementById('password-container').classList.remove('d-none');
    return false;
}

function validatePasswords() {
    const password1 = document.getElementById('ForgotPassword1').value;
    const password2 = document.getElementById('ForgotPassword2').value;
    const errorElement = document.getElementById("register-error2");

    if (password1 !== password2) {
        errorElement.style.display = "block"; // Zeigt die Fehlermeldung an, wenn die Passwörter nicht übereinstimmen.
        return false; // Stoppt den Formular-Submit
    } else {
        errorElement.style.display = "none"; // Versteckt die Fehlermeldung, falls sie zuvor angezeigt wurde.
        // Weitere Logik kann hier hinzugefügt werden, falls erforderlich (z.B. Formular abschicken, Daten speichern, etc.)
        return true; // Erlaubt den Formular-Submit
    }
}

function checkUserLogin(){
    if (user == undefined){
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