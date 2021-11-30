const DATA_URL = 'data.json';

export const state = {
	activities: [],
	isLoading: true,
	isUpdating: false,
	hasError: false,
	currentTimeframe: 'daily',
};

export const fetchActivities = async function () {
	try {
		const res = await fetch(DATA_URL);
		state.activities = await res.json();
	} catch (err) {
		console.error(err);
	}
};
