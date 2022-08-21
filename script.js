'use strict';
let customTipPercentage;
//error class states
const peopleError = document.querySelector('.people-error');
const billError = document.querySelector('.bill-error');

//tip and total values
const totalAmountValue = document.querySelector('.total-amount-value');
const tipAmountValue = document.querySelector('.tip-amount-value');

//initialize tip button menu
const tipBtns = document.querySelectorAll('.btn');
tipBtns.forEach((btn) => btn.addEventListener('click', calculateTipAndTotal));

//calculate the custom tip when entered into the custom input field
const custom = document.getElementById('custom');
custom.addEventListener('input', getCustomTipPercentage);
custom.addEventListener('input', calculateCustomTipAndTotal);

// returns the current value in the bill input field
const billAmount = document.getElementById('bill-amount')
billAmount.addEventListener('input', () => {
	return billAmount.value;
});

// returns the current value in the people field
const peopleAmount = document.getElementById('people-amount');
peopleAmount.addEventListener('input', () => {
	return peopleAmount.value;
});

// remove error state on number of people input when typing
peopleAmount.addEventListener('keyup', () => {
	peopleError.style.display = 'none';
	peopleAmount.classList.remove('error-border');
});
//reset form state when updating/changing the people amount
peopleAmount.addEventListener('input', resetForm);

// remove error state on bill input when clicked on
billAmount.addEventListener('keyup', () => {
	billError.style.display = 'none';
	billAmount.classList.remove('error-border');
});
// reset form state when updating/changing bill amount
billAmount.addEventListener('input', resetForm);

//reset values when clicking reset button
const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
	tipAmountValue.innerHTML = '$0.00';
	totalAmountValue.innerHTML = '$0.00';
	peopleAmount.value = '';
	billAmount.value = '';
	custom.value = '';
	tipBtns.forEach((btn) => btn.classList.remove('active'));
});

function resetForm() {
	tipAmountValue.innerHTML = '$0.00';
	totalAmountValue.innerHTML = '$0.00';
	custom.value = '';
	tipBtns.forEach((btn) => btn.classList.remove('active'));
}

function getTipPercentage(event) {
	tipBtns.forEach((btn) => btn.classList.remove('active'));
	event.target.classList.add('active');


	let tipPercentage = event.target.innerText;
	const formattedTipPercentage = tipPercentage.replace(/[^\w\s]/gi, '') * 0.01;
	return formattedTipPercentage;
}

function getCustomTipPercentage(event) {
  tipBtns.forEach((btn) => btn.classList.remove('active'));
  customTipPercentage = event.target.value;

  
	const formattedCustomTipPercentage =
		customTipPercentage.replace(/[^\w\s]/gi, '') * 0.01;
	return formattedCustomTipPercentage;
}

function calculateTipAndTotal() {
	custom.value = '';
	if (!billAmount.value || +billAmount.value === 0) {
		billError.style.display = 'block';
		billAmount.classList.add('error-border');
	}
	if (!peopleAmount.value || +peopleAmount.value === 0) {
		peopleError.style.display = 'block';
		peopleAmount.classList.add('error-border');
	} else {
		//calculate tip
		const tip =
			(billAmount.value * getTipPercentage(event)) / peopleAmount.value;
		const formattedTip = tip.toFixed(2);
		const total = billAmount.value / peopleAmount.value + tip;
		const formattedTotal = total.toFixed(2);
		//display tip
		tipAmountValue.innerHTML = formattedTip;
		totalAmountValue.innerHTML = formattedTotal;
	}
}

function calculateCustomTipAndTotal() {
	if (+!billAmount.value || +!peopleAmount.value) {
		// error shown on bill and number of people
		return;
	}
	//calculate custom tip and total
	if (!+customTipPercentage || +customTipPercentage === 0) {
		custom.classList.add('error-border');
		tipAmountValue.innerHTML = '$0.00';
		totalAmountValue.innerHTML = '$0.00';
		console.log('custom amount cannot be empty or 0');
	} else {
		const customTip =
			(billAmount.value * getCustomTipPercentage(event)) / peopleAmount.value;
		const formattedCustomTip = customTip.toFixed(2);
		const customTotal = billAmount.value / peopleAmount.value + customTip;
		const formattedCustomTotal = customTotal.toFixed(2);

		//display custom tip
		tipAmountValue.innerHTML = formattedCustomTip;
		totalAmountValue.innerHTML = formattedCustomTotal;
	}
}
