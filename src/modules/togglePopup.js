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

export default togglePopup;
