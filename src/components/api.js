function getCards() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
        headers: {
          authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
          'Content-Type': 'application/json'
        }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

function getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
        headers: {
          authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5'
        }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

function saveEditions(name, about) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

function addNewCard(name, link) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'POST',
    headers: {
      authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

function deleteCard(id) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: id
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

function putLikeToCard(id) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: id
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

function unlikeTheCard(id) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: id
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

function editAvatar(url) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export { getCards, getProfileInfo, saveEditions, addNewCard, deleteCard, putLikeToCard, unlikeTheCard, editAvatar };