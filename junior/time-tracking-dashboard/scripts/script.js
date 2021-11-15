const dashboardEl = document.querySelector('.dashboard');
const fetchData = async function () {
	console.log('fetching data');
	const res = await fetch('/data.json');
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

const renderActivities = function (activities) {
	activities.forEach(activity => {
		const markup = generateActivityMarkup(activity);
		dashboardEl.insertAdjacentHTML('beforeend', markup);
	});
};

const init = async function () {
	const activities = await fetchData();
	renderActivities(activities);
};
init();
