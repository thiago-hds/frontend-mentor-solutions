import * as model from './model.js';
import dashboardView from './views/dashboardView.js';

const changeCurrentTimeframe = function (timeframe) {
	model.state.isUpdating = true;
	model.state.currentTimeframe = timeframe;

	dashboardView.deactivateTimeframeButtons();
	dashboardView.toggleActivitiesUpdatingState();
};

const updateActivity = function () {
	if (!model.state.isUpdating) return;

	const { currentTimeframe } = model.state;

	dashboardView.update(currentTimeframe);
	dashboardView.toggleActivitiesUpdatingState();
	dashboardView.activateCurrentTimeframeButton(currentTimeframe);

	model.state.isUpdating = false;
};

const init = async function () {
	dashboardView.addHandlerTimeframeClick(changeCurrentTimeframe);
	dashboardView.addHandlerActivityCanBeUpdated(updateActivity);

	await model.fetchActivities();
	const { activities, currentTimeframe } = model.state;
	dashboardView.render(activities, currentTimeframe);
};
init();
