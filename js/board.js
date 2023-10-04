function initBoard() {
    loadTaskBoard();
}


function loadTaskBoard() {
    filterTaskBoard('to_do');
    filterTaskBoard('in_progress');
    filterTaskBoard('await_feedback');
    filterTaskBoard('done');
}


function filterTaskBoard(task_board) {
    let filter = list.filter(t => t['task_board'] == task_board);
    if (filter.length) {
        console.log('board_' + task_board)
        document.getElementById('board_' + task_board).innerHTML = "";
        for (let i = 0; i < filter.length; i++) {
            const element = filter[i];
            document.getElementById('board_' + task_board).innerHTML +=
                createBoardTask(element.id, element.category, element.headline, element.text);
            createBoardUsers(element.id, element.task_user);
        }
    } else {
        taskBoardEmpty(task_board);
    }
}

function taskBoardEmpty(task) {
    console.log(`board_${task}_headline`)
    let tasktext = document.getElementById(`board_${task}_headline`).innerHTML;
    document.getElementById('board_' + task).innerHTML = `
        <div class="board_no_task board_fbccco">No tasks ${tasktext}</div>`;
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
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    console.warn(category)
    list[draggedElement]['task_board'] = category;
    initBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('board_box_highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('board_box_highlight');

}