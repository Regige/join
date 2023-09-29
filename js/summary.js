

function initSummery(){
    GreetingAfterTime();


}

function GreetingAfterTime() {
    const jetzt = new Date();
    const stunde = jetzt.getHours();
  
    let welcome_text;
  
    if (stunde >= 5 && stunde < 12) {
        welcome_text = "Good morning,";
    } else if (stunde >= 12 && stunde < 18) {
        welcome_text = "Good day,";
    } else {
        welcome_text = "Good evening,";
    }
  document.getElementById('summery_welcome_text').innerHTML = welcome_text;
  }