function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
};

function showInputError(formElement, inputElement, config) {
    inputElement.setCustomValidity('');
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorMessage.classList.add(config.spanErrorClass);
    if (inputElement.validity.valueMissing) {
        errorMessage.textContent = inputElement.dataset.passError;
    } else if (inputElement.validity.patternMismatch) {
        errorMessage.textContent = inputElement.dataset.patternError;
    } else if (inputElement.validity.typeMismatch) {
        errorMessage.textContent = inputElement.dataset.typeError;
    } else {
        errorMessage.textContent = inputElement.validationMessage;
    }
};

function hideInputError(formElement, inputElement, config) {
    const errorMessage = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorMessage.classList.remove(config.errorClass);
    errorMessage.textContent = "";
};

function isValid(form, input, config) {
    if (!input.validity.valid) {
        showInputError(form, input, config);
    } else {
        hideInputError(form, input, config);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement, config) {
    const allValid = !hasInvalidInput(inputList);
    if (!allValid) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.unactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.unactiveButtonClass);
    }
};

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        isValid(formElement, inputElement, config);
    });
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })
    });
    if (!hasInvalidInput(inputList)) {
        formElement.submit();
    }
};

function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity('');
        hideInputError(formElement, inputElement, config);
    });
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.unactiveButtonClass);
    toggleButtonState(inputList, buttonElement, config);
};

export { enableValidation, clearValidation };