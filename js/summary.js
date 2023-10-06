
let summary_all = 0;
let summary_task = [];
let summary_urgent = 0;
let summary_urgent_date = "";


window.addEventListener('resize', executeOnScreenWidthChange);  // Monitoring the screen width
let screenWidthThreshold = 950;                                 // Screen resolution when the popup appears
let lastScreenWidth = window.innerWidth;                        // Query the screen width at the start of the page
let welcome_text;                                               // Set the welcome text variable
let user_name = 'TT';                                           // Sets the username

async function initsummary() {
    list = await JSON.parse(await getItem(user + '-list'));
    GreetingAfterTime();
    OneStartexecuteOnScreenWidthChange();
    loadSummaryTask();
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
        showPopup();
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
        showPopup();
        document.getElementById('summary_gretting').classList.add('summary_dn');
    }
    lastScreenWidth = currentScreenWidth;
}

/**
 * This function creates a popup with the respective logged in user.
 * 
 */

function showPopup() {
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
    }, 4000);
}

function loadSummaryTask() {
    let to_do = loadSummaryCategory('to_do');
    let in_progress = loadSummaryCategory('in_progress');
    let await_feedback = loadSummaryCategory('await_feedback');
    let done = loadSummaryCategory('done');
    let summary_all = to_do + in_progress + await_feedback + done;
    createAllTaskCounter(to_do, in_progress, await_feedback, done, summary_all);
}

function loadSummaryCategory(task) {
    let task_counter = 0;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.task_board == task)
            task_counter = task_counter + 1;
    }

    return task_counter;
}

function createAllTaskCounter(to_do, in_progress, await_feedback, done, summary_all) {
    document.getElementById('summary-to-do').innerHTML = to_do;
    document.getElementById('summary-in-progess').innerHTML = in_progress;
    document.getElementById('summary-await-feedback').innerHTML = await_feedback;
    document.getElementById('summary-done').innerHTML = done;
    document.getElementById('summary-all-tasks').innerHTML = summary_all;
}

