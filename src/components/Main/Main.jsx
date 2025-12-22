import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  newsData,
  handleArticleLike,
  handleLoginClick,
  handleArticleClick
}) {
  const [showAllCards, setShowAllCards] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleShowMoreClick = () => {
    setShowAllCards(!showAllCards);
  };

  // Determine how many cards to show
  const cardsToShow = showAllCards
    ? newsData.articles
    : newsData.articles.slice(0, 3);

  return (
    <main className="main">
      <section className="news-cards">
        {newsData.articles && newsData.articles.length > 0 && (
          <>
            <h2 className="news-cards__heading">Search results</h2>
            <ul className="news-cards__list">
              {cardsToShow.map((item) => {
                return (
                  <ItemCard
                    key={item.url}
                    item={item}
                    handleArticleLike={handleArticleLike}
                    handleLoginClick={handleLoginClick}
                    onCardClick={handleArticleClick}
                  />
                );
              })}
            </ul>
          </>
        )}
        {newsData.articles.length > 3 && (
          <button
            className="news-cards__show-more-btn"
            type="button"
            onClick={handleShowMoreClick}
          >
            {showAllCards ? "Show less" : "Show more"}
          </button>
        )}
      </section>
      {isHome && (
        <section className="about-author">
          <div className="about-author__image-container">
            <div className="about-author__image-placeholder"></div>
          </div>
          <div className="about-author__content">
            <h2 className="about-author__title">About the author</h2>
            <p className="about-author__description">
            Juan Alcantara is a dedicated software developer and cybersecurity professional based in Oak Creek, Wisconsin, 
            transitioning from 14+ years in logistics and transportation to full-stack web development. He is a quick learner and a team player.
            </p>
            <p className="about-author__description">
            Juan is pursuing a Bachelor's in Information Technology with a Cybersecurity focus at Arizona State University Online, 
            expected to graduate in 2027, building on prior studies at Milwaukee School of Engineering. 
            He completed the TripleTen Software Engineering Bootcamp, mastering the MERN stack, HTML/CSS, and Git for full-stack development.
            He is currently seeking opportunities to apply his skills in a dynamic team environment.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

export default Main;
