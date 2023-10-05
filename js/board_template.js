
let draggedElement;
let list = [{
    'id': 0,
    'task_board': 'to_do',
    'category': {
        'text': 'Coden',
        'color': 'yellow'
    },
    'date': '15/10/2024',
    'priority' : 'Medium',
    'headline': 'Feedback zur Seite',
    'text': 'Warten wir mal ab wie sich die Seite so entwickelt.',
    'subtasks': [{
        "text": "Sprache Überarbeiten",
        "completed": 0
    }, {
        "text": "Text Überprüfen",
        "completed": 1
    }],
    'task_user': [{
        "name": 'TT',
        "color": 'green'
    },
    {
        "name": 'ET',
        "color": 'blue'
    }]
},
{
    'id': 1,
    'task_board': 'in_progress',
    'category': {
        'text': 'Sonstiges',
        'color': 'red'
    },
    'date': '11/10/2024',
    'priority' : 'Low',
    'headline': 'Witziges',
    'text': 'In Schweden heißt Mutter "Mor". Großmutter heißt "Mormor". Uhrgroßmutter heißt "Gammelmormor".',
    'subtasks': [],
    'task_user': [{
        "name": 'TT',
        "color": 'green'
    },
    {
        "name": 'ET',
        "color": 'blue'
    },
    {
        "name": 'ET',
        "color": 'blue'
    },
    {
        "name": 'ET',
        "color": 'blue'
    }
    ],
},
{
    'id': 2,
    'task_board': 'await_feedback',
    'category': {
        'text': 'Css',
        'color': 'blue'
    },
    'date': '15/02/2023',
    'priority' : 'Low',
    'headline': 'Css fertigstellen',
    'text': 'Es muss noch sehr viel gemacht werden.',
    'subtasks': [],
    'task_user': [{
        "name": 'ET',
        "color": 'blue'
    }
    ],
},
{
    'id': 3,
    'task_board': 'done',
    'category': {
        'text': 'Löschen',
        'color': 'green'
    },
    'date': '10/07/2022',
    'priority' : 'Urgent',
    'headline': 'Fertige Projekte',
    'text': 'Nun ist es geschafft, Besten dank an das ganze Team!',
    'subtasks': [{
        "text": "Sprache Überarbeiten",
        "completed": 0
    }, {
        "text": "Text Überprüfen",
        "completed": 1
    }, {
        "text": "Sprache Überarbeiten",
        "completed": 0
    }, {
        "text": "Text Überprüfen",
        "completed": 0
    }],
    'task_user': [{
        "name": 'TT',
        "color": 'red'
    },
    {
        "name": 'AF',
        "color": 'red'
    }, {
        "name": 'ET',
        "color": 'red'
    }
    ]
}
];


function createBoardTasks(id, category, headline, text) {
    return `<div onclick="loadBoardCard(${id})" id="" draggable="true" ondragstart="startDragging(${id})" class="board_fbc board_note" >
        <div class="board_task_headline" style="background-color: ${category.color};">${category.text}
        </div>
        <div class="board_task_header">${headline}
        </div>
        <div class="board_task_text">${text}
        </div>
        <div class="board_fbsbc" id="task_subtask${id}">
            <div class="board_task_progess_empty">
                <div id="progress-bar-25" class="board_task_progess" role="progressbar" aria-valuenow="75"
                    aria-valuemin="0" aria-valuemax="100" style="width: 50%;">
                </div>
            </div>
            <div class="board_task_progess_text">
            1/2 Subtasks
            </div>
        </div>
        <div class="board_fbsbc board_footerline">
            <div id="task_user${id}" class="board_fbfb board_task_name_box">
            </div>
            <div class="board_task_prio"><img src="./img/task_prio-m.svg" alt="">
            </div>
        </div>
    </div>`;
}

function createBoardUsers(color, name) {
    return `
    <div class="board_task_name board_fbcc" style="background: ${color};">${name}
    </div>`;
}

function createBoardSubtasks(taskcompleted, taskall, percent) {
    return `
    <div class="board_task_progess_empty">
        <div id="progress-bar-25" class="board_task_progess" role="progressbar" aria-valuenow="75"
        aria-valuemin="0" aria-valuemax="100" style="width: ${percent}%;">
        </div>
    </div>
    <div class="board_task_progess_text">
        ${taskcompleted}/${taskall} Subtasks
    </div>`;
}


function createBoradCard(id,story,story_bg,headline,text,date,priority,priority_img){
    return`
    <div class="board_detail_box board_fbcc" onclick="closeBoardCard()" >
    <div class="board_detail_card" onclick="notClose(event)">
        <div class="board_fbsbc">
            <div id="Card_story${id}" class="board_detail_header board_fbcc"  style="background-color: ${story_bg};">${story}</div>
            <img onclick="closeBoardCard()" src="./img/Close.svg" alt="">
        </div>
        <div class="board_detail_headline">${headline}
        </div>
        <div class="board_detail_text">${text}
        </div>
        <div class="board_fbfb board_detail_date_prio">
            <div style="width: 20%;">Due date:
            </div>
            <div>${date}
            </div>
        </div>
        <div class="board_fbfb board_detail_date_prio">
            <div style="width: 20%;">Priority:
            </div>
            <div>${priority}<img src="${priority_img}" alt="">
            </div>
        </div>
        <div id="board-card-users${id}" class="board_dfcfsco board_detail_date_prio">Assigned To:
            <div class="board_dfcb" style="margin-top: 20px;margin-left: 25px;">
                <div class="board_task_name board_fbcc" style="background: green;">TT
                </div>
                <span class="board_detail_name"> Tony Tech</span>
            </div>
            <div class="board_dfcb" style="margin-top: 20px;margin-left: 25px;">
                <div class="board_task_name board_fbcc" style="background: green;">TT
                </div>
                <span class="board_detail_name"> Tony Tech</span>
            </div>
        </div>
        <div id="board-card-subtasks${id}" class="board_dfcfsco board_detail_date_prio">Subtasks
            <div class="board_dfcb" style="margin-top: 20px;margin-left: 5px;">
                <img class="board_fbcc" src="./img/Check button.svg" alt="">
                <span class="board_detail_subtasks"> Implement Recipe Recommendation</span>
            </div>
            <div class="board_dfcb" style="margin-top: 20px;margin-left: 5px;">
                <img class="board_fbcc" src="./img/Check button none.svg" alt="">
                <span class="board_detail_subtasks"> Implement Recipe Recommendation</span>
            </div>
        </div>
        <div class="board_dfec board_detail_del_edit" style="margin-top: 30px;">
            <div onclick="deleteTask(${id})" class="board_dfcb"><img  src="./img/delete.svg" alt="">Delete
                <img style="cursor: default;" src="./img/stroked_vertically.svg" alt="">
            </div>
            <div onclick="editTask(${id})" class="board_dfcb"><img  src="./img/edit.svg" alt="">Edit</div>
        </div>
    </div>
</div>
    `;
}