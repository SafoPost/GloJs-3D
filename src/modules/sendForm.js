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

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Status network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch(() => {
        statusMessage.textContent = errorMessage;
        // console.error(error);
      })
      .finally(() => {
        // clear inputs
        let formInput = document.querySelectorAll('input');
        for (let i = 0; i < formInput.length; i++) {
          let input = formInput[i];
          if (form.contains(input)) {
            input.value = '';
          }
        };
      });
  });

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
  };

};

export default sendForm;