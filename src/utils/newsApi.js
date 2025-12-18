export class NewsAPI {
  constructor() {
    this._APIkey = "7006cbb31d7d47c1a3e8805ea9368cfa";
    this._baseUrl = `https://newsapi.org/v2/`;
    this._corsProxy = `https://corsproxy.io/?url=`;
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

    // Use CORS proxy for GitHub Pages
    const proxiedUrl = `${this._corsProxy}${url}`;

    return this._request(proxiedUrl, { method: "GET" });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
export const newsApi = new NewsAPI();
