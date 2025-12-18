import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import { useState, useEffect, Profiler } from "react";
import {
  useNavigate,
  useLocation,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import "./App.css";
import Profile from "./Profile/Profile";
import LoginModal from "../components/LoginModal/LoginModal";
import RegisterModal from "../components/RegisterModal/RegisterModal";
import RegistrationSuccessModal from "../components/RegistrationSuccessModal/RegistrationSuccessModal";
import ArticleModal from "../components/ArticleModal/ArticleModal";

import AppContext from "../contexts/Appcontexts";
import {
  getToken,
  setToken as saveTokenToStorage,
  removeToken
} from "../utils/token";
import { NewsAPI } from "../utils/newsApi";
import { UsersApi } from "../utils/usersApi";
import { savedNewsApi } from "../utils/SavedNewsApi";

const newsApi = new NewsAPI();
const usersApi = new UsersApi();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [newsData, setNewsData] = useState({ articles: [] });
  const [activeModal, setActiveModal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    username: "",
    _id: ""
  });
  const [token, setToken] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [latestSearchTerm, setLatestSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  console.log("=== ROUTE DEBUG ===");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("isLoading:", isLoading);
  console.log("token:", !!token);
  console.log("savedArticles:", savedArticles.length);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setIsLoading(false);
      return;
    }
    setToken(jwt);

    usersApi
      .getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          email: data.data.email,
          username: data.data.username,
          _id: data.data._id
        });
      })
      .catch((err) => {
        console.error(err);
        //clear bad token here
        removeToken();
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn && token) {
      savedNewsApi
        .getSavedNews(token)
        .then((data) => {
          console.log("Loaded saved articles:", data);
          setSavedArticles(data.data || data || []);
        })
        .catch((err) => {
          console.error("Failed to load saved articles:", err);
          setSavedArticles([]);
        });
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn, token]);

  function handleSearch(e) {
    e.preventDefault();

    // Get the search term from the input field
    const searchTerm = e.target
      .querySelector('input[type="text"]')
      .value.trim();

    if (!searchTerm) {
      console.log("Please enter a search term");
      return;
    }

    // API call to get news articles
    newsApi
      .getNews(searchTerm)
      .then((data) => {
        console.log("Search results:", data);
        const articlesWithKeyword = data.articles.map((article) => ({
          ...article,
          keyword: searchTerm
        }));
        setNewsData({ ...data, articles: articlesWithKeyword });
        setLatestSearchTerm(searchTerm);
      })
      .catch((error) => {
        console.error("Search error:", error);
        setErrorMessage("Failed to fetch news articles. Please try again.");
      });
  }

  function closeActiveModal() {
    setActiveModal("");
    setErrorMessage("");
  }
  function handleLogin({ email, password }) {
    console.log("Login data being sent:", { email, password });
    if (!email || !password) {
      return;
    }

    // Return the full promise chain
    return usersApi
      .authorize({ email, password })
      .then((authData) => {
        console.log("authorize response:", authData);
        if (!authData.data.token) {
          throw new Error("No token received");
        }

        const jwt = authData.data.token;
        setToken(jwt);
        saveTokenToStorage(jwt);

        return usersApi.getUserInfo(jwt); // Return promise for chaining
      })
      .then((userData) => {
        console.log("getUserInfo response:", userData);

        setCurrentUser({
          email: userData.data.email,
          username: userData.data.username,
          _id: userData.data._id
        });

        setIsLoggedIn(true);
        closeActiveModal();

        const redirectPath = location.state?.from?.pathname || "/saved-news";
        navigate(redirectPath);
      })
      .catch((err) => {
        console.error("Login error:", err);
        setErrorMessage("Invalid email or password");
      });
  }

  function handleModalSwitch() {
    activeModal === "signin"
      ? setActiveModal("signup")
      : setActiveModal("signin");
  }

  function handleRegistrationSuccessModal() {
    setActiveModal("RegisterSuccess");
  }

  function handleSignupClick() {
    setActiveModal("signup");
  }

  function handleLoginClick() {
    setActiveModal("signin");
  }

  function handleArticleClick(article) {
    setSelectedArticle(article);
    setActiveModal("article");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser({ email: "", username: "", _id: "" });
    setToken(null);
    removeToken();
    setSavedArticles([]);
    navigate("/");
  }

  function handleRegistration({ email, password, username, avatar }) {
    console.log("Registration attempt:", { username, email, password, avatar });

    return usersApi
      .createUser({
        email,
        password,
        username,
        avatar
      })
      .then(() => {
        return usersApi.authorize({ email, password });
      })
      .then((data) => {
        if (!data?.data?.token) {
          throw new Error("Authorization failed: no token");
        }
        setToken(data.data.token);
        return usersApi.getUserInfo(data.data.token);
      })
      .then((userinfo) => {
        console.log("userinfo: ", userinfo);
        setCurrentUser({
          username: userinfo.username || "",
          email: userinfo.email || "",
          avatar: userinfo.avatar || null,
          _id: userinfo._id
        });
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/saved-news");
      })
      .catch((error) => {
        console.log(
          "Registration error object:",
          error,
          "message:",
          error.message
        );
        throw (
          error.message ||
          "An error occurred during registration. Please try again."
        );
      });
  }

  const handleArticleLike = ({ id, isLiked, article }) => {
    const token = getToken();

    if (!isLoggedIn || !token) {
      handleLoginClick();
      return;
    }

    if (!isLiked) {
      const articleData = {
        keyword: article.keyword || article.source?.name || "News",
        title: article.title,
        description:
          article.description || article.content?.slice(0, 200) + "...",
        url: article.url,
        urlToImage: article.urlToImage || article.image,
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: article.source?.name || "Unknown",
        content: article.content || ""
      };

      savedNewsApi
        .saveNewsArticle(articleData, token)
        .then((response) => {
          const savedArticle = response.data || response;
          setNewsData((prev) => ({
            ...prev,
            articles: prev.articles.map((art) =>
              art.url === article.url
                ? { ...art, _id: savedArticle._id, isLiked: true }
                : art
            )
          }));
          // Also update savedArticles
          setSavedArticles((prev) => [savedArticle, ...prev]);
        })
        .catch((err) => console.error("Save error:", err));
    } else {
      // Remove works fine
      savedNewsApi
        .removeNewsArticle(id, token)
        .then((updatedArticle) => {
          setNewsData((prev) => ({
            ...prev,
            articles: prev.articles.map((art) =>
              art._id === id ? { ...art, isLiked: false } : art
            )
          }));
          setSavedArticles((prev) => prev.filter((art) => art._id !== id));
        })
        .catch((err) => console.error("Remove error:", err));
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        token,
        setToken
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleSignupClick={handleSignupClick}
            handleLoginClick={handleLoginClick}
            handleSearch={handleSearch}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  newsData={newsData}
                  savedArticles={savedArticles}
                  handleArticleLike={handleArticleLike}
                  handleLoginClick={handleLoginClick}
                  handleArticleClick={handleArticleClick}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    newsData={savedArticles}
                    handleArticleLike={handleArticleLike}
                    currentUser={currentUser}
                    handleArticleClick={handleArticleClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <LoginModal
            isOpen={activeModal === "signin"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            handleModalSwitch={handleModalSwitch}
            errorMessage={errorMessage}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            handleModalSwitch={handleModalSwitch}
            handleRegistrationSuccessModal={handleRegistrationSuccessModal}
          />
          <RegistrationSuccessModal
            isOpen={activeModal === "RegisterSuccess"}
            onClose={closeActiveModal}
            handleLoginClick={handleLoginClick}
          />
          <ArticleModal
            isOpen={activeModal === "article"}
            article={selectedArticle}
            onClose={closeActiveModal}
            handleArticleLike={handleArticleLike}
          />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
