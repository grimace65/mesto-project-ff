import './pages/index.css';
import initialCards from './cards.js';
import avatar from './images/avatar.jpg';
import card1 from './images/card_1.jpg';
import card2 from './images/card_2.jpg';
import card3 from './images/card_3.jpg';
import logo from './images/logo.svg';

import { cardTemplate, cardImagePopup, createCard, removeCard, likeTheCard, removeTheLike } from './components/card.js';

import { openPopup, closePopup, handleEscape, clickOnOverlay } from './components/modal.js';

const cardsList = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');

const editProfilePopup = document.querySelector('.popup_type_edit');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newCardForm = document.forms.newplace;
const newPlacePopup = document.querySelector('.popup_type_new-card');
const cardNameInput = newPlacePopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = newPlacePopup.querySelector('.popup__input_type_url');

const popupImage = cardImagePopup.querySelector('.popup__image');
const popupPlaceName = cardImagePopup.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');

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
    const newCardElement = createCard(newCard, removeCard, likeTheCard, removeTheLike, openImagePopup); //извините за такую глупую ошибку:_)
    cardsList.prepend(newCardElement);
    closePopup(newPlacePopup);
    newCardForm.reset();
});

function openImagePopup(cardPicture, title) {
    popupImage.src = cardPicture.src;
    popupImage.alt = cardPicture.alt;
    popupPlaceName.textContent = title.textContent;
    openPopup(cardImagePopup);
};

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });  

addButton.addEventListener('click', function(evt) {
    openPopup(newPlacePopup);
});

editProfileButton.addEventListener('click', function(evt) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
});

const profileForm = document.forms.editprofile;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);