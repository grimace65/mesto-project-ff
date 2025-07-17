import './pages/index.css';
import initialCards from './cards.js';
import avatar from './images/avatar.jpg';
import card1 from './images/card_1.jpg';
import card2 from './images/card_2.jpg';
import card3 from './images/card_3.jpg';
import logo from './images/logo.svg';

import { cardTemplate, cardImagePopup, createCard, removeCard, handleDeleteCLick, handleLikeClick } from './components/card.js';

import { openPopup, closePopup, handleEscape, clickOnOverlay } from './components/modal.js';

import { enableValidation, clearValidation } from './components/validation.js';

import { getCards, getProfileInfo, saveEditions, addNewCard, editAvatar } from './components/api.js';

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

const newAvatarPopup = document.querySelector('.popup_type_avatar');
const newAvatarSvg = document.querySelector('.avatar-icon');
const avatarInput = document.querySelector('.popup__input_type_avatar-url');
const avatarImage = document.querySelector('.profile__image');
const avatarForm = document.forms.editavatar;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const currentUserId = '90101c477853481db570e27a';

const profileForm = document.forms.editprofile;

editProfileButton.addEventListener('click', function(evt) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
    clearValidation(profileForm, validationConfig);
});

Promise.all([getProfileInfo(), getCards()])
.then(([user, cards]) => {
    console.log('Данные пользователя:', user);
    cards.forEach((card) => {
        const cardItem = createCard(card, handleDeleteCLick, handleLikeClick, openImagePopup, currentUserId);
        cardsList.append(cardItem);
    });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
});

function renderLoading(isLoading, initialText, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = initialText;
    }
};

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const popupButton = evt.target.querySelector('.popup__button');
    renderLoading(true, 'Сохранить', popupButton);
    addNewCard(cardNameInput.value, cardUrlInput.value)
    .then((res) => {
        console.log('Ответ сервера:', res);
        const newCard = {
            _id: res._id,
            name: res.name,
            link: res.link,
            owner: res.owner,
            likes: res.likes
        };
        const newCardElement = createCard(newCard, handleDeleteCLick, handleLikeClick, openImagePopup, currentUserId);
        cardsList.prepend(newCardElement);
        closePopup(newPlacePopup);
    })
    .catch(err => {
        console.log('Ошибка при сохранении:', err);
    })
    .finally(() => {
        renderLoading(false, 'Сохранить', popupButton);
    })
    newCardForm.reset();
};

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

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
    clearValidation(newCardForm, validationConfig);
});

newAvatarSvg.addEventListener('click', function() {
    openPopup(newAvatarPopup);
    clearValidation(avatarForm, validationConfig);
});

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const popupButton = evt.target.querySelector('.popup__button');
    renderLoading(true, 'Сохранить', popupButton);
    editAvatar(avatarInput.value)
    .then((res) => {
        avatarImage.style.backgroundImage = `url("${res.avatar}")`;
        closePopup(newAvatarPopup);
    })
    .catch(err => {
        console.log('Ошибка при сохранении:', err);
    })
    .finally(() => {
        renderLoading(false, 'Сохранить', popupButton);
    })
};

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const popupButton = evt.target.querySelector('.popup__button');
    renderLoading(true, 'Сохранить', popupButton);
    saveEditions(nameInput.value, jobInput.value)
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(editProfilePopup);
    })
    .catch(err => {
        console.log('Ошибка при сохранении:', err);
    })
    .finally(() => {
        renderLoading(false, 'Сохранить', popupButton)
    })
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

enableValidation(validationConfig);