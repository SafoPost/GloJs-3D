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

export default validInput;