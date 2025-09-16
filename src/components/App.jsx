import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import LoginModal from "../components/LoginModal/LoginModal";
import RegisterModal from "../components/RegisterModal/RegisterModal";
import AppContext from "../contexts/Appcontexts";
import { NewsAPI } from "../utils/newsApi";
// import { jsonServerApi } from "../utils/jsonServerApi";

const newsApi = new NewsAPI();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newsData, setNewsData] = useState({ articles: [] });
  const [activeModal, setActiveModal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //for future backend user management
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

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
        setNewsData(data);
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
    // TODO: Implement login functionality with jsonServerApi
    console.log("Login attempt:", { email, password });
    // For testing context
    setIsLoggedIn(true);
    setCurrentUser({
      username: "Test User",
      email: email,
      _id: "test123",
      avatar: null
    });
    closeActiveModal();
  }
  function handleModalSwitch() {
    activeModal === "signin"
      ? setActiveModal("signup")
      : setActiveModal("signin");
  }
  function handleSignupClick() {
    setActiveModal("signup");
  }

  function handleLoginClick() {
    setActiveModal("signin");
  }

  function handleRegistration({ name, email, password, avatar }) {
    // TODO: Implement registration functionality with jsonServerApi
    console.log("Registration attempt:", { name, email, password, avatar });
    // For testing context, let's simulate a successful registration
    setIsLoggedIn(true);
    setCurrentUser({
      username: name,
      email: email,
      _id: "test123",
      avatar: avatar || null
    });
    closeActiveModal();
    navigate("/");
  }

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
          />
          <Main newsData={newsData} />
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
          />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
