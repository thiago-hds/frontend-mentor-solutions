class Model {
	constructor() {
		this.bill = 0;
		this.tip = 5;
		this.numberOfPeople = 1;
		this.tipAmountPerPerson = 0;
		this.totalPerPerson = 0;
	}

	reset() {
		this.bill = 0;
		this.tip = 5;
		this.numberOfPeople = 1;
		this.tipAmountPerPerson = 0;
		this.totalPerPerson = 0;
	}
}

export default new Model();
