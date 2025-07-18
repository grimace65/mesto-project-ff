const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '0f72db50-920a-4c6b-b438-1dbd99f7a6f5',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

function saveEditions(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => checkResponse(res))
};

function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => checkResponse(res))
};

function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: id
    })
  })
  .then(res => checkResponse(res))
};

function putLikeToCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: id
    })
  })
  .then(res => checkResponse(res))
};

function unlikeTheCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: id
    })
  })
  .then(res => checkResponse(res))
};

function editAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => checkResponse(res))
};

export { getCards, getProfileInfo, saveEditions, addNewCard, deleteCard, putLikeToCard, unlikeTheCard, editAvatar };