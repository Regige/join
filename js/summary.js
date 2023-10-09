
let summary_all = 0;
let summary_task = [];
let summary_urgent = 0;
let summary_urgent_date = "";
let date_time = [];

window.addEventListener('resize', executeOnScreenWidthChange);  // Monitoring the screen width
let screenWidthThreshold = 950;                                 // Screen resolution when the popup appears
let lastScreenWidth = window.innerWidth;                        // Query the screen width at the start of the page
let welcome_text;                                               // Set the welcome text variable
let user_name = 'Guest';                                        // Sets the username

async function initsummary() {
    //list = await JSON.parse(await getItem(user + '-list'));
    GreetingAfterTime();
    OneStartexecuteOnScreenWidthChange();
    loadSummaryTask();
    clacDateUrgent();
}

/** 
 * This function calculates what time of day it is. No parameters are required.
 * 
 */
function GreetingAfterTime() {
    const jetzt = new Date();
    const stunde = jetzt.getHours();

    if (stunde >= 5 && stunde < 12) {
        welcome_text = "Good morning,";
    } else if (stunde >= 12 && stunde < 18) {
        welcome_text = "Good day,";
    } else {
        welcome_text = "Good evening,";
    }
    document.getElementById('summary_welcome_text').innerHTML = welcome_text;
}

/**
 * This function checks whether the device has a smaller screen resolution. Depending on this, a popup or a welcome message will be issued.
 * 
 */

function OneStartexecuteOnScreenWidthChange() {
    if (lastScreenWidth <= screenWidthThreshold) {
        showPopupSlider();
        document.getElementById('summary_gretting').classList.add('summary_dn');
    } else {
        document.getElementById('summary_gretting').classList.remove('summary_dn');
    }
}

/**
 * This function calculates the current screen width and outputs it. In addition, a popup is generated as soon as the variable is smaller.
 * 
 */

function executeOnScreenWidthChange() {
    const currentScreenWidth = window.innerWidth;
    if (lastScreenWidth < screenWidthThreshold && currentScreenWidth >= screenWidthThreshold) {
        document.getElementById('summary_gretting').classList.remove('summary_dn');
    } else if (lastScreenWidth >= screenWidthThreshold && currentScreenWidth < screenWidthThreshold) {
        showPopupSlider();
        document.getElementById('summary_gretting').classList.add('summary_dn');
    }
    lastScreenWidth = currentScreenWidth;
}

/**
 * This function creates a popup with the respective logged in user.
 * 
 */

function showPopupSlider() {
    let text = welcome_text + user_name;
    const popup = document.createElement("div");
    popup.className = "summary_popup";
    popup.innerHTML =
        `<div class="summary_fbccco">
    <div class="summary_greeting_font_top_popup" id="summary_welcome_text">${welcome_text}
    </div>
    <div class="summary_greeting_font_name_popup">
        ${user_name}
    </div></div>
    `;
    document.body.appendChild(popup);
    setTimeout(function () {
        popup.style.display = "none";
        popup.remove();
    }, 2000);
}

function loadSummaryTask() {
    let to_do = loadSummaryCategory('task_board', 'to_do');
    let in_progress = loadSummaryCategory('task_board', 'in_progress');
    let await_feedback = loadSummaryCategory('task_board', 'await_feedback');
    let done = loadSummaryCategory('task_board', 'done');
    let summary_all = to_do + in_progress + await_feedback + done;
    let urgent_all = loadSummaryCategory('priority', 'Urgent');
    createAllTaskCounter(to_do, in_progress, await_feedback, done, summary_all, urgent_all);
}

function loadSummaryCategory(category, task) {
    let task_counter = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element[category] == task)
            task_counter = task_counter + 1;
    }
    return task_counter;
}

function createAllTaskCounter(to_do, in_progress, await_feedback, done, summary_all, urgent_all) {
    document.getElementById('summary-to-do').innerHTML = to_do;
    document.getElementById('summary-in-progess').innerHTML = in_progress;
    document.getElementById('summary-await-feedback').innerHTML = await_feedback;
    document.getElementById('summary-done').innerHTML = done;
    document.getElementById('summary-all-tasks').innerHTML = summary_all;
    document.getElementById('summary-urgent').innerHTML = urgent_all;
}

function clacDateUrgent() {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.priority == 'Urgent')
            date_time.push(Number(element.date.replaceAll("-", "")));
    }
    date_time.sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    if (date_time) {
        formatDateUrgent(date_time[0]);
    } else {
        formatDateUrgent(0);
    }
}

function formatDateUrgent(date) {
    if (date != 0) {
        let date_string = date.toString();
        let year = date_string.substr(0, 4);
        let mounth = date_string.substr(4, 2);
        let day = date_string.substr(6, 2);
        document.getElementById('urgent-date').innerHTML = setMonth(mounth) + ' ' + day + ', ' + year;
    } else {
        document.getElementById('urgent-date').innerHTML = '-';
    }
}


function setMonth(month) {
    if (month == 1) { return 'January' }
    if (month == 2) { return 'February' }
    if (month == 3) { return 'March' }
    if (month == 4) { return 'April' }
    if (month == 5) { return 'May' }
    if (month == 6) { return 'June' }
    if (month == 7) { return 'July' }
    if (month == 8) { return 'August' }
    if (month == 9) { return 'September' }
    if (month == 10) { return 'October' }
    if (month == 11) { return 'November' }
    if (month == 12) { return 'December' }
}


function summaryIconChangeHover(icon) {
    if (icon == 'pen_icon') {
        document.getElementById('summary_edit_icon').src = './img/pen_icon_withe.svg';
    }
    if (icon == 'check_icon') {
        document.getElementById('summary_check_icon').src = './img/check_icon_withe.svg';
    }
}

function summaryIconChangeOut(icon) {
    if (icon == 'pen_icon') {
        document.getElementById('summary_edit_icon').src = './img/pen_icon.svg';
    }
    if (icon == 'check_icon') {
        document.getElementById('summary_check_icon').src = './img/check_icon.svg';
    }
}