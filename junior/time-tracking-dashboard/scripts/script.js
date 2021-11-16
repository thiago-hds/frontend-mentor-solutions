const dashboardEl = document.querySelector('.dashboard');
const fetchData = async function () {
	console.log('fetching data');
	const res = await fetch('../data.json');
	const data = await res.json();
	console.log('data fetched');
	return data;
};

const getActivityClassName = title => title.toLowerCase().split(' ').join('-');

const generateActivityMarkup = function (
	{ title, timeframes },
	timeframe = 'daily'
) {
	console.log(timeframes);
	const { current, previous } = timeframes[timeframe];

	return `
	<section class="activity activity--${getActivityClassName(title)}">
		<div class="activity__content">
			<div class="card-row mb-sm">
				<h2 class="activity__name">${title}</h2>
				<button class="button">
					<img src="images/icon-ellipsis.svg" alt="" />
				</button>
			</div>

			<div class="card-row card-row--main">
				<p class="activity__hours">${current}hrs</p>
				<p class="activity__previous-hours">
					Previous - ${previous}hrs
				</p>
			</div>
		</div>
	</section>`;
};

const updateActivity = function (activity, period = 'daily') {
	const { title, timeframes } = activity;
	const { current, previous } = timeframes[period];
	const activityEl = dashboardEl.querySelector(
		`.activity--${getActivityClassName(title)}`
	);
	console.log(`.activity--${getActivityClassName(title)}`);

	activityEl.querySelector('.activity__hours').textContent = `${current}hrs`;
	activityEl.querySelector(
		'.activity__previous'
	).textContent = `${current}hrs`;
};

const renderActivities = function (activities) {
	activities.forEach(activity => {
		const markup = generateActivityMarkup(activity);
		dashboardEl.insertAdjacentHTML('beforeend', markup);
	});
};

const updateAllActivities = function (activities, timeframe) {
	activities.forEach(activity => {
		updateActivity(activity, timeframe);
	});
};

const handleTimeframeClick = function (activities, e) {
	const btn = e.target.closest('.button');
	if (!btn) return;

	const timeframe = btn.dataset.timeframe;
	if (!timeframe) return;

	updateAllActivities(activities, timeframe);
};

const init = async function () {
	const activities = await fetchData();
	renderActivities(activities);

	// TODO remover esse bind
	document
		.querySelector('.header__timeframes-list')
		.addEventListener('click', handleTimeframeClick.bind(null, activities));
};
init();
