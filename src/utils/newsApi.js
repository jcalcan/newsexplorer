export class NewsAPI {
  constructor() {
    this._APIkey = "7006cbb31d7d47c1a3e8805ea9368cfa";
    this._baseUrl = `https://newsapi.org/v2/`;
  }
  _request(endpoint, options = {}) {
    const finalOptions = {
      ...options
    };

    return fetch(endpoint, finalOptions).then(this._checkResponse);
  }

  getNews(searchTerm) {
    // Construct the full URL with API key as query parameter
    const url = `${this._baseUrl}everything?q=${searchTerm}&sortBy=popularity&apiKey=${this._APIkey}`;

    return this._request(url, { method: "GET" });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  filterNewsData(data) {
    const result = { data };

    return result;
  }
}
