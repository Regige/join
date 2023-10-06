let users ={ 'email': 'test@test.de', 'password': 'test' };

const user = users.email;

function showSignUp() {
    document.getElementById('sign-up').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
}

function hideSignUp() {
    document.getElementById('sign-up').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
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
