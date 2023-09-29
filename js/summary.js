
window.addEventListener('resize', executeOnScreenWidthChange);  // Monitoring the screen width
let screenWidthThreshold = 900;                                 // Screen resolution when the popup appears
let lastScreenWidth = window.innerWidth;                        // Query the screen width at the start of the page
let welcome_text;                                               // Set the welcome text variable
let user_name = 'TT';                                           //Sets the username

function initsummary() {
    GreetingAfterTime();
    OneStartexecuteOnScreenWidthChange();

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
    }else{
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
        console.log('Transition from less than to greater than or equal to ' + screenWidthThreshold + ' pixels');
        document.getElementById('summary_gretting').classList.remove('summary_dn');
    } else if (lastScreenWidth >= screenWidthThreshold && currentScreenWidth < screenWidthThreshold) {
        console.log('Transition from greater than or equal to ' + screenWidthThreshold + ' pixels to less than ' + screenWidthThreshold + ' pixels');
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