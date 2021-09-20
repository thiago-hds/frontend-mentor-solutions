const btnShare = document.querySelector('.btn-share');
const shareOverlay = document.querySelector('.share');
console.log(shareOverlay);

const toggleShare = function () {
	btnShare.classList.toggle('btn-share--active');
	btnShare.classList.toggle('btn-share--inactive');

	shareOverlay.classList.toggle('share--active');
	shareOverlay.classList.toggle('share--inactive');
};

btnShare.addEventListener('click', toggleShare);
