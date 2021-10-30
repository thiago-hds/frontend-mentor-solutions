const form = document.querySelector('.subscription-form');
const emailInput = document.querySelector('.input');
const errorContainer = document.querySelector('.error-container');

const emailRegex =
	/^[a-zA-Z0-9\.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const setValidationErrors = function () {
	errorContainer.textContent = 'Please provide a valid email address';
	errorContainer.classList.remove('hidden');

	emailInput.classList.add('input--error');
	emailInput.setAttribute('aria-invalid', true);
	emailInput.setAttribute('aria-describedBy', errorContainer.id);
};

const handleSubmit = function (e) {
	const email = emailInput.value;
	if (!emailRegex.test(email)) {
		e.preventDefault();
		setValidationErrors();
		return;
	}
};

form.addEventListener('submit', handleSubmit);
form.noValidate = true;
