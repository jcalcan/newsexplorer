import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header({
  handleLoginClick,
  handleSignupClick,
  handleSearch,
  isLoggedIn,
  currentUser,
  onLogout
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSavedNews = location.pathname === "/saved-news";
  const isHome = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLogin = () => {
    handleLoginClick();
    closeMobileMenu();
  };

  const handleMobileLogout = () => {
    onLogout();
    closeMobileMenu();
  };

  const handleMobileNavHome = () => {
    navigate("/");
    closeMobileMenu();
  };

  const handleMobileNavSaved = () => {
    navigate("/saved-news");
    closeMobileMenu();
  };

  return (
    <header
      className={
        "header " +
        (isHome ? "header_home " : "") +
        (isSavedNews ? "header_saved" : "")
      }
    >
      {/* Top bar */}
      <nav className="header__nav">
        <Link to="/" className="header__logo-link">
          <div className="header__title">NewsExplorer</div>
        </Link>

        <div className="header__nav-right">
          {/* Desktop nav links */}
          <div className="header__nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "header__nav-link" +
                (isActive && !isSavedNews ? " header__nav-link_active" : "")
              }
            >
              Home
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  "header__nav-link" +
                  (isActive && isSavedNews ? " header__nav-link_active" : "")
                }
              >
                Saved articles
              </NavLink>
            )}
          </div>

          {/* Desktop auth / user area */}
          <div className="header__nav-auth">
            {!isLoggedIn && (
              <>
                <button
                  type="button"
                  className="header__signin-btn"
                  onClick={handleLoginClick}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className="header__menu-btn"
                  onClick={toggleMobileMenu}
                  aria-label="Open menu"
                />
              </>
            )}

            {isLoggedIn && (
              <>
                <button
                  type="button"
                  className="header__user-btn"
                  onClick={onLogout}
                >
                  {currentUser?.username || "User"}
                  <span className="header__logout-icon" />
                </button>
                <button
                  type="button"
                  className="header__menu-btn header__menu-btn_logged-in"
                  onClick={toggleMobileMenu}
                  aria-label="Open menu"
                />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero + search only on home */}
      {isHome && (
        <section className="header__main-headline">
          <h1 className="header__main-headline__text">
            What&apos;s going on in the world?
          </h1>
          <p className="header__main-headline__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <form
            className="header__main-headline__search"
            onSubmit={handleSearch}
          >
            <label htmlFor="search-input" className="visually-hidden">
              Search for news topics
            </label>
            <input
              id="search-input"
              type="text"
              className="header__main-headline__search-input"
              placeholder="Enter topic"
            />
            <button
              type="submit"
              className="header__main-headline__search-button"
            >
              Search
            </button>
          </form>
        </section>
      )}

      {/* Mobile menu overlay */}
      <div
        className={`header__mobile-menu ${
          isMobileMenuOpen ? "header__mobile-menu--open" : ""
        }`}
      >
        <div className="header__mobile-menu-content">
          <div className="header__mobile-menu-header">
            <h2 className="header__mobile-menu-title">NewsExplorer</h2>
            <button
              type="button"
              className="header__mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            />
          </div>

          <nav className="header__mobile-menu-nav">
            <button
              type="button"
              className={`header__mobile-menu-link ${
                location.pathname === "/"
                  ? "header__mobile-menu-link_active"
                  : ""
              }`}
              onClick={handleMobileNavHome}
            >
              Home
            </button>

            {isLoggedIn && (
              <button
                type="button"
                className={`header__mobile-menu-link ${
                  location.pathname === "/saved-news"
                    ? "header__mobile-menu-link_active"
                    : ""
                }`}
                onClick={handleMobileNavSaved}
              >
                Saved articles
              </button>
            )}

            {!isLoggedIn && (
              <button
                type="button"
                className="header__mobile-menu-auth-btn"
                onClick={handleMobileLogin}
              >
                Sign in
              </button>
            )}

            {isLoggedIn && (
              <button
                type="button"
                className="header__mobile-menu-auth-btn"
                onClick={handleMobileLogout}
              >
                {currentUser?.username || "User"} • Log out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
