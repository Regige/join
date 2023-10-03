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

function highlight(id) {
    document.getElementById(id).classList.add('board_box_highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('board_box_highlight');

}