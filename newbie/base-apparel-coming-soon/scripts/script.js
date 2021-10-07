const form = document.querySelector('#form');
const emailInput = document.querySelector('#email');
const emailErrorSpan = document.querySelector('.email__error');

const invalidEmailMessage = 'Please provide a valid email';

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

emailInput.addEventListener('input', function () {
	if (emailInput.validity.valid) {
		hideEmailError();
	} else {
		showEmailError();
	}
});

form.addEventListener('submit', function (e) {
	if (!emailInput.validity.valid) {
		showEmailError();
		e.preventDefault();
	}
});

form.setAttribute('novalidate', true);
