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

const setInputErrors = function (input, errorContainer) {
	errorContainer.textContent = getErrorMessage(input);
	errorContainer.classList.remove('hidden');

	input.classList.add('input--invalid');
	input.classList.remove('input--valid');
	input.setAttribute('aria-invalid', 'true');
	input.setAttribute('aria-describedby', errorContainer.id);
};

const removeInputErrors = function (input, errorContainer) {
	errorContainer.textContent = '';
	errorContainer.classList.add('hidden');

	input.classList.remove('input--invalid');
	input.classList.add('input--valid');
	input.removeAttribute('aria-invalid');
	input.removeAttribute('aria-describedby');
};

const validateInput = function (input) {
	const errorContainer = input.parentElement.querySelector('.error');

	if (!input.validity.valid) {
		setInputErrors(input, errorContainer);
		return false;
	}
	removeInputErrors(input, errorContainer);
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
