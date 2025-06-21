const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const somePopup = document.querySelector('.popup');

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

const clickOnOverlay = function(evt) {
    if (!evt || !evt.target) return;
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

function openPopup(popup) {
    if (popup.classList.contains('popup_type_edit')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent;
    }
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', clickOnOverlay);
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', clickOnOverlay);
};

export { openPopup, closePopup, handleEscape, clickOnOverlay, somePopup, profileTitle, profileDescription, nameInput, jobInput };