
let list = [{
    'id': 1,
    'task_board': 'board_to_do',
    'category': 'Coden',
    'headline': 'Css fertigstellen',
    'text': 'Es muss noch sehr viel gemacht werden.',
    'subtasks': [],
    'task_user': [{
        "name": 'TT',
        "color": 'green'
    },
    {
        "name": 'AF',
        "color": 'red'
    }, {
        "name": 'ET',
        "color": 'blue'
    }
    ]
},
{
    'id': 2,
    'task_board': 'board_in_progress',
    'category': 'Coden',
    'headline': 'Css fertigstellen',
    'text': 'Es muss noch sehr viel gemacht werden.',
    'subtasks': [],
    'task_user': [{
        "name": 'TT',
        "color": 'green'
    },
    {
        "name": 'AF',
        "color": 'red'
    }, {
        "name": 'ET',
        "color": 'blue'
    }
    ],
}
];


function filterTaskBoardInProgress() {
    let board_in_progress = list.filter(t => t['task_board'] == 'board_in_progress');

}


function initBoard() {
    filterTaskBoardToDo();
    filterTaskBoardInProgress();
}


function filterTaskBoardToDo() {
    let board_to_do = list.filter(t => t['task_board'] == 'board_to_do');
    console.log(board_to_do);
    document.getElementById('board_to-do').innerHTML = "";

    for (let i = 0; i < board_to_do.length; i++) {
        const element = board_to_do[i];
        document.getElementById('board_to-do').innerHTML +=
        createBoardTask(element.id, element.category, element.headline, element.text);
        console.log(element.task_user);
        createBoardUsers(element.id,element.task_user);
    }
}



















function createBoardTask(id, category, headline, text) {
    let a = `<div id="${id}" class="board_fbc board_note">
        <div class="board_task_headline">${category}
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