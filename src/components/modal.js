function popupOpening(button, popup) {
    button.addEventListener('click', function() {
        popup.classList.add('popup_is-opened');
    });
};

function popupClosing(items) {
    items.forEach(function(popup) {
        popup.classList.remove('popup_is-opened');
    })
};

const popups = document.querySelectorAll('.popup');
const popupsArr = Array.from(popups);
const addButton = document.querySelector('.profile__add-button');

function closingByEsc() {
    document.addEventListener('keydown', function(evt) {
        const popupIsOpened = popupsArr.some(function(popup) {
            return popup.classList.contains('popup_is-opened');
        });
        if(popupIsOpened) {
            if (evt.key === 'Escape') {
                popupClosing(popups);
            }
        };
    });
};
function clickOnOverlay() {
    document.addEventListener('click', function(evt) {
        const clickOnPopup = evt.target.classList.contains('popup');
        const clickOnAddButton = evt.target.contains(addButton);
        if (clickOnPopup && !clickOnAddButton) {
            popupClosing(popups);
        }
    });
}

export { popupOpening, popupClosing, closingByEsc, clickOnOverlay, popups, popupsArr, addButton };