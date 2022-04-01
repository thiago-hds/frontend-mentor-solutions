import model from './model.js';
import view from './view.js';

const validationRules = {
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

function onFieldUpdated(fieldName, fieldValue) {
	const isBillField = fieldName === 'bill';
	const value = isBillField ? parseFloat(fieldValue) : parseInt(fieldValue);

	const error = validateField(fieldName, value);
	if (error) {
		view.setFieldError(fieldName, error);
		return;
	}
	view.setFieldError(fieldName, null);
	model[fieldName] = value;
	updateResults();
}

function updateResults() {
	const { tipAmountPerPerson, totalPerPerson } = calculateResults();
	view.updateResults(tipAmountPerPerson, totalPerPerson);
}

function calculateResults() {
	const tipAmount = (model.tip / 100) * model.bill;
	const tipAmountPerPerson = tipAmount / model.numberOfPeople;
	const totalPerPerson = (model.bill + tipAmount) / model.numberOfPeople;

	model.tipAmountPerPerson = tipAmountPerPerson;
	model.totalPerPerson = totalPerPerson;

	return { tipAmountPerPerson, totalPerPerson };
}

function onReset() {
	model.reset();
	view.reset();
}

function validateField(name, value) {
	if (isNaN(value)) return 'Invalid value';

	if (value > validationRules[name].max)
		return `Can't be greater than ${validationRules[name].max}`;

	if (value < validationRules[name].min)
		return `Can't be lower than ${validationRules[name].min}`;

	return null;
}

view.addFieldChangedHandler(onFieldUpdated);
view.addResetHandler(onReset);
