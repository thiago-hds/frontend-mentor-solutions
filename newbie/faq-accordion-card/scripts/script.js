const allQuestions = document.querySelectorAll('.question');

const colapseAllQuestions = function () {
	allQuestions.forEach(question => {
		question.closest('section').classList.remove('active');
	});
};

const expandQuestion = function (question) {
	colapseAllQuestions();
	question.closest('section').classList.toggle('active');
};

allQuestions.forEach(question => {
	question.addEventListener('click', expandQuestion.bind(null, question));
});
