const STORAGE_TOKEN = '8A3U4MK7U3QQZFIE9YT3HJC3MLRAQ8J3J7J4DZ5Y';           //The tocken to the server storage
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';    //The URL to the server storage
let user;                                                                   // Creation of users variable
let list;                                                                   //Creation of list variable
let contacts;                                                               //Creation of contact variable
let listString = 'list';                                                    //Creation of liststring variable
let contactsString = 'contacts';                                            //Creation of contactstring variable


/**
 * This function saves data on the server under a key
 * 
 * @param {String} key  Key for storing
 * @param {JSON} value  JSON to key
 * @returns             returns a status
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * This function loads data from the server. The key must be set here
 * 
 * @param {String} key   Key for storing
 * @returns         return a JSON
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `${key} not found`;
    });
}


/**
 * This function saves the user data in the local storage and on the server
 * 
 * @param {String} users        User
 * @param {String} keyString    key as string
 */
async function SaveDataInLocalStorageFromServer(users, keyString) {
    let data = await JSON.parse(await getItem(users + `-${keyString}`));
    let dataAsText = JSON.stringify(data);
    localStorage.setItem(keyString, dataAsText);
}


/**
 * This function saves the user data in the local storage and on the server
 * 
 * @param {String} users        User
 * @param {String} keyString    key as string
 * @param {String} dataObject   dataobject as string
 */
async function SaveInLocalStorageAndServer(users, keyString, dataObject) {
    let dataAsText = JSON.stringify(dataObject); // variable list or contacts 
    localStorage.setItem(keyString, dataAsText);
    setItem(users + `-${keyString}`, dataObject);
}

/**
 * This function loads the tasks data
 */
function loadFromLocalStorage() {            
    let listAsText = localStorage.getItem('list');
    if (listAsText) {
        list = JSON.parse(listAsText);
    }
}

/**
 * This function loads the contact data
 */
function loadFromLocalStorageContacts() {
    let dataAsText = localStorage.getItem('contacts');
    if (dataAsText) {
        contacts = JSON.parse(dataAsText);
    }
}

/**
 * This function loads the logged in user. If the user is a guest, the guest user is loaded
 */
async function loadUserData() {
    let userAktiv = localStorage.getItem('user');
    let user_name_Aktiv = localStorage.getItem('name');
    if (userAktiv) {
        user = JSON.parse(userAktiv);
        user_name = JSON.parse(user_name_Aktiv);
        if (user_name == null) {
            user_name = 'Guest'
        }
        await SaveDataInLocalStorageFromServer(user, listString);
        await SaveDataInLocalStorageFromServer(user, contactsString);
    }
}

/**
 * This function deletes the local storage
 */
function clearLocalStorage() {
    localStorage.clear();
}
