const STORAGE_TOKEN = '8A3U4MK7U3QQZFIE9YT3HJC3MLRAQ8J3J7J4DZ5Y';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


let user = 'test@test.de'; //User1: test@test.de //User2: 1234@test.de
let list;

SaveDataInLocalStorageFromServer(user);

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

async function SaveDataInLocalStorageFromServer(user) {
    let list = await JSON.parse(await getItem(user + '-list'));
    let listAsText = JSON.stringify(list);
    localStorage.setItem('list', listAsText);
}

async function SaveInLocalStorageAndServer(user) {
    let listAsText = JSON.stringify(list);
    localStorage.setItem('list', listAsText);
    setItem(user + '-list', list);
    console.log('Liste:', list, 'wurde zum User:', user + '-list', 'hinzugefügt')
}

function loadInLocalStorage() {
    let listAsText = localStorage.getItem('list');
    if (listAsText) {
        list = JSON.parse(listAsText);
    }
}



function deleteLocalStorage() {
    localStorage.clear();
}


// This is the Guest list
let geustlist = [
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
