'use strict';
//tip percentage
const peopleError = document.querySelector('.people-error');
const billError = document.querySelector('.bill-error');
let tipPercentage = 1.5;

const totalAmountValue = document.querySelector('.total-amount-value');
const tipAmountValue = document.querySelector('.tip-amount-value');

//initialize tip button menu
const tipBtns = document.querySelectorAll('.btn');
tipBtns.forEach((btn) => btn.addEventListener('click', calculateTipAndTotal));

// returns the current value in the bill input field
const billAmount = document.getElementById('bill-amount');
billAmount.addEventListener('input', () => {
	return billAmount.value;
});

// returns the current value in the people field
const peopleAmount = document.getElementById('people-amount');
peopleAmount.addEventListener('input', () => {
	return peopleAmount.value;
});

// remove error state on number of people input when clicked on
peopleAmount.addEventListener('keyup', () => {
	peopleError.style.display = 'none';
	peopleAmount.classList.remove('error-border');
});

// remove error state on bill input when clicked on
billAmount.addEventListener('keyup', () => {
	billError.style.display = 'none';
	billAmount.classList.remove('error-border');
});

function getTipPercentage(event) {
	tipBtns.forEach((btn) => btn.classList.remove('active'));
	event.target.classList.add('active');

	tipPercentage = event.target.innerText;
	const formattedTipPercentage = tipPercentage.replace(/[^\w\s]/gi, '') * 0.01;
	return formattedTipPercentage;
}

function calculateTipAndTotal() {
	if (!billAmount.value || +billAmount.value === 0) {
		billError.style.display = 'block';
		billAmount.classList.add('error-border');
	}
	if (!peopleAmount.value || +peopleAmount.value === 0) {
		peopleError.style.display = 'block';
		peopleAmount.classList.add('error-border');
	} else {
		const tip =
			(billAmount.value * getTipPercentage(event)) / peopleAmount.value;
		const formattedTip = tip.toFixed(2);
		const total = billAmount.value / peopleAmount.value + tip;
		const formattedTotal = total.toFixed(2);

		tipAmountValue.innerHTML = formattedTip;
		totalAmountValue.innerHTML = formattedTotal;
	}
}
