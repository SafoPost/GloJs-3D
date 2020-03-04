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

export default tabs;
