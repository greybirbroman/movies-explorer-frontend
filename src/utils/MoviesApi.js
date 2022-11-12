export const MOVIES_URL = "https://api.nomoreparties.co/";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
  }
}

const moviesApi = new MoviesApi({
    baseUrl: MOVIES_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  export default moviesApi;
