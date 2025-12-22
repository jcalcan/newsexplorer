export class UsersApi {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.newsexplorer.mine.bz/"
        : "http://localhost:3001/";
    this._headers = {
      "Content-Type": "application/json"
    };
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      ...options,
      headers: {
        ...this._headers,
        ...(options.headers || {})
      }
    };

    return fetch(endpoint, finalOptions).then(this._checkResponse);
  }

  //for future use
  // getItems() {
  //   return this._request(`${this._baseUrl}items`, { method: "GET" }).then(
  //     (response) => {
  //       return response.data;
  //     }
  //   );
  // }

  // postItems(data, token) {
  //   return this._request(`${this._baseUrl}items`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify(data)
  //   }).then((response) => {
  //     return response;
  //   });
  // }

  deleteItem(id, token) {
    return this._request(`${this._baseUrl}items/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      // Try to extract meaningful error from HTML
      if (
        text.includes("Email already exists") ||
        text.includes("ConflictError")
      ) {
        throw new Error("ConflictError: Email already exists");
      }
      if (text.includes("already exists")) {
        throw new Error("Email already exists");
      }
      throw new Error(text.substring(0, 100) || `Error: ${res.status}`);
    });
  }

  createUser(data) {
    return this._request(`${this._baseUrl}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  getUserInfo(token) {
    console.log("getUserInfo token: ", token);
    return this._request(`${this._baseUrl}me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  authorize(data) {
    // console.log("Making request to:", `${this._baseUrl}signin`);
    return this._request(`${this._baseUrl}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
  }
  updateUserInfo(data, token) {
    return this._request(`${this._baseUrl}me`, {
      method: "PATCH",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  }

  addCardLike(id, token) {
    return this._request(`${this._baseUrl}items/${id}/likes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  removeCardLike(id, token) {
    return this._request(`${this._baseUrl}items/${id}/likes`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }
}
