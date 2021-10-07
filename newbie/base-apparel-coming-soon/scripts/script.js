const form = document.querySelector('#form');
const emailInput = document.querySelector('#email');
const emailErrorSpan = document.querySelector('.email__error');

const invalidEmailMessage = 'Please provide a valid email';
let triedToSubmit = false;

const hideEmailError = function () {
	emailErrorSpan.textContent = '';
	emailErrorSpan.classList.add('hidden');
	emailInput.classList.remove('input--error');
};

const showEmailError = function () {
	emailErrorSpan.textContent = invalidEmailMessage;
	emailErrorSpan.classList.remove('hidden');
	emailInput.classList.add('input--error');
};

const validateEmail = function () {
	if (emailInput.validity.valid) {
		hideEmailError();
		return true;
	}
	
	showEmailError();
	return false;
};

form.addEventListener('submit', function (e) {
	if (validateEmail()) return;
	e.preventDefault();

	if (triedToSubmit) return;
	triedToSubmit = true;
	emailInput.addEventListener('input', validateEmail);
});

form.setAttribute('novalidate', true);
