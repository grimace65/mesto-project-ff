function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

const clickOnOverlay = function (evt) {
    if (!evt || !evt.target) return;
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target); 
    }
};

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', clickOnOverlay);
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', clickOnOverlay);
};

export { openPopup, closePopup, handleEscape, clickOnOverlay };