
let id = 1;
let task_board = 'board_to-do';
let category = 'Coden';
let headline = 'Css fertigstellen';
let text = 'Es muss noch sehr viel gemacht werden.';
let task_user = [{
    "name": 'TT',
    "color": 'green'
},
{
    "name": 'AF',
    "color": 'red'
}, {
    "name": 'ET',
    "color": 'blue'
},
];



function test(){
    createBoardTask(id, task_board, category, headline, text,task_user);
}



function createBoardTask(id, task_board, category, headline, text,task_user) {


    document.getElementById(task_board).innerHTML +=
    `<div id="${id}" class="board_fbc board_note">
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

    for (let j = 0; j < task_user.length; j++) {
        const element = task_user[j];
        document.getElementById(`task_user${id}`).innerHTML += `
        <div class="board_task_name board_fbcc" style="background: ${element.color};">${element.name}
        </div>`;
    }

}