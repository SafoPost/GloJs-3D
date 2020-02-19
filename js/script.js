window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');
    let timerDays;

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let hours = Math.floor((timeRemaining / 60 / 60));
      let hours2 = Math.floor((timeRemaining / 60 / 60) % 24);
      let days = Math.floor((timeRemaining / 60 / 60 / 24));

      return { timeRemaining, hours, hours2, minutes, seconds, days };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      if (timer.hours > 24) {
        timerHours.textContent = timer.days + ' д. ' + ('0' + timer.hours2).slice(-2);
      } else {
        timerHours.textContent = ('0' + timer.hours).slice(-2);
      }
      timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
      timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

      let idInterval;
      if (timer.timeRemaining > 0) {
        // setTimeout(updateClock, 1000);
        idInterval = setInterval(updateClock, 1000);

      } else {
        clearInterval(idInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    updateClock();
  }
  countTimer('25 February 2020');
})