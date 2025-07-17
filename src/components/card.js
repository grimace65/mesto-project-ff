import { deleteCard, putLikeToCard, unlikeTheCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const cardImagePopup = document.querySelector('.popup_type_image');

function removeCard(item) {
    item.remove();
};

function handleDeleteCLick(cardId, cardELem) {
    deleteCard(cardId)
    .then(() => {
        removeCard(cardELem);
    })
    .catch(err => {
        console.error('Ошибка при удалении карточки:', err);
    });
};

async function handleLikeClick(button, cardData, userId, cardId) {
    const isLiked = cardData.likes.some((liker) => liker._id === userId);
    try {
        if (isLiked) {
            await unlikeTheCard(cardId);
            cardData.likes = cardData.likes.filter(liker => liker._id !== userId);
            button.classList.remove('card__like-button_is-active');
        } else {
            await putLikeToCard(cardId);
            cardData.likes.push({ _id: userId });
            button.classList.add('card__like-button_is-active');
        };
        return cardData.likes.length;
    } catch (err) {
        console.error('Ошибка:', err);
        return cardData.likes.length;
    };
};

function createCard(card, deleteTheCard, clickOnLike, openCardImagePopup, myId) {
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    const cardTitle = cardElement.querySelector('.card__title');
    const image = cardElement.querySelector('.card__image');

    cardTitle.textContent = card.name;
    image.src = card.link;
    image.alt = card.name;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id !== myId) {
        cardDeleteButton.classList.add('popup__close-invisible');
    } else {
        cardDeleteButton.classList.remove('popup__close-invisible');
        cardDeleteButton.addEventListener('click', function() {
            deleteTheCard(card._id, cardElement);
        });
    }

    const likeButton = cardElement.querySelector('.card__like-button');
    const numberOfLikes = cardElement.querySelector('.number_of_likes');
    numberOfLikes.textContent = card.likes.length;

    const isLiked = card.likes.some(liker => liker._id === myId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', async () => {
        const newLikesCount = await clickOnLike(likeButton, card, myId, card._id);
        numberOfLikes.textContent = newLikesCount;
    });

    image.addEventListener('click', function() {
        openCardImagePopup(image, cardTitle);
    });

    return cardElement;
};

export { cardTemplate, cardImagePopup, createCard, removeCard, handleDeleteCLick, handleLikeClick };