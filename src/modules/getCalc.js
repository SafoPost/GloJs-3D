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

export default getCalc;
