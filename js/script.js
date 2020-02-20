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
  };
  countTimer('25 February 2020');

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu')
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu))
  };
  toggleMenu();

  // popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
    const popupContent = document.querySelector('.popup-content');
    let count = 0;
    let centerInteval;
    let outInteval;
    popupContent.style.top = '-50%';

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {

        let popupCenter = () => {
          popup.style.display = 'block';
          centerInteval = requestAnimationFrame(popupCenter);
          count++;
          if (count < 11) {
            popupContent.style.top = count + '%';
          } else {
            cancelAnimationFrame(centerInteval);
          }
        };
        if (window.matchMedia('(max-width: 768px)').matches) {
          popup.style.display = 'block';
          popupContent.style.top = '10%';
        } else {
          centerInteval = requestAnimationFrame(popupCenter);

        }
      });
    });

    popupClose.addEventListener('click', () => {
      // popup.style.display = 'none';
      // popupContent.style.top = '-100%';
      let popupOut = () => {
        outInteval = requestAnimationFrame(popupOut);
        count--;
        if (count > -50) {
          popupContent.style.top = count + '%';
        } else {
          cancelAnimationFrame(outInteval);
          popup.style.display = 'none';
        };
      };
      if (window.matchMedia('(max-width: 768px)').matches) {
        popup.style.display = 'none';
        popupContent.style.top = '-50%';
      } else {
        outInteval = requestAnimationFrame(popupOut);
      }
    });

  };
  togglePopup();
});