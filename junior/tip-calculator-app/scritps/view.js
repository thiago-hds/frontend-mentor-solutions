class View {
	constructor() {
		this._billInput = document.querySelector('#bill');
		this._tipsContainer = document.querySelector('.tips-container');
		this._tipsButtons = this._tipsContainer.querySelectorAll('.button');
		this._tipInput = document.querySelector('#tip');
		this._numberOfPeopleInput = document.querySelector('#number-of-people');
		this._tipAmountEl = document.querySelector('#tip-amount');
		this._totalEl = document.querySelector('#total');
		this._resetBtn = document.querySelector('#reset');
	}

	addFieldChangedHandler(handler) {
		this._tipsButtons.forEach(btn =>
			btn.addEventListener('click', e => {
				this._updateSelectedTipButtonUI(e.target);
				this._tipInput.value = '';
				handler('tip', e.target.dataset.tip);
			})
		);

		const allInputs = [
			this._billInput,
			this._tipInput,
			this._numberOfPeopleInput,
		];

		allInputs.forEach(input =>
			input.addEventListener('input', e => {
				const targetIsTipInput = e.target.id === 'tip';
				if (targetIsTipInput) this._updateSelectedTipButtonUI(null);
				handler(e.target.name, e.target.value);
			})
		);
	}

	addResetHandler(handler) {
		this._resetBtn.addEventListener('click', handler);
		window.addEventListener('load', handler);
	}

	reset() {
		this._billInput.value = '';
		this._tipInput.value = '';
		this._numberOfPeopleInput = 1;

		this._updateSelectedTipButtonUI(
			this._tipsContainer.querySelector('.button[data-tip="5"]')
		);

		this.updateResults(0, 0);
	}

	setFieldError(fieldName, errorMessage) {
		const input = document.querySelector(`input[name=${fieldName}]`);
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

	updateResults(tipAmountPerPerson, totalPerPerson) {
		this._tipAmountEl.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
		this._totalEl.textContent = `$${totalPerPerson.toFixed(2)}`;
	}

	_updateSelectedTipButtonUI(selectedBtn = null) {
		const previousSelectedButton = this._getActiveTipButton();
		previousSelectedButton?.classList.remove('button--active');
		selectedBtn?.classList.add('button--active');
	}

	_getActiveTipButton() {
		return this._tipsContainer.querySelector('.button--active');
	}
}

export default new View();
