const cardTemplate = document.querySelector('#card-template').content;

const cardImagePopup = document.querySelector('.popup_type_image');

function removeCard(item) {
    item.remove();
};

function likeTheCard(button) {
    button.classList.add('card__like-button_is-active');
};

function removeTheLike(button) {
    button.classList.remove('card__like-button_is-active');
};

function createCard(card, deleteCard, pressLikeButton, deleteTheLike, openCardImagePopup) {
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    const cardTitle = cardElement.querySelector('.card__title');
    const image = cardElement.querySelector('.card__image');

    cardTitle.textContent = card.name;
    image.src = card.link;
    image.alt = card.name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', function() {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            deleteTheLike(likeButton);
        } else {
            pressLikeButton(likeButton);
        }
    });

    image.addEventListener('click', function() {
        openCardImagePopup(image, cardTitle);
    });

    return cardElement;
};

export { cardTemplate, cardImagePopup, createCard, removeCard, likeTheCard, removeTheLike };