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

export default slider;
