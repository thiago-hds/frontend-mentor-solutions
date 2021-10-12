const freeTrialForm = document.querySelector('.free-trial-form');
const inputs = [...freeTrialForm.querySelectorAll('input')];

const getFormattedInputName = function (name) {
	return name
		.split('-')
		.map(str => str[0].toUpperCase() + str.slice(1))
		.join(' ');
};

const getErrorMessage = function (input) {
	const inputName = getFormattedInputName(input.getAttribute('name'));

	if (input.validity.valueMissing) return `${inputName} cannot be empty`;
	if (input.validity.tooLong) return `${inputName} is too long`;
	if (inputName === 'Password' && input.validity.tooShort)
		return `${inputName} should have at least 6 characters`;
	if (inputName === 'Email' && input.validity.patternMismatch)
		return 'Looks like this is not an email';

	return `${inputName} is invalid`;
};

const validateInput = function (input) {
	const errorEl = input.parentElement.querySelector('.error');

	if (!input.validity.valid) {
		errorEl.textContent = getErrorMessage(input);
		errorEl.classList.remove('hidden');
		input.classList.add('input--invalid');
		return false;
	}

	errorEl.textContent = '';
	errorEl.classList.add('hidden');
	input.classList.remove('input--invalid');
	return true;
};

freeTrialForm.addEventListener('submit', function (e) {
	let formInvalid = false;
	for (const input of inputs) {
		if (!validateInput(input)) formInvalid = true;
	}
	if (formInvalid) e.preventDefault();
});

freeTrialForm.noValidate = true;
