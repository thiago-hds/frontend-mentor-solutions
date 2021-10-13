const freeTrialForm = document.querySelector('.free-trial-form');
const inputs = [...freeTrialForm.querySelectorAll('input')];

const getFormattedInputName = function (name) {
	return name
		.split('-')
		.map(str => str[0].toUpperCase() + str.slice(1))
		.join(' ');
};

const getErrorMessage = function (input) {
	const inputName = input.getAttribute('name');
	const inputNameFormatted = getFormattedInputName(inputName);

	if (input.validity.valueMissing) {
		return `${inputNameFormatted} cannot be empty`;
	}
	if (input.validity.tooLong) {
		return `${inputNameFormatted} is too long`;
	}
	if (input.validity.tooShort) {
		return `${inputNameFormatted} should have at least ${input.getAttribute(
			'minlength'
		)} characters`;
	}
	if (inputName === 'email' && input.validity.patternMismatch) {
		return 'Looks like this is not an email';
	}

	return `${inputNameFormatted} is invalid`;
};

const validateInput = function (input) {
	const errorContainer = input.parentElement.querySelector('.error');

	if (!input.validity.valid) {
		errorContainer.textContent = getErrorMessage(input);
		errorContainer.classList.remove('hidden');
		input.classList.add('input--invalid');
		input.classList.remove('input--valid');
		return false;
	}

	errorContainer.textContent = '';
	errorContainer.classList.add('hidden');
	input.classList.remove('input--invalid');
	input.classList.add('input--valid');
	return true;
};

freeTrialForm.addEventListener('input', function (e) {
	const input = e.target.closest('.input');
	if (!input) return;

	validateInput(input);
});

freeTrialForm.addEventListener('submit', function (e) {
	let formInvalid = false;
	for (const input of inputs) {
		if (!validateInput(input)) formInvalid = true;
	}
	if (formInvalid) e.preventDefault();
});

freeTrialForm.noValidate = true;
