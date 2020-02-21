window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // timer -------------------------------------
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

      if (timer.timeRemaining > 0) {
        if (timer.hours > 24) {
          timerHours.textContent = timer.days + ' д. ' + ('0' + timer.hours2).slice(-2);
        } else {
          timerHours.textContent = ('0' + timer.hours).slice(-2);
        }
        timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
        timerSeconds.textContent = ('0' + timer.seconds).slice(-2);
      } else {
        clearInterval(idInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    let idInterval = setInterval(updateClock, 1000);
  };
  countTimer('25 February 2020');

  // menu --------------------------------------
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    menu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  // popup -------------------------------------
  const togglePopup = () => {
    // Фон модального окна
    const popup = document.querySelector('.popup');
    // Кнопка вызова модального окна
    const popupBtn = document.querySelectorAll('.popup-btn');
    // Модальное окно
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
            popupContent.style.top = count * 2 + '%';
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

    // Анимация закрытия модального окна
    const popupOut = () => {
      outInteval = requestAnimationFrame(popupOut);
      count--;
      if (count > -50) {
        popupContent.style.top = count * 2 + '%';
      } else {
        cancelAnimationFrame(outInteval);
        popup.style.display = 'none';
      };
    };

    // Закрытие модального окна
    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        if (window.matchMedia('(max-width: 768px)').matches) {
          popup.style.display = 'none';
          popupContent.style.top = '-50%';
        } else {
          outInteval = requestAnimationFrame(popupOut);
        }
      }
      target = target.closest('.popup-content')
      if (!target) {
        if (window.matchMedia('(max-width: 768px)').matches) {
          popup.style.display = 'none';
          popupContent.style.top = '-50%';
        } else {
          outInteval = requestAnimationFrame(popupOut);
        }
      }
    })

  };
  togglePopup();

  // tabs --------------------------------------
  const tabs = () => {
    // Родитель
    const serviceHeader = document.querySelector('.service-header');
    // Сам таб
    const tab = document.querySelectorAll('.service-header-tab');
    // Контент таба
    const serviceTab = document.querySelectorAll('.service-tab');

    const toggleServiceTab = (index) => {
      for (let i = 0; i < serviceTab.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          serviceTab[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          serviceTab[i].classList.add('d-none');
        }
      }
    }
    serviceHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleServiceTab(i);
          }
        });
      };
    })
  };
  tabs();


});