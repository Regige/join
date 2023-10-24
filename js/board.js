/**
 * This function initializes the board page
 */


async function initBoard() {
    loadUserData();
    checkUserLogin();
    loadTaskBoard();
}

/**
 * This function loads all Borad tasks
 */
async function loadTaskBoard() {
    loadFromLocalStorage();
    filterTaskBoard('to_do');
    filterTaskBoard('in_progress');
    filterTaskBoard('await_feedback');
    filterTaskBoard('done');
    loadTouch();
}

/**
 * This function loads all individual tasks filtered
 * 
 * @param {String} task_board This string contains the individual tasks
 */
function filterTaskBoard(task_board) {
    let filter = list.filter(t => t['task_board'] == task_board);
    if (filter.length) {
        document.getElementById('board_' + task_board).innerHTML = "";
        for (let i = 0; i < filter.length; i++) {
            const element = filter[i];
            let priority_img = './img/task-prio-' + element.priority.charAt(0).toLowerCase() + '.svg';
            document.getElementById('board_' + task_board).innerHTML +=
                createBoardTasks(element.id, element.category, element.headline, element.text, priority_img);
            loadBoardUsers(element.id, element.task_user);
            loadBoardSubtasks(element.id, element.subtasks);
        }
    } else {
        taskBoardEmpty(task_board);
    }
}

/**
 * This function loads an empty task if none exists
 * 
 * @param {String} task This string contains the individual tasks
 */
function taskBoardEmpty(task, option) {
    let tasktext = document.getElementById(`board_${task}_headline`).innerHTML;
    if (option != true) {
        document.getElementById('board_' + task).innerHTML = `
        <div class="board_no_task board_fbccco">No tasks ${tasktext}</div>`;
    } else {
        document.getElementById('board_' + task).innerHTML += `
        <div class="board_no_task board_fbccco">No tasks ${tasktext}</div>`;
    }
}

/**
 * This function loads all added users to the respective tasks
 * 
 * @param {Number} id           ID of the user in the task
 * @param {String} task_user    User task of the individual tasks
 */
function loadBoardUsers(id, task_user) {
    for (let i = 0; i < task_user.length; i++) {
        const element = task_user[i];
        let task_user_number = `task_user${id}`;
        document.getElementById(task_user_number).innerHTML += createBoardUsers(element.color, element.name);
    };
}

/**
 * This function loads all task to the respective tasks
 * 
 * @param {id} id           ID of the task 
 * @param {String} subtasks Sub task of the individual tasks
 */
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

/**
 * This function uses the ID to determine the Dropbox
 * 
 * @param {Number} id Dropbox number
 */
function startDragging(id) {
    draggedElement = id;
}

/**
 * This function is a standard function from w3 schools which executes a drop event
 * 
 * @param {String} event Standard string from W3 schools
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * This function loads the respective Dropbox into the released Dropbox and saves it in the local storag
 * 
 * @param {String} category Submission of the task as a string
 */
function moveTo(category) {
    list[draggedElement]['task_board'] = category;
    SaveInLocalStorageAndServer(user, 'list', list);
    initBoard();
}

/**
 * This function lights up the Dropbox window
 * 
 * @param {Number} id ID of Box
 */
function highlight(id) {
    document.getElementById(id).classList.add('board_box_highlight');
}

/**
 * This function removes the highlight of the Dropbox window
 * 
 * @param {Number} id ID of Box
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('board_box_highlight');
}

/**
 * This function starts the search function in the Board Task area
 */
function searchAllNote() {
    var search = document.getElementById('search_board').value;
    search = search.toLowerCase();
    let found = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        found = searchNote(element.id, search, found, element.headline, element.text);
    };
}

/**
 * This function searches the entire task board for the input
 * 
 * @param {Number} i        ID in which task is being searched
 * @param {String} search   The search text
 * @param {Number} found    Indicates how many were found
 * @param {String} headline Search the heading
 * @param {String} text     Search the text
 * @returns                 returns the found element
 */
function searchNote(i, search, found, headline, text) {
    if (headline.toLowerCase().includes(search) || text.toLowerCase().includes(search)) {
        document.getElementById(i).classList.remove('dn');
        found++;
    } else {
        document.getElementById(i).classList.add('dn');
    };
    return found;
}


/**
 * This function is needed to close a DIV container in the background
 * 
 * @param {String} event Standard string from W3 schools
 */
function notClose(event) {
    event.stopPropagation();
}

/**
 * This function opens the detail boardtask view
 */
function closeBoardCard() {
    document.getElementById('board_detail').innerHTML = "";
    loadTaskBoard();
    document.getElementById('board_body').classList.remove('board_fixed');
}


/**
 * This function deletes a task from the list based on the ID
 * 
 * @param {Number} id ID for Tasks
 */
function deleteTask(id) {
    if (user != 'guest') {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if (id == element.id) {
                list.splice(i, 1);
            }
        }
        SaveInLocalStorageAndServer(user, listString, list);
        closeBoardCard();
        loadTaskBoard();
        showPopup("Task deleted");
    } else {
        showPopup('Cannot be deleted as a guest. Please create an account')
    }
}

function addGuestTask() {
        if (user == 'guest') {
            showPopup('Cannot be deleted as a guest. Please create an account')
        }
}

/**
 * This function loads the board card detail view
 * 
 * @param {Number} id ID of TTasks
 */
function loadBoardCard(id) {
    document.getElementById('board_body').classList.add('board_fixed');
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

/**
 * This function loads the data of the selected task and then returns it
 * 
 * @param {String} element  Data for Task 
 * @returns                 returns the completed generated task
 */
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

/**
 * This function creates the associated users in the detail board map
 * 
 * @param {Number} id       ID for Card
 * @param {String} users    User for Card
 */
function createBordCardUsers(id, users) {
    document.getElementById(`board-card-users${id}`).innerHTML = "";
    if (users.length >= 1) {
        document.getElementById(`board-card-users${id}`).innerHTML = 'Assigned To:';
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            document.getElementById(`board-card-users${id}`).innerHTML += createBoardCardUsers(element.full_name, element.name, element.color)
        }
    }
}

/**
 * This function creates the individual subtasks in the board task detail view
 * 
 * @param {Number} id           ID for Card
 * @param {String} subtasks     Subtask for Card
 */
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
    loadBoardSubtasks(id, subtasks);
}


/**
 * This function asks whether the individual substacks have already been completed. These are then saved locally
 * 
 * @param {Number} id ID of the Task
 * @param {*} i       ID of the Subtask
 * @param {*} status  status of the individual task
 */
function toggelSubtaskCompleted(id, i, status) {
    if (status == 1) {
        list[id].subtasks[i].completed = 0;
    } else {
        list[id].subtasks[i].completed = 1;
    }
    createBordCardSubtasks(id, list[id]['subtasks'])
    SaveInLocalStorageAndServer(user, listString, list);
}
