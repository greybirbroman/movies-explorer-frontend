import { BASE_URL } from "./Auth";
import { MOVIES_URL } from "./MoviesApi";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => this._handleResponse(res));
  }

  patchUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({ name: data.name, email: data.email }),
    }).then((res) => this._handleResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => this._handleResponse(res));
  }

  postNewMovie(card) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        country: card.country || "unknown",
        director: card.director || "unknown",
        duration: card.duration || 0,
        year: card.year || 'unknown',
        description: card.description || "unknown",
        image: `${MOVIES_URL}/${card.image.url}` || "unknown",
        trailer: card.trailerLink || "unknown",
        nameRU: card.nameRU,
        nameEN: card.nameEN || "unknown",
        thumbnail: `${MOVIES_URL}/${card.image.formats.thumbnail.url}`,
        movieId: card.id
      })
    }).then((res) => this._handleResponse(res));
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then((res) => this._handleResponse(res));
  }

  getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    };
  }
}

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
