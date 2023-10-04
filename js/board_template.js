
let draggedElement;
let list = [{
    'id': 0,
    'task_board': 'to_do',
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
    'task_board': 'in_progress',
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
    'task_board': 'await_feedback',
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
    'task_board': 'done',
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


function createBoardTask(id, category, headline, text) {
    return `<div id="${id}" draggable="true" ondragstart="startDragging(${id})" class="board_fbc board_note" >
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
}

