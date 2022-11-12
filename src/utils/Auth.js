export const BASE_URL = 'https://api.greybirbmovies.nomoredomains.icu';

export const handleResponse = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  };
  
  export const registration = ({ name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({ name, email, password}),
    }).then((res) => handleResponse(res));
  };

  export const authorization = (data) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({ email: data.email, password: data.password }),
    }).then((res) => handleResponse(res));
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((res) => handleResponse(res));
  };