const questionsContainer = document.querySelector('.questions-container');

const colapseAllQuestions = function () {
	questionsContainer.querySelectorAll('.question').forEach(question => {
		question.closest('details').removeAttribute('open');
	});
};

const handleQuestionClick = function (e) {
	const question = e.target.closest('.question');
	if (!question) return;

	colapseAllQuestions();
};
questionsContainer.addEventListener('click', handleQuestionClick);
