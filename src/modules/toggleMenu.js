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

export default toggleMenu;
