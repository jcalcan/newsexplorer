import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../contexts/Appcontexts";
import "./ItemCard.css";

function ItemCard({
  item,
  handleArticleLike,
  handleLoginClick,
  onCardClick
}) {
  const { isLoggedIn, currentUser } = useContext(AppContext);
  const [showNotice, setShowNotice] = useState(false);
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  function handleLike(e) {
    e.stopPropagation();
    handleArticleLike({
      id: isSavedNews ? item._id : item.url,
      isLiked: isSavedNews || item.isLiked || false,
      article: item
    });
  }

  const handleMouseEnter = () => {
    if (!isLoggedIn || isSavedNews) {
      setShowNotice(true);
    }
  };

  const handleMouseLeave = () => {
    setShowNotice(false);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="itemCard" onClick={handleCardClick}>
      <div className="itemCard__image-container">
        <img
          className="itemCard-img"
          src={item.urlToImage || item.image}
          alt={item.title}
        />

        {isSavedNews && <div className="itemCard__keyword">{item.keyword}</div>}

        {showNotice && (
          <div className="itemCard__notice">
            {isSavedNews ? "Remove from saved" : "Sign in to save articles"}
          </div>
        )}

        <button
          type="button"
          className={`itemCard__action-btn ${
            isSavedNews ? "itemCard__action-btn_type_trash" : ""
          } ${item.isLiked ? "itemCard__action-btn_type_liked" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleLike}
        />
      </div>
      <div className="itemCard__content">
        <p className="itemCard-date">
          {new Date(item.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
        </p>
        <h2 className="itemCard-title">{item.title}</h2>
        <p className="itemCard-description">{item.description}</p>
        <p className="itemCard-source">{item.source?.name || item.source}</p>
      </div>
    </li>
  );
}

export default ItemCard;
