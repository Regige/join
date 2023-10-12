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
        console.log(e);
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
            console.log(elem.id);
            console.log(window.scrollY + elem.getBoundingClientRect().top)
        });
        console.log(window.scrollY + elem.getBoundingClientRect().top)
        elem.addEventListener('touchend', eve => {
            if (elem.getBoundingClientRect().top > inProgressPos.top) {
                console.log(elem.getBoundingClientRect().top)
            }
            loadTaskBoard();
        });
    });
}


function loadTouch() {

    task = document.querySelectorAll('.board_note');
    toDo = document.querySelector('.board_to_do');
    inProgress = document.querySelector('.board_in_progress');
    toDoPos = toDo.getBoundingClientRect();
    inProgressPos = inProgress.getBoundingClientRect();
    console.log(toDoPos);
    task.forEach(addStart);
}

function calcPositionTasks() {
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
    positionTaskBoxCalc(counter_to_do, conter_in_progress, counter_await_feedback, counter_done);
}

function positionTaskBoxCalc(a,b,c,d){
let posTop = 0;
let posToDo = 100;
let posToDoNone= 150;
}



window.addEventListener('scroll', () => {
  //console.log(window.scrollY)
});
