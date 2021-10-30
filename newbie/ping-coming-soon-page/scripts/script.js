const form = document.querySelector('.subscription-form');
const emailInput = document.querySelector('.input');
const errorContainer = document.querySelector('.error-container');

const emailRegex =
	/^[a-zA-Z0-9\.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const setValidationErrors = function (emailErrorMessage) {
	errorContainer.textContent = emailErrorMessage;
	errorContainer.classList.remove('hidden');

	emailInput.classList.add('input--error');
	emailInput.setAttribute('aria-invalid', true);
	emailInput.setAttribute('aria-describedBy', errorContainer.id);
};

const validateEmail = function () {
	const email = emailInput.value;

	if (!email) {
		setValidationErrors(
			'Whoops! It looks like you forgot to add your email'
		);
		return false;
	}

	if (!emailRegex.test(email)) {
		setValidationErrors('Please provide a valid email address');
		return false;
	}

	return true;
};

const handleSubmit = function (e) {
	if (!validateEmail()) e.preventDefault();
};

form.addEventListener('submit', handleSubmit);
form.noValidate = true;
