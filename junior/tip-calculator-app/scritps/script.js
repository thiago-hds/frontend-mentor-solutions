const billInput = document.querySelector('#bill');
const tipsContainer = document.querySelector('.tips-container');
const tipsButtons = tipsContainer.querySelectorAll('.button');
const tipInput = document.querySelector('#tip');
const numberOfPeopleInput = document.querySelector('#number-of-people');
const tipAmountEl = document.querySelector('#tip-amount');
const totalEl = document.querySelector('#total');
const resetBtn = document.querySelector('#reset');

const allInputs = [billInput, tipInput, numberOfPeopleInput];

const state = {
	bill: 0,
	tip: 5,
	numberOfPeople: 1,
	tipAmountPerPerson: 0,
	totalPerPerson: 0,
};

const bounds = {
	bill: {
		min: 0,
		max: 10000000,
	},
	tip: {
		min: 0,
		max: 200,
	},
	numberOfPeople: {
		min: 1,
		max: 100,
	},
};

function handleStateChange(e) {
	const targetElement = e.target;
	const targetIsTipButton = targetElement.classList.contains('button--tip');
	const targetIsTipInput = targetElement.id === 'tip';

	if (targetIsTipButton) {
		updateSelectedTipButtonUI(targetElement);
		tipInput.value = '';
		validateInput(tipInput);
	}
	if (targetIsTipInput) updateSelectedTipButtonUI(null);

	const isValid = validateAllInputs();
	if (!isValid) {
		state.tipAmountPerPerson = 0;
		state.totalPerPerson = 0;
	} else {
		updateState();
	}
	updateResultsUI();
}

function getActiveTipButton() {
	return tipsContainer.querySelector('.button--active');
}

function updateState() {
	state.bill = parseFloat(billInput.value);
	state.numberOfPeople = parseInt(numberOfPeopleInput.value);

	const selectedTipButton = getActiveTipButton();
	state.tip = selectedTipButton
		? parseInt(selectedTipButton.dataset.tip)
		: parseInt(tipInput.value);

	const { tipAmountPerPerson, totalPerPerson } = calculateResults();
	state.tipAmountPerPerson = tipAmountPerPerson;
	state.totalPerPerson = totalPerPerson;
}

function reset() {
	billInput.value = tipInput.value = '';
	numberOfPeopleInput.value = 1;

	state.bill = 0;
	state.tip = 5;
	state.numberOfPeople = 1;

	updateSelectedTipButtonUI(
		tipsContainer.querySelector('.button[data-tip="5"]')
	);
	updateResultsUI(0, 0);
}

function updateSelectedTipButtonUI(selectedBtn = null) {
	const previousSelectedButton = getActiveTipButton();
	previousSelectedButton?.classList.remove('button--active');
	selectedBtn?.classList.add('button--active');
}

function validateAllInputs() {
	return allInputs
		.map(input => validateInput(input))
		.reduce((result, inputValidation) => result && inputValidation, true);
}

function resetAllInputsErrors() {
	numberOfPeopleInput.forEach(input => setInputErrorMessage(input, null));
}

function validateInput(input) {
	const errorMessage = getValidationError(input.name, parseInt(input.value));
	setInputErrorMessage(input, errorMessage);
	return errorMessage ? false : true;
}

function setInputErrorMessage(input, errorMessage = null) {
	const errorElement = input.parentElement.querySelector('.input-error');
	if (errorMessage) {
		input.classList.add('input--invalid');
		if (errorElement) {
			errorElement.textContent = errorMessage;
			errorElement.classList.remove('hidden');
		}
		return;
	}

	input.classList.remove('input--invalid');
	if (errorElement) {
		errorElement.classList.add('hidden');
		errorElement.textContent = '';
	}
}

function getValidationError(inputName, inputValue) {
	if (inputName === 'tip' && getActiveTipButton()) return null;

	if (isNaN(inputValue)) return 'Invalid value';

	if (inputValue > bounds[inputName].max)
		return `Can't be greater than ${bounds[inputName].max}`;

	if (inputValue < bounds[inputName].min)
		return `Can't be lower than ${bounds[inputName].min}`;

	return null;
}

function calculateResults() {
	const tipAmount = (state.tip / 100) * state.bill;
	const tipAmountPerPerson = tipAmount / state.numberOfPeople;
	const totalPerPerson = (state.bill + tipAmount) / state.numberOfPeople;

	return { tipAmountPerPerson, totalPerPerson };
}

function updateResultsUI() {
	tipAmountEl.textContent = `$${state.tipAmountPerPerson.toFixed(2)}`;
	totalEl.textContent = `$${state.totalPerPerson.toFixed(2)}`;
}

tipsButtons.forEach(btn => btn.addEventListener('click', handleStateChange));
allInputs.forEach(input => input.addEventListener('input', handleStateChange));
resetBtn.addEventListener('click', reset);
window.addEventListener('load', reset);
