const ourTeam = () => {
  const commandPhoto = document.querySelectorAll('.command__photo');
  const command = document.getElementById('command');

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

export default ourTeam;
