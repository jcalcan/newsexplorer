class SavedNewsApi {
  constructor() {
    this._baseUrl = "http://localhost:3001"; // backend
  }

  getSavedNews(token) {
    return this._request(`${this._baseUrl}/saved-news`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  saveNewsArticle(article, token) {
    return this._request(`${this._baseUrl}/saved-news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(article)
    });
  }

  removeNewsArticle(id, token) {
    return this._request(`${this._baseUrl}/saved-news/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  _request(url, options) {
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.text().then((t) => {
          throw new Error(t || `Error: ${res.status}`);
        });
      }
      return res.json();
    });
  }
}

export const savedNewsApi = new SavedNewsApi();
