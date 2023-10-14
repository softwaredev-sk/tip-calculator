'use strict';

const btnReset = document.getElementById('reset'); //button for reset values and error state
const billAmount = document.querySelector('.input-bill'); //Bill input field
const customTipAmount = document.querySelector('.custom-tip'); //custom tip input field
const splitCount = document.querySelector('.input-split-count'); //number of people input
const totalPerPerson = document.querySelector('.total-per-person'); //total bill per person after tip amount
const totalTipPerPerson = document.querySelector('.tip-per-person'); //total tip per person
const error0 = document.querySelector('.error-0'); //to handle error state of 0 in bill
const error1 = document.querySelector('.error-1'); //to handle error state of 0 in numer of people

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
  bill = billAmount.value;
  if (bill <= 0) {
    error0.classList.remove('hidden');
    billAmount.value = '';
    billAmount.classList.add('error-outline');
    resetOutput();
    s;
  } else {
    enableReset();
    error0.classList.add('hidden');
    billAmount.classList.remove('error-outline');
    calcTip(tipValue, bill, people);
  }
});

splitCount.addEventListener('input', () => {
  people = splitCount.value;
  if (people <= 0) {
    error1.classList.remove('hidden');
    splitCount.value = '';
    splitCount.classList.add('error-outline');
    resetOutput();
  } else {
    enableReset();
    error1.classList.add('hidden');
    splitCount.classList.remove('error-outline');
    calcTip(tipValue, bill, people);
  }
});

const resetOutput = function () {
  totalTipPerPerson.innerText = '$0.00';
  totalPerPerson.innerText = '$0.00';
};

const reset = function () {
  billAmount.value = '';
  splitCount.value = '';
  totalTipPerPerson.innerText = '$0.00';
  totalPerPerson.innerText = '$0.00';
  customTipAmount.value = '';
  btnReset.setAttribute('disabled', true);
  error0.classList.add('hidden');
  billAmount.classList.remove('error-outline');
  error1.classList.add('hidden');
  splitCount.classList.remove('error-outline');
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
