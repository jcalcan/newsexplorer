import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header({ handleLoginClick, handleSignupClick, handleSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleClick(card) {
    /*
        setActiveModal("preview");
    setSelectedCard(card);
        */
  }

  function handleSignin(card) {
    /*
    setActiveModal("preview");
    setSelectedCard(card);
    */
  }

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function handleMobileMenuClose() {
    setIsMobileMenuOpen(false);
  }

  function handleMobileSignin() {
    handleLoginClick();
    handleMobileMenuClose();
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <div className="header__title">NewsExplorer</div>
        </Link>
        <div className="header__nav-buttons">
          <Link to="/">
            <button type="button" className="header__home-btn">
              Home
            </button>
          </Link>
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
            onClick={handleMobileMenuToggle}
            aria-label="Open menu"
          >
          </button>
        </div>
      </nav>

      <section className="header__main-headline">
        <h1 className="header__main-headline__text">
          What's going on in the world?
        </h1>
        <p className="header__main-headline__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="header__main-headline__search" onSubmit={handleSearch}>
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

      {/* Mobile Menu Overlay */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <div className="header__mobile-menu-content">
          <div className="header__mobile-menu-header">
            <h2 className="header__mobile-menu-title">NewsExplorer</h2>
            <button
              type="button"
              className="header__mobile-menu-close"
              onClick={handleMobileMenuClose}
              aria-label="Close menu"
            >
            </button>
          </div>
          <nav className="header__mobile-menu-nav">
            <Link to="/" onClick={handleMobileMenuClose}>
              <button type="button" className="header__mobile-menu-home">
                Home
              </button>
            </Link>
            <button
              type="button"
              className="header__mobile-menu-signin"
              onClick={handleMobileSignin}
            >
              Sign in
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
