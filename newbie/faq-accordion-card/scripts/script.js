const allQuestions = document.querySelectorAll('.question');

const colapseAllQuestions = function () {
	allQuestions.forEach(question => {
		question.closest('details').removeAttribute('open');
	});
};

const activateQuestion = function (question) {
	colapseAllQuestions();
};

allQuestions.forEach(question => {
	question.addEventListener('click', activateQuestion.bind(null, question));
});
