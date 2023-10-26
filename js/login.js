/**
 * Asynchronous function to log in a user.
 * It checks the provided email and password against the `users` array.
 * If a match is found, it saves the user's email and name to the LocalStorage and redirects to 'summary.html'.
 * Otherwise, it shows a popup with an error message.
 * @async
 */
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

/**
 * Saves a user's email and name to LocalStorage.
 * 
 * @param {string} u - The user's email.
 * @param {string} n - The user's name.
 */
function saveUserinLocalStorge(u,n) {
    user = JSON.stringify(u);
    user_name = JSON.stringify(n);
    localStorage.setItem('user', user);
    localStorage.setItem('name', user_name);
}
