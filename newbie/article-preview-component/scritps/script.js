const btnShare = document.querySelector('.btn-share');
const shareOverlay = document.querySelector('.share');

const toggleShare = function () {
	btnShare.classList.toggle('btn-share--active');
	btnShare.classList.toggle('btn-share--inactive');

	shareOverlay.classList.toggle('hidden');
};

btnShare.addEventListener('click', toggleShare);
