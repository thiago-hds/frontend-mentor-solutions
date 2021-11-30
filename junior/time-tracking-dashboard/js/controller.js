import * as model from './model.js';
import dashboardView from './views/dashboardView.js';

const changeCurrentTimeframe = function (timeframe) {
	model.state.isUpdating = true;
	model.state.currentTimeframe = timeframe;

	dashboardView.deactivateTimeframeButtons();
	dashboardView.toggleActivitiesUpdating();
};

const updateActivity = function () {
	if (!model.state.isUpdating) return;

	const { currentTimeframe } = model.state;

	dashboardView.update(currentTimeframe);
	dashboardView.toggleActivitiesUpdating();
	dashboardView.activateCurrentTimeframeButton(currentTimeframe);
	model.state.isUpdating = false;
};

const init = async function () {
	dashboardView.addHandlerTimeframeClick(changeCurrentTimeframe);
	dashboardView.addHandlerActivityContentTransformEnd(updateActivity);

	await model.fetchActivities();
	const { activities, currentTimeframe } = model.state;
	dashboardView.render(activities, currentTimeframe);
};
init();
