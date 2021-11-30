import activityView from './activityView.js';

class DashboardView {
	dashboardEl = document.querySelector('.dashboard');

	// timeframe buttons
	timeframesListEl = document.querySelector('.header__timeframes-list');
	timeframeButtonsEl = document.querySelectorAll(
		'.header__timeframes-list .button'
	);

	// loading overlay
	loadingOverlayEl = document.querySelector('.loading-overlay');
	spinnerEl = document.querySelector('.spinner');
	loadingOverlayTextEl = document.querySelector('.loading-overlay__text');

	_activities;

	render(activities, timeframe) {
		if (!activities || activities.length === 0) return this._renderError();

		this._activities = activities;
		this._activities.forEach(activity =>
			activityView.render(activity, timeframe)
		);

		this.hideLoadingOverlay();
	}

	update(timeframe) {
		this._activities.forEach(activity =>
			activityView.update(activity, timeframe)
		);
	}

	toggleActivitiesUpdating() {
		this._activities.forEach(activity =>
			activityView.toggleUpdating(activity)
		);
	}

	deactivateTimeframeButtons() {
		this.timeframeButtonsEl.forEach(btn =>
			btn.classList.remove('button--active')
		);
	}

	activateCurrentTimeframeButton(timeframe) {
		const btn = document.querySelector(
			`.button[data-timeframe="${timeframe}"]`
		);
		btn.classList.add('button--active');
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

	hideLoadingOverlay() {
		this.loadingOverlayEl.classList.add('hidden');
	}

	_renderError() {
		this._hideLoadingSpinner();
		this.loadingOverlayTextEl.innerText =
			'Could not load data. Please try again later.';
	}

	_hideLoadingSpinner() {
		this.spinnerEl.classList.add('hidden');
	}
}

export default new DashboardView();
