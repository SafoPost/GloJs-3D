const validInput = () => {
  document.body.addEventListener('input', (event) => {
    const patternPhone = /^\+?[0-9]*$/;
    const patternText = /^[А-Яа-яЁё ]*$/;
    if (event.target.type === 'tel') {
      if (!patternPhone.test(event.target.value)) {
        event.target.value = '';
      }
    }
    if (event.target.type === 'text' || event.target.placeholder === 'Ваше сообщение') {
      if (!patternText.test(event.target.value)) {
        event.target.value = '';
      }
    }
  });
};

export default validInput;