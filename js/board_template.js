
let draggedElement;
let list = [{
    'id': 0,
    'task_board': 'board_to_do',
    'category': {
        'text': 'Coden',
        'color': 'yellow'
    },
    'headline': 'Css fertigstellen',
    'text': 'Es muss noch sehr viel gemacht werden.',
    'subtasks': [],
    'task_user': [{
        "name": 'TT',
        "color": 'green'
    }]
},
{
    'id': 1,
    'task_board': 'board_in_progress',
    'category': {
        'text': 'Coden',
        'color': 'red'
    },
    'headline': 'Css fertigstellen',
    'text': 'Es muss noch sehr viel gemacht werden.',
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
    'task_board': 'board_await_feedback',
    'category': {
        'text': 'Coden',
        'color': 'blue'
    },
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
    'task_board': 'board_done',
    'category': {
        'text': 'Löschen',
        'color': 'green'
    },
    'headline': 'Css fertigstellen',
    'text': 'Es muss noch sehr viel gemacht werden.',
    'subtasks': [],
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


function initBoard() {
    filterTaskBoardToDo();
    filterTaskBoardInProgress();
    filterTaskBoardAwaitFeedback();
    filterTaskBoardDone();
}


function filterTaskBoardToDo() {
    let board_to_do = list.filter(t => t['task_board'] == 'board_to_do');
    console.log(board_to_do);
    document.getElementById('board_to_do').innerHTML = "";

    for (let i = 0; i < board_to_do.length; i++) {
        const element = board_to_do[i];
        document.getElementById('board_to_do').innerHTML +=
            createBoardTask(element.id, element.category, element.headline, element.text);
        console.log(element.task_user);
        createBoardUsers(element.id, element.task_user);
    }
}

function filterTaskBoardInProgress() {
    let board_in_progress = list.filter(t => t['task_board'] == 'board_in_progress');
    console.log(board_in_progress);
    document.getElementById('board_in_progress').innerHTML = "";

    for (let i = 0; i < board_in_progress.length; i++) {
        const element = board_in_progress[i];
        document.getElementById('board_in_progress').innerHTML +=
            createBoardTask(element.id, element.category, element.headline, element.text);
        console.log(element.task_user);
        createBoardUsers(element.id, element.task_user);
    }
}

function filterTaskBoardAwaitFeedback() {
    let board_await_feedback = list.filter(t => t['task_board'] == 'board_await_feedback');
    console.log(board_await_feedback);
    document.getElementById('board_await_feedback').innerHTML = "";

    for (let i = 0; i < board_await_feedback.length; i++) {
        const element = board_await_feedback[i];
        document.getElementById('board_await_feedback').innerHTML +=
            createBoardTask(element.id, element.category, element.headline, element.text);
        console.log(element.task_user);
        createBoardUsers(element.id, element.task_user);
    }
}

function filterTaskBoardDone() {
    let board_done = list.filter(t => t['task_board'] == 'board_done');
    console.log(board_done);
    document.getElementById('board_done').innerHTML = "";

    for (let i = 0; i < board_done.length; i++) {
        const element = board_done[i];
        document.getElementById('board_done').innerHTML +=
            createBoardTask(element.id, element.category, element.headline, element.text);
        console.log(element.task_user);
        createBoardUsers(element.id, element.task_user);
    }
}


function createBoardTask(id, category, headline, text) {
    let a = `<div id="${id}" draggable="true" ondragstart="startDragging(${id})" class="board_fbc board_note" >
        <div class="board_task_headline" style="background-color: ${category.color};">${category.text}
        </div>
        <div class="board_task_header">${headline}
        </div>
        <div class="board_task_text">${text}
        </div>
        <div class="board_fbsbc">
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
    return a
}

function createBoardUsers(id, task_user) {
    for (let i = 0; i < task_user.length; i++) {
        const element = task_user[i];

        let task_user_number = `task_user${id}`;

        document.getElementById(task_user_number).innerHTML += `
        <div class="board_task_name board_fbcc" style="background: ${element.color};">${element.name}
        </div>`;
    };
}

function startDragging(id) {
    draggedElement = id;
    console.warn(id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    console.log(category)
    console.log(list[draggedElement]['task_board'])
    list[draggedElement]['task_board'] = category;
    console.log(list[draggedElement]['task_board'])
    initBoard();
}