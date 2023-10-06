const STORAGE_TOKEN = '8A3U4MK7U3QQZFIE9YT3HJC3MLRAQ8J3J7J4DZ5Y';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

let list = [
    {
        'id': 0,
        'task_board': 'to_do',
        'category': {
            'text': 'Arbeit',
            'color': 'blue'
        },
        'date': '11/11/2024',
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
                "first_name": 'Lisa',
                "last_name": 'Müller',
                "name": 'LM',
                "color": 'purple'
            },
            {
                "first_name": 'Max',
                "last_name": 'Schmidt',
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
        'date': '11/12/2024',
        'priority': 'Urgent',
        'headline': 'Einkaufsliste',
        'text': 'Besorgen Sie Lebensmittel für das Wochenende.',
        'subtasks': [],
        'task_user': [
            {
                "first_name": 'Anna',
                "last_name": 'Schneider',
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
        'date': '11/13/2024',
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
                "first_name": 'Julia',
                "last_name": 'Weber',
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
        'date': '11/14/2024',
        'priority': 'Urgent',
        'headline': 'Präsentation vorbereiten',
        'text': 'Erstellen Sie eine Präsentation für das Meeting nächste Woche.',
        'subtasks': [],
        'task_user': [
            {
                "first_name": 'Tom',
                "last_name": 'Hansen',
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
        'date': '11/15/2024',
        'priority': 'Low',
        'headline': 'Haustier füttern, Wasser auffüllen',
        'text': 'Vergessen Sie nicht, Ihr Haustier zu füttern.',
        'subtasks': [],
        'task_user': [
            {
                "first_name": 'Sophia',
                "last_name": 'Müller',
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
        'date': '11/16/2024',
        'priority': 'Medium',
        'headline': 'Kleidung kaufen',
        'text': 'Besorgen Sie neue Kleidung für den kommenden Winter.',
        'subtasks': [],
        'task_user': [
            {
                "first_name": 'Michael',
                "last_name": 'Bauer',
                "name": 'MB',
                "color": 'blue'
            }
        ]
    }
]
    ;