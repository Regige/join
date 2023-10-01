let contacts = [
    {
        'name': 'Anton Mayer',
        'email': 'anton@gmail.com',
        'phone': '+49 1111 111 11 1'
    },
    {
        'name': 'Benedikt Ziegler',
        'email': 'benedikt@gmail.com',
        'phone': '+49 2222 222 22 2'
    },
    {
        'name': 'Dara Fischer',
        'email': 'dara@gmail.com',
        'phone': '+49 3333 333 33 3'
    },
    {
        'name': 'Markus Mayer',
        'email': 'markus@gmail.com',
        'phone': '+49 4444 444 44 4'
    },
]


function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        contactsList.innerHTML = /*html*/`
            
        `;
    };
}