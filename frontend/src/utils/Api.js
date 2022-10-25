class Api {
  constructor({ baseUrl}) {
    this._address = baseUrl;
  }

  _getToken() {
    return 'Bearer ' + localStorage.getItem('jwt')
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._getToken()
      }
    })
      .then(this._getResponseData);
  }

  getInfoUser() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._getToken()
      }
    })
      .then(this._getResponseData);
  }

  setInfoUser({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponseData);
  }

  setCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponseData);
  }

  removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._getToken(),
      }
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._getToken(),
      }
    })
      .then(this._getResponseData);
  }

  setUserAvatar(src) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: src,
      })
    })
      .then(this._getResponseData);
  }
}

const api = new Api({ // создаём экземляр класса работающего с API сервера
  baseUrl: "https://noskov.vlad.students.nomoredomains.icu",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

