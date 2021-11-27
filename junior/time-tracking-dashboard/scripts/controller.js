import * as model from './model.js';
import dashboardView from './dashboardView.js';

const changeCurrentTimeframe = function (timeframe) {
	model.state.isUpdating = true;
	model.state.currentTimeframe = timeframe;

	dashboardView.deactivateTimeframeButtons();
	dashboardView.toggleActivitiesUpdating();
};

const updateActivity = function () {
	if (!model.state.isUpdating) return;

	const { activities, currentTimeframe } = model.state;

	dashboardView.update(activities, currentTimeframe);
	dashboardView.toggleActivitiesUpdating();
	dashboardView.activateCurrentTimeframeButton(currentTimeframe);
	model.state.isUpdating = false;
};

const init = async function () {
	dashboardView.addHandlerTimeframeClick(changeCurrentTimeframe);
	dashboardView.addHandlerActivityContentTransformEnd(updateActivity);

	try {
		await model.fetchActivities();
		const { activities, currentTimeframe } = model.state;
		dashboardView.hideLoadingStatus();
		dashboardView.render(activities, currentTimeframe);
	} catch (err) {
		dashboardView.showLoadingError();
		console.log('could not load data');
	}
};
init();
