export const state = {};

export function reset() {
	state.bill = 0;
	state.tip = 5;
	state.numberOfPeople = 1;
	state.tipAmountPerPerson = 0;
	state.totalPerPerson = 0;
}

reset();
