
// study clock 
var displayClock = document.querySelector('#time'); 
var displayBreak = 5; 
var breakCurrentTime = displayBreak * 60; 
var sessionTime = 25; 
var activeCurrentTime = sessionTime * 60; 
var button = document.getElementById("time-change-button");
var stopstart = document.getElementById("stop-start");
var currentTimer; 
var timeCountDownClear; 
var currentCountType = null; 
var timeNow; 
button.addEventListener('click', changeTimer, false);

function changeTimer(e){
  if(e.target !== e.currentTarget){
    let val = e.target.value;
  
    switch (val){

      case "1":
        if (displayBreak > 2){
          displayBreak -= 1
          breakCurrentTime = displayBreak * 60;
          document.querySelector('.break-timer-span').innerHTML = displayBreak;
        } else {
            // minimum break time 2 mins
        }
        break;

      case "2":
        if (displayBreak < 99){
        displayBreak += 1
        breakCurrentTime = displayBreak * 60;
        document.querySelector('.break-timer-span').innerHTML = displayBreak;
        } else {
          // minimum break time 99 minutes.
        }
        break;
     
      case "3":
      if (sessionTime > 2){
        sessionTime -= 1
        activeCurrentTime = sessionTime * 60;
        document.querySelector('.active-timer-span').innerHTML = sessionTime;
        document.querySelector('#time').innerHTML = sessionTime + ":00";
      } else {
        // break time 2 minutes.
      }
      break;

      case "4":
        if (sessionTime < 99){
          sessionTime += 1
          activeCurrentTime = sessionTime * 60;
          document.querySelector('.active-timer-span').innerHTML = sessionTime;
          document.querySelector('#time').innerHTML = sessionTime + ":00";
        } else {
          // minimum break time 2 minutes.
        }
        break;
    }
  }
  e.stopPropagation();
};

stopstart.addEventListener('click', controlTimer, false);

function controlTimer(e) {
  
  console.log(e.target.value + " click target value");
  if (e.target.value == 6) { 
    resetClock();

  } else if (e.target.value == 5){ 
    disableButtons();
    if (currentCountType == null) { 
      changeStartButton();
      currentCountType = true
      timeNow = activeCurrentTime;
      startTimer(timeNow, displayClock);

    } else if (currentCountType) { 
      changeStartButton();
      timeNow = currentTimer;
      startTimer(timeNow, displayClock);

    } else if(!currentCountType) { 
      changeStartButton();
      timeNow = currentTimer;
      startTimer(timeNow, displayClock);

    } else {
      console.log("should not arrive here");
    }
  
  } else if (e.target.value == 7) { 
    document.querySelector(".startbutton").innerHTML = "Start";
    document.querySelector(".startbutton").setAttribute("value", 5);
    document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-success btn-lg");
    pauseTimer();
  }
  e.stopPropagation();
}

  function startTimer(duration, displayClock) {
    let timer = duration, minutes, seconds;
    console.log(duration + " current duration iteration");
    timeCountDownClear = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayClock.textContent = minutes + ":" + seconds;
        currentTimer = timer;

        if (--timer < 0) {
          pauseTimer();
          console.log(currentCountType + " current counter type before 0 time toggle")
          currentCountType = currentCountType == true ? false : true;
          console.log(currentCountType + " current counter type after toggle")
          if  (currentCountType) {
            timeNow = activeCurrentTime;
            document.querySelector('.tt').textContent = "Active";
            startTimer(timeNow, displayClock);
          } else {
            timeNow = breakCurrentTime;
            document.querySelector('.tt').textContent = "Break";
            startTimer(timeNow, displayClock); 
          }
        }
    }, 1000);
  };

function resetClock(){
  pauseTimer();
  displayBreak = 5;
  breakCurrentTime = displayBreak * 60;
  sessionTime = 25;
  activeCurrentTime = sessionTime * 60;
  currentCountType = null;
  currentTimer = activeCurrentTime;
  document.querySelector('.active-timer-span').innerHTML = sessionTime;
  document.querySelector('.break-timer-span').innerHTML = displayBreak;
  document.querySelector(".startbutton").innerHTML = "Start";
  document.querySelector(".startbutton").setAttribute("value", 5, "class");
  document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-success btn-lg");
  document.querySelector('#time').innerHTML = "25:00";
  enableButtons();
  console.log("reset buitton stats" + activeCurrentTime + " activeCurrentTimer" + sessionTime + " sessionTime variable value");
  console.log("reset buitton stats" + currentTimer + " currentTimer" + timeNow + " timeNow");
};

function pauseTimer(){
console.log("clearInt ran");
clearInterval(timeCountDownClear);
};

function disableButtons(){
  document.querySelector(".reduce-break").setAttribute("disabled", "true");
  document.querySelector(".increase-break").setAttribute("disabled", "true");
  document.querySelector(".reduce-session").setAttribute("disabled", "true");
  document.querySelector(".increase-session").setAttribute("disabled", "true");
};

function enableButtons(){
  document.querySelector(".reduce-break").removeAttribute("disabled");
  document.querySelector(".increase-break").removeAttribute("disabled");
  document.querySelector(".reduce-session").removeAttribute("disabled");
  document.querySelector(".increase-session").removeAttribute("disabled");
};

function changeStartButton(){
  document.querySelector(".startbutton").innerHTML = "Pause";
  document.querySelector(".startbutton").setAttribute("value", 7);
  document.querySelector(".startbutton").setAttribute("class", "startbutton btn btn-warning btn-lg");
  console.log(timeNow + " time left on currentCount");
  console.log(currentCountType + " is currentContentType(True for Active, False for Break, Null for firstime start");
};

