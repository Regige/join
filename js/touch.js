let empty_box = 136;
let box = 325;
let distance_top = 280;

let toDo_top;
let toDo_buttom;
let inProgress_top;
let inProgress_buttom;
let awaitFeedback_top;
let awaitFeedback_buttom;
let done_top;
let down_buttom;

let task;
let toDo;
let inProgress;
let awaitFeedback;
let done;
let toDoPos;
let inProgressPos;
let awaitFeedbackPos;
let donePos;




function addStart(elem) {
    elem.addEventListener('touchstart', e => {
        counter = calcCounterTasks();
        noTasksTouch(elem.id);
        calcPositionTasks();
        let startX = e.changedTouches[0].clientX;
        let startY = e.changedTouches[0].clientY;
        elem.addEventListener('touchmove', eve => {
            eve.preventDefault();
            let nextX = eve.changedTouches[0].clientX;
            let nextY = eve.changedTouches[0].clientY;
            elem.style.left = nextX - startX + 'px';
            elem.style.top = nextY - startY + 'px';
            elem.style.border = '1px solid black';
            elem.style.opacity = '0.9';
            elem.style.zIndex = 10;
            elem.style.position = 'absolute';
            ist_position = window.scrollY + elem.getBoundingClientRect().top;
            if (ist_position >= toDo_top && ist_position <= toDo_buttom) {
                highlight('board_to_do');
            } else {
                removeHighlight('board_to_do');
            }
            if (ist_position >= inProgress_top && ist_position <= inProgress_buttom) {
                highlight('board_in_progress');
            } else {
                removeHighlight('board_in_progress');
            }
            if (ist_position >= awaitFeedback_top && ist_position <= awaitFeedback_buttom) {
                highlight('board_await_feedback');
            } else {
                removeHighlight('board_await_feedback');
            }
            if (ist_position >= done_top && ist_position <= done_buttom) {
                highlight('board_done');
            } else {
                removeHighlight('board_done');
            }
        });
        elem.addEventListener('touchend', eve => {
            if (ist_position >= toDo_top && ist_position <= toDo_buttom) {
                list[elem.id].task_board = 'to_do';
                removeHighlight('board_to_do');
            }
            if (ist_position >= inProgress_top && ist_position <= inProgress_buttom) {
                list[elem.id].task_board = 'in_progress';
                removeHighlight('board_in_progress');
            }
            if (ist_position >= awaitFeedback_top && ist_position <= awaitFeedback_buttom) {
                list[elem.id].task_board = 'await_feedback';
                removeHighlight('board_await_feedback');

            }
            if (ist_position >= done_top && ist_position <= done_buttom) {
                list[elem.id].task_board = 'done';
                removeHighlight('board_done');
            }
            SaveInLocalStorageAndServer(user, 'list', list);
            loadTaskBoard();
        });
    });
}

function loadTouch() {
    task = document.querySelectorAll('.board_note');
    toDo = document.querySelector('.board_to_do');
    inProgress = document.querySelector('.board_in_progress');
    awaitFeedback = document.querySelector('.board_await_feedback');
    done = document.querySelector('.board_done');
    toDoPos = toDo.getBoundingClientRect();
    inProgressPos = inProgress.getBoundingClientRect();
    awaitFeedbackPos = awaitFeedback.getBoundingClientRect();
    donePos = done.getBoundingClientRect();
    task.forEach(addStart);
}

function calcCounterTasks() { //hier wird erechnet wlcher platz in der Liste belegt ist
    let counter_to_do = 0;
    let conter_in_progress = 0;
    let counter_await_feedback = 0;
    let counter_done = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.task_board == 'to_do') {
            counter_to_do = counter_to_do + 1;
        }
        if (element.task_board == 'in_progress') {
            conter_in_progress = conter_in_progress + 1;
        }
        if (element.task_board == 'await_feedback') {
            counter_await_feedback = counter_await_feedback + 1;
        }
        if (element.task_board == 'done') {
            counter_done = counter_done + 1;
        }
    }
    return [counter_to_do, conter_in_progress, counter_await_feedback, counter_done];
}

function calcPositionTasks() {
    if (counter[0] == 0) {
        toDo_top = distance_top;
        toDo_buttom = distance_top + empty_box;
    } else {
        toDo_top = distance_top;
        toDo_buttom = distance_top + box;
    } if (counter[1] == 0) {
        inProgress_top = toDo_buttom;
        inProgress_buttom = toDo_buttom + empty_box;
    } else {
        inProgress_top = toDo_buttom;
        inProgress_buttom = toDo_buttom + box;
    } if (counter[2] == 0) {
        awaitFeedback_top = inProgress_buttom;
        awaitFeedback_buttom = inProgress_buttom + empty_box;
    } else {
        awaitFeedback_top = inProgress_buttom;
        awaitFeedback_buttom = inProgress_buttom + box;
    } if (counter[3] == 0) {
        done_top = awaitFeedback_buttom;
        done_buttom = awaitFeedback_buttom + empty_box;
    } else {
        done_top = awaitFeedback_buttom;
        done_buttom = awaitFeedback_buttom + box;
    }
}


function noTasksTouch(id) {

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.id == id) {
            if (element.task_board == 'to_do') {
                counter[0] = counter[0] - 1;
                if (counter[0] == 0) {
                }
            }
            if (element.task_board == 'in_progress') {
                counter[1] = counter[1] - 1;
                if (counter[1] == 0) {
                }
            }
            if (element.task_board == 'await_feedback') {
                counter[2] = counter[2] - 1;
                if (counter[2] == 0) {
                }
            }
            if (element.task_board == 'done') {
                counter[3] = counter[3] - 1;
                if (counter[3] == 0) {
                }
            }
        }
    }
}