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
        document.getElementById('board_' + task_board).innerHTML = "";
        for (let i = 0; i < filter.length; i++) {
            const element = filter[i];
            let priority_img = './img/task-prio-' + element.priority.charAt(0).toLowerCase() + '.svg'
            document.getElementById('board_' + task_board).innerHTML +=
                createBoardTasks(element.id, element.category, element.headline, element.text, priority_img);
            loadBoardUsers(element.id, element.task_user);
            loadBoardSubtasks(element.id, element.subtasks);
        }
    } else {
        taskBoardEmpty(task_board);
    }
}

function taskBoardEmpty(task) {
    let tasktext = document.getElementById(`board_${task}_headline`).innerHTML;
    document.getElementById('board_' + task).innerHTML = `
        <div class="board_no_task board_fbccco">No tasks ${tasktext}</div>`;
}

function loadBoardUsers(id, task_user) {
    for (let i = 0; i < task_user.length; i++) {
        const element = task_user[i];
        let task_user_number = `task_user${id}`;
        document.getElementById(task_user_number).innerHTML += createBoardUsers(element.color, element.name);
    };
}

function loadBoardSubtasks(id, subtasks) {
    var element_subtask = 0;
    var element_percent = 0;
    let subtask_number = `task_subtask${id}`;
    for (let i = 0; i < subtasks.length; i++) {
        const element = subtasks[i];
        element_subtask = element_subtask + element.completed;
        element_percent = element.completed + element_percent;
    }
    if (subtasks.length) {
        percent = (element_percent / subtasks.length) * 100;
        document.getElementById(subtask_number).innerHTML = createBoardSubtasks(element_subtask, subtasks.length, percent);
    } else {
        document.getElementById(subtask_number).innerHTML = "";
    };
}

function startDragging(id) {
    draggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    list[draggedElement]['task_board'] = category;
    initBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('board_box_highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('board_box_highlight');

}

function searchAllNote() {
    var search = document.getElementById('search_board').value;
    search = search.toLowerCase();
    let found = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        found = searchNote(i, search, found, element.headline, element.text);
    };
}

function searchNote(i, search, found, headline, text) {
    if (headline.toLowerCase().includes(search) || text.toLowerCase().includes(search)) {
        document.getElementById(i).classList.remove('dn');
        found++;
    } else {
        document.getElementById(i).classList.add('dn');
    };
    return found;
}

function notClose(event) {
    event.stopPropagation();
}

function closeBoardCard() {
    document.getElementById('board_detail').innerHTML = "";
}

function deleteTask(id) {
    list[id] = "";
    closeBoardCard();
    loadTaskBoard();
    showPopup("Task deleted");
}

function editTask(id) {
}

function loadBoardCard(id) {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.id == id) {
            generateTaskData(element);
            document.getElementById('board_detail').innerHTML = createBoradCard(id, story, story_bg, headline, text, date, priority, priority_img);
            createBordCardUsers(id, element.task_user);
            createBordCardSubtasks(id, element.subtasks);
        }
    }
}

function generateTaskData(element) {
    story = element.category.text;
    story_bg = element.category.color;
    headline = element.headline;
    text = element.text;
    date = element.date;
    priority = element.priority;
    priority_img = './img/task-prio-' + element.priority.charAt(0).toLowerCase() + '.svg'
    return;
}

function createBordCardUsers(id, users) {
    document.getElementById(`board-card-users${id}`).innerHTML = "";
    if (users.length >= 1) {
        document.getElementById(`board-card-users${id}`).innerHTML = 'Assigned To:';
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            document.getElementById(`board-card-users${id}`).innerHTML += createBoardCardUsers(element.first_name, element.last_name, element.name, element.color)
        }
    }
}

function createBordCardSubtasks(id, subtasks) {

    document.getElementById(`board-card-subtasks${id}`).innerHTML = "";
    if (subtasks.length >= 1) {
        document.getElementById(`board-card-subtasks${id}`).innerHTML = 'Subtasks';
        for (let i = 0; i < subtasks.length; i++) {
            const element = subtasks[i];
            if (element.completed == 1) {
                var completed = './img/Check button.svg';
            } else {
                var completed = './img/Check button none.svg';
            }
            document.getElementById(`board-card-subtasks${id}`).innerHTML += createBoardCardSubtaks(id, i, element.completed, element.text, completed);
        }
    }
}

function toggelSubtaskCompleted(id, i, status) {
    if (status == 1) {
        list[id].subtasks[i].completed = 0;
    } else {
        list[id].subtasks[i].completed = 1;
    }
    loadBoardCard(id);
}


