import "./Header.css";

function Header() {
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

  function handleSearch(e) {
    e.preventDefault();
    // Handle search functionality
    console.log("Search clicked");
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__title">NewsExplorer</div>
        <div className="header__nav-buttons">
          <button type="button" className="header__home-btn" onClick={handleClick}>
            Home
          </button>
          <button
            type="button"
            className="header__signin-btn"
            onClick={handleSignin}
          >
            Sign in
          </button>
        </div>
      </nav>
      
      <section className="header__main-headline">
        <h1 className="header__main-headline__text">What's going on in the world?</h1>
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
    </header>
  );
}

export default Header;
