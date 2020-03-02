window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // timer ------------------------------------------
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
  countTimer('29 February 2020');

  // menu -------------------------------------------
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (target.tagName === 'A' || !target.closest('menu')) {
        menu.classList.remove('active-menu');
      }
    });
  };
  toggleMenu();

  // popup ------------------------------------------
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

        const statusMessage = document.querySelector('.thanks')
        if (statusMessage) {
          statusMessage.remove();
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
    });

  };
  togglePopup();

  // tabs -------------------------------------------
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

  // Slider -----------------------------------------
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    // const btn = document.querySelectorAll('.portfolio-btn');
    const dots = document.querySelector('.portfolio-dots');
    const slider = document.querySelector('.portfolio-content');


    let currentSlide = 0;
    let interval;

    // Добавляем точки по количеству слайдов
    let dot;
    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        slide[i];
        dot = document.createElement('li');
        dot.classList.add('dot');
        dots.appendChild(dot);
        if (slide[i].classList.contains('portfolio-item-active')) {
          dot.classList.add('dot-active');
        };
      };
      dot = document.querySelectorAll('.dot');
    };
    addDots();

    // Следующий слайд
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    // Предыдущий слайд
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    // Авто-слайдер
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    };

    // Запускаем авто-слайдер
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    // Останавливаем авто-слайдер
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        })
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    // Наведение на стрелки/точки
    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(3000);

  };
  slider();

  // Our team ---------------------------------------
  const ourTeam = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    const command = document.getElementById('command');
    console.log(commandPhoto);

    command.addEventListener('mouseover', (event) => {
      let imageA = event.target.src;
      let imageB = event.target.dataset.img;
      event.target.src = imageB;
      command.addEventListener('mouseout', (event) => {
        event.target.src = imageA;
        event.target.dataset.img = imageB;
      });
    });

  };
  ourTeam();

  // Calc -------------------------------------------
  const getCalc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = +calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      } else if (calcCount.value === 0) {
        countValue = 0;
      }

      if (calcDay.value === 0) {
        dayValue = 0;
      } else if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = Math.ceil(total);
    };

    calcBlock.addEventListener('input', (event) => {
      if (event.target.closest('INPUT')) {
        event.target.value = event.target.value.replace(/\D/g, '');
      }
    });
    calcBlock.addEventListener('change', (event) => {
      if (event.target.matches('select') || event.target.matches('input')) {
        countSum();
      }
    });

  };
  getCalc(100);


  // send_ajax_form ---------------------------------
  const sendForm = () => {

    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо, мы скоро свяжемся с вами!';

    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('thanks');
    statusMessage.style.cssText = `font-size: 2rem;
      color: white;`;


    document.body.addEventListener('submit', (event) => {
      event.preventDefault();

      let form;
      if (event.target.closest('form')) {
        forms.forEach((elem, index) => {
          if (elem === event.target) {
            form = forms[index];
          }
        });
      }

      form.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form);

      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body, () => {
        statusMessage.textContent = successMessage;
      }, (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

      // clear inputs
      let formInput = document.querySelectorAll('input');

      for (let i = 0; i < formInput.length; i++) {
        let input = formInput[i];
        if (form.contains(input)) {
          input.value = '';
        }
      };
    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {

        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      request.send(JSON.stringify(body));

    };

  };
  sendForm();

  // Validate ---------------------------------
  const validInput = () => {
    document.body.addEventListener('input', (event) => {
      const patternPhone = /^\+?[0-9]*$/;
      if (event.target.type === 'tel') {
        if (!patternPhone.test(event.target.value)) {
          event.target.value = '';
        }
      }
      if (event.target.type === 'text' || event.target.placeholder === 'Ваше сообщение') {
        event.target.value = event.target.value.replace(/[^А-ЯЁ а-яё]/, '');
      }
    });
  };

  validInput();


});