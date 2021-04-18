import { LightningElement, api} from 'lwc';
$( document ).ready(() => {
    const timeLabel = $("#timer-label");
    const timeLeft = $("#time-left");
    const breakLength = $("#break-length");
    const sessionLength = $("#session-length");
    const beep = $("#beep");
    
    const btnStop = $("#stop");
    const btnStartPause = $("#start_stop");
    const btnReset = $("#reset");
  
    const btnBreakIncrement = $("#break-increment");
    const btnBreakDecrement = $("#break-decrement");
    const btnSessionIncrement = $("#session-increment");
    const btnSessionDecrement = $("#session-decrement");
  
    const SETTING_MODE = {
      INCREMENT: "INCREMENT",
      DECREMENT: "DECREMENT"
    }
  
    const MODE = {
      BREAK:"Break Time",
      SESSION:"Session Time"
    }
  
    let currentMode = MODE.SESSION;
    let countDownInterval = null;
  
    // Break Length Setting
    btnBreakIncrement.click(() => {
      setTimeLength(breakLength, SETTING_MODE.INCREMENT);
    })
  
    btnBreakDecrement.click(() => {
      setTimeLength(breakLength, SETTING_MODE.DECREMENT);
    })
  
    // Session Length Setting
    btnSessionIncrement.click(() => {
      setTimeLength(sessionLength, SETTING_MODE.INCREMENT);
  
      if (isClockRunning()) {
        return;
      }
      setTimer(sessionLength.text(), 0);
    })
  
    btnSessionDecrement.click(() => {
      setTimeLength(sessionLength, SETTING_MODE.DECREMENT);
  
      if (isClockRunning()) {
        return;
      }
      setTimer(sessionLength.text(), 0);
    })
  
    // Button Reset
    btnReset.click(() => {
      if (isClockRunning()) {
        btnStartPause.removeClass("active");
        clearInterval(countDownInterval);
      }
  
      beep.trigger("pause");
      beep.prop("currentTime",0);
  
      currentMode = MODE.SESSION;
      timeLabel.text(MODE.SESSION);
      breakLength.text(5);
      sessionLength.text(25);
      setTimer(25, 0);
    });
  
    // Button Stop
    btnStop.click(() => {
      if (isClockRunning()) {
        btnStartPause.removeClass("active");
        clearInterval(countDownInterval);
      }
  
      beep.trigger("pause");
      beep.prop("currentTime",0);
  
      if (currentMode === MODE.BREAK) {
        setTimer(breakLength.text(), 0);
      } else {
        setTimer(sessionLength.text(), 0);
      }
    });
  
    // Button Start/Pause
    btnStartPause.click(() => {
      if (isClockRunning()) {
        clearInterval(countDownInterval);
        btnStartPause.removeClass("active");
        return;
      } else {
        btnStartPause.addClass("active");
      }
      
      countDownInterval = setInterval(() => {
        const time = timeLeft.text().split(":")
        let min = parseInt(time[0]);
        let sec = parseInt(time[1]);
  
        if (sec === 0) {
          if (min === 0 && currentMode === MODE.BREAK) {
            beep.trigger("play");
            currentMode = MODE.SESSION;
            timeLabel.text(MODE.SESSION);
            setTimer(sessionLength.text(), 0);
            return
          } else if (min === 0 && currentMode === MODE.SESSION) {
            beep.trigger("play");
            currentMode = MODE.BREAK;
            timeLabel.text(MODE.BREAK);
            setTimer(breakLength.text(), 0);
            return
          } else {
            sec = 59;
            min--
          }
        } else {
          sec--;
        }
  
        setTimer(min, sec);
      }, 1000);
    });
  
    const setTimeLength = (element, mode) => {
      const currentValue = parseInt(element.text());
  
      if (isClockRunning()) {
        return;
      }
  
      if (mode === SETTING_MODE.INCREMENT && currentValue < 60) {
        element.text(currentValue + 1);
      } else if (mode === SETTING_MODE.DECREMENT && currentValue > 1) {
        element.text(currentValue - 1);
      }
    }
  
    const isClockRunning = () => {
      return btnStartPause.hasClass("active");
    }
  
    const addLeadingZero = (value) => {
      const newValue = value.toString();
      return newValue.length === 1? `0${newValue}` : newValue; 
    }
  
    const setTimer = (min, sec) => {
      const newMin = addLeadingZero(min);
      const newSec = addLeadingZero(sec);
      timeLeft.text(`${newMin}:${newSec}`);
    }
  
    // Initialize Value 
    setTimer(25, 0);
    breakLength.text('5');
    sessionLength.text('25');
  });
  