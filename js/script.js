window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let hours = Math.floor((timeRemaining / 60 / 60) % 24);
      return { timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = ('0' + timer.hours).slice(-2);
      timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
      timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

      if (timer.timeRemaining > 0) {
        // setTimeout(updateClock, 1000);
        let idInterval = setInterval(updateClock, 1000);
        if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
          clearInterval(idInterval);
          countTimer('20 February 2020');
        }
      }
    }
    updateClock();
  }
  countTimer('19 February 2020');
})