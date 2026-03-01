export class NewsAPI {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.newsexplorer.mine.bz"
        : "http://localhost:3001";
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      ...options,
    };

    return fetch(endpoint, finalOptions).then(this._checkResponse);
  }

  getNews(searchTerm) {
    const url = `${this._baseUrl}/news?q=${encodeURIComponent(searchTerm)}`;
    return this._request(url, { method: "GET" });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
export const newsApi = new NewsAPI();
