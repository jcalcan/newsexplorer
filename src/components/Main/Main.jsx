import { useState } from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";

function Main({ newsData }) {
  const [showAllCards, setShowAllCards] = useState(false);

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
        <h2 className="news-cards__heading">Search results</h2>
        <ul className="news-cards__list">
          {cardsToShow.map((item) => {
            return (
              <ItemCard
                key={item.url}
                item={item}
                //TODO
                // onCardClick={handleCardClick}
                // handleCardLike={handleCardLike}
              />
            );
          })}
        </ul>
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

      <section className="about-author">
        <div className="about-author__image-container">
          <div className="about-author__image-placeholder"></div>
        </div>
        <div className="about-author__content">
          <h2 className="about-author__title">About the author</h2>
          <p className="about-author__description">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about-author__description">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Main;
