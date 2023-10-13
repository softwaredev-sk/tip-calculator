'use strict';

const btnReset = document.getElementById('reset');
const billAmount = document.querySelector('.input-bill');
const customTipAmount = document.querySelector('.custom-tip');
const splitCount = document.querySelector('.input-split-count');
const totalPerPerson = document.querySelector('.total-per-person');
const totalTipPerPerson = document.querySelector('.tip-per-person');

const tip = document.querySelectorAll('.select-tip');

let bill = 0;
let people = 0;
let tipValue = 15;
let active;

// customTipAmount.addEventListener('change', () => {
//   customTipAmount.innerText;
// });

const calcTip = function (tip, billAmount, splitCount) {
  const totalTip = billAmount * (tip / 100);
  let bill = (Number(totalTip) + Number(billAmount)) / splitCount;
  let tipSplit = totalTip / splitCount;

  bill = bill === Infinity || splitCount === 0 ? 0 : bill;
  tipSplit = tipSplit === Infinity || splitCount === 0 ? 0 : tipSplit;
  totalPerPerson.innerText = `$${((bill * 100) / 100).toFixed(2)}`;
  totalTipPerPerson.innerText = `$${((tipSplit * 100) / 100).toFixed(2)}`;

  //   console.log(totalTip, bill, tipSplit);
};

const enableReset = function () {
  btnReset.removeAttribute('disabled');
};

billAmount.addEventListener('input', () => {
  enableReset();
  bill = billAmount.value;
  calcTip(tipValue, bill, people);
});

splitCount.addEventListener('input', () => {
  enableReset();
  people = splitCount.value;
  calcTip(tipValue, bill, people);
});

const reset = function () {
  billAmount.value = '';
  splitCount.value = '';
  totalTipPerPerson.innerText = '$0.00';
  totalPerPerson.innerText = '$0.00';
  customTipAmount.value = '';
  btnReset.setAttribute('disabled', true);
  checkActive();
  tip[2].classList.add('active');
  bill = 0;
  people = 0;
  tipValue = 15;
};

const checkActive = function () {
  tip.forEach((x) => x.classList.remove('active'));
};

tip.forEach((x) => {
  if (!x.classList.contains('custom-tip')) {
    x.addEventListener('click', () => {
      checkActive();
      x.classList.toggle('active');
      active = document.querySelector('.active');
      tipValue = parseInt(active.innerText);
      calcTip(tipValue, bill, people);
    });
  } else {
    x.addEventListener('input', () => {
      checkActive();
      x.classList.toggle('active');
      active = document.querySelector('.active');
      tipValue = Number(active.value);
      calcTip(tipValue, bill, people);
    });
  }
});

btnReset.addEventListener('click', reset);

reset();
