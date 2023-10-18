const STORAGE_TOKEN = '8A3U4MK7U3QQZFIE9YT3HJC3MLRAQ8J3J7J4DZ5Y';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let user;// = '1234@test.de'; //User1: test@test.de //User2: 1234@test.de
let list;
let contacts;

let listString = 'list';
let contactsString = 'contacts';




async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `${key} not found`;
    });
}

async function SaveDataInLocalStorageFromServer(users, keyString) {
    let data = await JSON.parse(await getItem(users + `-${keyString}`));
    let dataAsText = JSON.stringify(data);
    localStorage.setItem(keyString, dataAsText);
}

async function SaveInLocalStorageAndServer(users, keyString, dataObject) {
    let dataAsText = JSON.stringify(dataObject); // variable list or contacts 
    localStorage.setItem(keyString, dataAsText);
    setItem(users + `-${keyString}`, dataObject);
}

function loadFromLocalStorage() {            
    let listAsText = localStorage.getItem('list');
    if (listAsText) {
        list = JSON.parse(listAsText);
    }
}

function loadFromLocalStorageContacts() {
    let dataAsText = localStorage.getItem('contacts');
    if (dataAsText) {
        contacts = JSON.parse(dataAsText);
    }
}

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

function clearLocalStorage() {
    localStorage.clear();
}

// This is the Guest list
let listold = [
    {
        'id': 0,
        'task_board': 'to_do',
        'category': {
            'text': 'Arbeit',
            'color': 'blue'
        },
        'date': '2023-11-12',
        'priority': 'Medium',
        'headline': 'Projektplanung',
        'text': 'Erstellen Sie einen detaillierten Projektplan für das kommende Projekt.',
        'subtasks': [{
            "text": "Sprache Überarbeiten",
            "completed": 0
        }, {
            "text": "Text Überprüfen",
            "completed": 1
        }, {
            "text": "Layout Prüfen",
            "completed": 0
        }, {
            "text": "Abläufe Prüfen",
            "completed": 0
        }],
        'task_user': [
            {
                "full_name": 'Lisa Müller',
                "name": 'LM',
                "color": 'purple'
            },
            {
                "full_name": 'Max Schmidt',
                "name": 'MS',
                "color": 'orange'
            }
        ]
    },
    {
        'id': 1,
        'task_board': 'done',
        'category': {
            'text': 'Einkauf',
            'color': 'green'
        },
        'date': '2023-10-22',
        'priority': 'Urgent',
        'headline': 'Einkaufsliste',
        'text': 'Besorgen Sie Lebensmittel für das Wochenende.',
        'subtasks': [],
        'task_user': [
            {
                "full_name": 'Anna Schneider',
                "name": 'AS',
                "color": 'blue'
            }
        ]
    },
    {
        'id': 2,
        'task_board': 'to_do',
        'category': {
            'text': 'Privat',
            'color': 'purple'
        },
        'date': '2023-09-11',
        'priority': 'Medium',
        'headline': 'Geburtstags geschenk kaufen',
        'text': 'Besorgen Sie ein Geburtstagsgeschenk für einen Freund.',
        'subtasks': [{
            "text": "Lego kaufen",
            "completed": 0
        }, {
            "text": "Kekse kaufen",
            "completed": 1
        }, {
            "text": "Kaffee kaufen",
            "completed": 1
        }, {
            "text": "Kuchen kaufen",
            "completed": 1
        }, {
            "text": "Blumen kaufen",
            "completed": 1
        }, {
            "text": "Getränke kaufen",
            "completed": 1
        }, {
            "text": "Lego kaufen",
            "completed": 0
        }, {
            "text": "Kekse kaufen",
            "completed": 1
        }, {
            "text": "Kaffee kaufen",
            "completed": 1
        }, {
            "text": "Kuchen kaufen",
            "completed": 1
        }, {
            "text": "Blumen kaufen",
            "completed": 1
        }, {
            "text": "Getränke kaufen",
            "completed": 1
        }],
        'task_user': [
            {
                "full_name": 'Julia Weber',
                "name": 'JW',
                "color": 'green'
            }
        ]
    },
    {
        'id': 3,
        'task_board': 'in_progress',
        'category': {
            'text': 'Arbeit',
            'color': 'blue'
        },
        'date': '2023-10-18',
        'priority': 'Urgent',
        'headline': 'Präsentation vorbereiten',
        'text': 'Erstellen Sie eine Präsentation für das Meeting nächste Woche.',
        'subtasks': [],
        'task_user': [
            {
                "full_name": 'Tom Hansen',
                "name": 'TH',
                "color": 'orange'
            }
        ]
    },
    {
        'id': 4,
        'task_board': 'await_feedback',
        'category': {
            'text': 'Sonstiges',
            'color': 'red'
        },
        'date': '2023-05-14',
        'priority': 'Low',
        'headline': 'Haustier füttern, Wasser auffüllen',
        'text': 'Vergessen Sie nicht, Ihr Haustier zu füttern.',
        'subtasks': [],
        'task_user': [
            {
                "full_name": 'Sophia Müller',
                "name": 'SM',
                "color": 'pink'
            }
        ]
    },
    {
        'id': 5,
        'task_board': 'await_feedback',
        'category': {
            'text': 'Einkauf',
            'color': 'green'
        },
        'date': '2023-10-13',
        'priority': 'Urgent',
        'headline': 'Kleidung kaufen',
        'text': 'Besorgen Sie neue Kleidung für den kommenden Winter.',
        'subtasks': [],
        'task_user': [
            {
                "full_name": 'Michael Bauer',
                "name": 'MB',
                "color": 'blue'
            }
        ]
    }
];


let kanban_board = [
    {
        'id': 0,
        'task_board': 'to_do',
        'category': {
            'text': 'Work',
            'color': 'blue'
        },
        'date': '2023-11-12',
        'priority': 'Medium',
        'headline': 'Project Planning',
        'text': 'Create a detailed project plan for the upcoming project.',
        'subtasks': [
            { "text": "Revise Language", "completed": 0 },
            { "text": "Check Text", "completed": 1 },
            { "text": "Review Layout", "completed": 0 },
            { "text": "Check Workflows", "completed": 0 }
        ],
        'task_user': [
            { "full_name": 'Lisa Müller', "name": 'LM', "color": 'purple' },
            { "full_name": 'Max Schmidt', "name": 'MS', "color": 'orange' }
        ]
    },
    {
        'id': 1,
        'task_board': 'in_progress',
        'category': {
            'text': 'Other',
            'color': 'yellow'
        },
        'date': '2023-11-12',
        'priority': 'Medium',
        'headline': 'Revise Text',
        'text': 'Revise the text according to the requirements.',
        'subtasks': [
            { "text": "Check Grammar", "completed": 0 },
            { "text": "Check Spelling", "completed": 1 },
            { "text": "Revise Style", "completed": 0 }
        ],
        'task_user': [
            { "full_name": 'Lisa Müller', "name": 'LM', "color": 'purple' }
        ]
    },
    {
        'id': 2,
        'task_board': 'to_do',
        'category': {
            'text': 'Work',
            'color': 'blue'
        },
        'date': '2023-11-12',
        'priority': 'Medium',
        'headline': 'Check Layout',
        'text': 'Check the document layout for consistency and user-friendliness.',
        'subtasks': [
            { "text": "Check Colors", "completed": 0 },
            { "text": "Check Fonts", "completed": 0 },
            { "text": "Check Images", "completed": 0 }
        ],
        'task_user': [
            { "full_name": 'Max Schmidt', "name": 'MS', "color": 'orange' }
        ]
    },
    {
        'id': 3,
        'task_board': 'await_feedback',
        'category': {
            'text': 'Work',
            'color': 'blue'
        },
        'date': '2023-11-12',
        'priority': 'Low',
        'headline': 'Check Workflows',
        'text': 'Review the workflows and ensure they are efficient.',
        'subtasks': [
            { "text": "Document Processes", "completed": 0 },
            { "text": "Identify Weak Points", "completed": 0 },
            { "text": "Develop Improvement Suggestions", "completed": 0 }
        ],
        'task_user': [
            { "full_name": 'Max Schmidt', "name": 'MS', "color": 'green' }
        ]
    }
];
