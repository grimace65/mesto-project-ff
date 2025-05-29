import './pages/index.css';
import initialCards from './cards.js';
import avatar from './images/avatar.jpg';
import card1 from './images/card_1.jpg';
import card2 from './images/card_2.jpg';
import card3 from './images/card_3.jpg';
import logo from './images/logo.svg';

const cardsList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');

const editProfilePopup = document.querySelector('.popup_type_edit');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_description');

const newCardForm = document.forms.newplace;
const newPlacePopup = document.querySelector('.popup_type_new-card');
const cardNameInput = newPlacePopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = newPlacePopup.querySelector('.popup__input_type_url');

const closeButtons = document.querySelectorAll('.popup__close');

import { cardTemplate, cardImagePopup, createCard, removeCard, likeTheCard, removeTheLike, openImagePopup } from './components/card.js';

initialCards.forEach(function(cardNode) {
    const cardItem = createCard(cardNode, removeCard, likeTheCard, removeTheLike, openImagePopup);
    cardsList.append(cardItem);
});

newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };
    const newCardElement = createCard(newCard, removeCard);
    cardsList.prepend(newCardElement);
    popupClosing(popups);
    newCardForm.reset();
});

import { popupOpening, popupClosing, closingByEsc, clickOnOverlay, popups, popupsArr, addButton } from './components/modal.js';

closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        popupClosing(popups);
    })
});

popupOpening(addButton, newPlacePopup);

popupOpening(editButton, editProfilePopup);

const formElement = document.forms.editprofile;

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClosing(popups);
}

formElement.addEventListener('submit', handleFormSubmit);

clickOnOverlay();
closingByEsc();