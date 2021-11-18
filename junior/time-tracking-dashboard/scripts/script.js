const dashboardEl = document.querySelector('.dashboard');
const timeframesListEl = document.querySelector('.header__timeframes-list');

let activities = null;
let isUpdating = false;
let currentTimeframe = 'daily';

const fetchActivities = async function () {
	console.log('fetching data');
	const res = await fetch('/data.json');
	activities = await res.json();
	console.log('data fetched');
};

const getActivityClassName = function (title) {
	const name = title.toLowerCase().split(' ').join('-');
	return `activity--${name}`;
};

const generateActivityMarkup = function (activity) {
	const { title, timeframes } = activity;
	const hours = timeframes[currentTimeframe];
	const className = getActivityClassName(title);

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
					<span class="activity__previous-text">Previous</span> - 
					<span class="activity__previous-hours">${hours.previous}hrs</span>
				</p>
			</div>
		</div>
	</section>`;
};

const getPreviousText = function (timeframe) {
	if (timeframe === 'daily') return 'Yesterday';
	if (timeframe === 'weekly') return 'Last week';
	if (timeframe === 'monthly') return 'Last month';
};

const updateActivity = function (activity) {
	const { title, timeframes } = activity;
	const hours = timeframes[currentTimeframe];

	const className = getActivityClassName(title);

	console.log(className);
	const activityEl = dashboardEl.querySelector(`.${className}`);

	const hoursEl = activityEl.querySelector('.activity__hours');
	const previousHoursEl = activityEl.querySelector(
		'.activity__previous-hours'
	);
	const previousTextEl = activityEl.querySelector('.activity__previous-text');

	hoursEl.textContent = `${hours.current}hrs`;
	previousTextEl.textContent = getPreviousText(currentTimeframe);
	previousHoursEl.textContent = `${hours.previous}hrs`;
};

const renderActivities = function () {
	activities.forEach(activity => {
		const markup = generateActivityMarkup(activity);
		dashboardEl.insertAdjacentHTML('beforeend', markup);
	});
};

const toggleActivitiesLoading = function () {
	const activitiesEl = dashboardEl.querySelectorAll('.activity');
	activitiesEl.forEach(activityEl =>
		activityEl.classList.toggle('activity--loading')
	);
};

const deactivateTimeframeButtons = function () {
	document
		.querySelectorAll('.header__timeframes-list .button')
		.forEach(btn => btn.classList.remove('button--active'));
};

const handleTimeframeClick = function (e) {
	console.log(e);
	if (!e.target.matches('.button')) return;
	const btn = e.target;

	currentTimeframe = btn.dataset.timeframe;
	// console.log(timeframe);

	isUpdating = true;
	toggleActivitiesLoading();

	deactivateTimeframeButtons();
	btn.classList.add('button--active');
};

const init = async function () {
	await fetchActivities();
	renderActivities();
};
timeframesListEl.addEventListener('click', handleTimeframeClick);
dashboardEl.addEventListener('transitionend', function (e) {
	console.log(e);
	if (
		!e.target.matches('.activity__content') ||
		e.propertyName !== 'transform' ||
		!isUpdating
	)
		return;

	activities.forEach(activity => {
		updateActivity(activity);
	});
	toggleActivitiesLoading();
	isUpdating = false;
});
init();
