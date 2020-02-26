class Validator {
  constructor({ selector, pattern, method }) {
    this.selector = selector;
    this.pattern = pattern;
    this.method = method;

  }

  init() {
    this.applyStyle();
    console.log(this.selector);
  }

  showError() {
    elem.classList.remove('success');
    elem.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка ввода'
    errorDiv.classList.add('validator-error')
    elem.insertAdjacentElement('afterand', errorDiv);

  }

  showSuccess() {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSubling.classList.contains('validator-error')) {
      elem.nextElementSubling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green
      }
      input.error {
        border: 2px solid red
      }
      validator-error {
        font-size: 14px;
        color: red
      }
    `;
  }
};
