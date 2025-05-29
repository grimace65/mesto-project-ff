// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

initialCards.forEach(function(cardNode) {
    const cardItem = createCard(cardNode, removeCard);
    cardsList.append(cardItem);
})

function removeCard(item) {
    item.remove();
}

function createCard(card, deleteCard) {
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
    return cardElement;
}