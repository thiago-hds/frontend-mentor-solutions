class DashboardView {
	dashboardEl = document.querySelector('.dashboard');
	timeframesListEl = document.querySelector('.header__timeframes-list');
	timeframeButtons = document.querySelectorAll(
		'.header__timeframes-list .button'
	);
	loadingStatus = document.querySelector('.loading-status');
	loadingStatusSpinner = document.querySelector('.spinner');
	loadingStatusTextEl = document.querySelector('.loading-status__text');

	render(activities, timeframe) {
		activities.forEach(activity => {
			const markup = this._generateActivityMarkup(activity, timeframe);
			this.dashboardEl.insertAdjacentHTML('beforeend', markup);
		});
	}

	update(activities, timeframe) {
		activities.forEach(activity => {
			this._updateActivity(activity, timeframe);
		});
	}

	addHandlerTimeframeClick(handler) {
		this.timeframesListEl.addEventListener('click', function (e) {
			if (!e.target.matches('.button')) return;

			const button = e.target;
			const timeframe = button.dataset.timeframe;
			handler(timeframe);
		});
	}

	addHandlerActivityContentTransformEnd(handler) {
		this.dashboardEl.addEventListener('transitionend', function (e) {
			if (!e.target.matches('.activity__content')) return;
			if (e.propertyName !== 'transform') return;

			handler();
		});
	}

	toggleActivitiesUpdating() {
		const activitiesEl = this.dashboardEl.querySelectorAll('.activity');
		activitiesEl.forEach(activityEl =>
			activityEl.classList.toggle('activity--loading')
		);
	}

	deactivateTimeframeButtons() {
		this.timeframeButtons.forEach(btn =>
			btn.classList.remove('button--active')
		);
	}

	activateCurrentTimeframeButton(timeframe) {
		const btn = document.querySelector(
			`.button[data-timeframe="${timeframe}"]`
		);
		btn.classList.add('button--active');
	}

	hideLoadingStatus() {
		this.loadingStatus.classList.add('hidden');
	}

	hideLoadingStatusSpinner() {
		this.loadingStatusSpinner.classList.add('hidden');
	}

	showLoadingError() {
		this.hideLoadingStatusSpinner();
		this.loadingStatusTextEl.innerText =
			'Could not load data. Please try again later.';
	}

	_generateActivityMarkup(activity, timeframe) {
		const { title, timeframes } = activity;

		const hours = timeframes[timeframe];
		const className = this._getActivityClassName(title);
		const previousTimeText = this._getActivityPreviousTimeText(timeframe);

		return `
        <section class="activity ${className}">
            <div class="activity__content">
                <div class="card-row mb-sm">
                    <h2 class="activity__name">${title}</h2>
                    <button class="button">
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

	_updateActivity(activity, timeframe) {
		const { title, timeframes } = activity;
		const hours = timeframes[timeframe];

		const className = this._getActivityClassName(title);
		const activityEl = this.dashboardEl.querySelector(`.${className}`);

		const hoursEl = activityEl.querySelector('.activity__hours');
		const previousHoursEl = activityEl.querySelector(
			'.activity__previous-hours'
		);
		const previousTextEl = activityEl.querySelector(
			'.activity__previous-text'
		);

		hoursEl.textContent = `${hours.current}hrs`;
		previousTextEl.textContent =
			this._getActivityPreviousTimeText(timeframe);
		previousHoursEl.textContent = `${hours.previous}hrs`;
	}

	_getActivityClassName(activityTitle) {
		const name = activityTitle.toLowerCase().replaceAll(' ', '-');
		return `activity--${name}`;
	}

	_getActivityPreviousTimeText(timeframe) {
		if (timeframe === 'daily') return 'Yesterday';
		if (timeframe === 'weekly') return 'Last Week';
		if (timeframe === 'monthly') return 'Last Month';
	}
}

export default new DashboardView();
