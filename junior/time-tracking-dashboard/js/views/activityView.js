class ActivityView {
	_parentElement = document.querySelector('.dashboard');

	render(activity, timeframe) {
		const markup = this._generateMarkup(activity, timeframe);
		this._parentElement.insertAdjacentHTML('beforeend', markup);
	}

	update(activity, timeframe) {
		const { timeframes } = activity;
		const hours = timeframes[timeframe];

		const activityEl = this._getActivityElement(activity);

		const hoursEl = activityEl.querySelector('.activity__hours');
		const previousHoursEl = activityEl.querySelector(
			'.activity__previous-hours'
		);
		const previousTextEl = activityEl.querySelector(
			'.activity__previous-text'
		);

		hoursEl.textContent = `${hours.current}hrs`;
		previousTextEl.textContent = this._getPreviousTimeText(timeframe);
		previousHoursEl.textContent = `${hours.previous}hrs`;
	}

	toggleUpdatingState(activity) {
		const activityEl = this._getActivityElement(activity);
		activityEl.classList.toggle('activity--updating');
	}

	_getActivityElement({ title }) {
		const className = this._getClassName(title);
		return this._parentElement.querySelector(`.${className}`);
	}

	_generateMarkup(activity, timeframe) {
		const { title, timeframes } = activity;

		const hours = timeframes[timeframe];
		const className = this._getClassName(title);
		const previousTimeText = this._getPreviousTimeText(timeframe);

		return `
        <section class="activity ${className}">
            <div class="activity__content">
                <div class="card-row mb-sm">
                    <h2 class="activity__name">${title}</h2>
                    <button class="button" aria-label="more information">
                        <img src="images/icon-ellipsis.svg" alt="" />
                    </button>
                </div>
    
                <div class="card-row card-row--main">
                    <p class="activity__hours">${hours.current}hrs</p>
                    <p class="activity__previous">
                        <span class="activity__previous-text">${previousTimeText}</span> - 
                        <span class="activity__previous-hours">${hours.previous}hrs</span>
                    </p>
                </div>
            </div>
        </section>`;
	}

	_getClassName(activityTitle) {
		const name = activityTitle.toLowerCase().replaceAll(' ', '-');
		return `activity--${name}`;
	}

	_getPreviousTimeText(timeframe) {
		if (timeframe === 'daily') return 'Yesterday';
		if (timeframe === 'weekly') return 'Last Week';
		if (timeframe === 'monthly') return 'Last Month';
	}
}

export default new ActivityView();
