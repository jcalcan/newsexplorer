import { useContext, useState } from "react";
import AppContext from "../../contexts/Appcontexts";
import "./ItemCard.css";

function ItemCard({ item /*onCardClick, handleCardLike*/ }) {
  const { isLoggedIn, currentUser } = useContext(AppContext);
  const [showSignInNotice, setShowSignInNotice] = useState(false);


  //   function handleLike() {
  //     handleCardLike({
  //       id: item._id,
  //       isLiked: item.likes.some((id) => id === currentUser._id)
  //     });
  //   }

  //   function handleImageClick() {
  //     onCardClick(item);
  //   }

  const handleBookmarkMouseEnter = () => {
    if (!isLoggedIn) {
      setShowSignInNotice(true);
    }
  };

  const handleBookmarkMouseLeave = () => {
    setShowSignInNotice(false);
  };

  return (
    <li className="itemCard">
      <div className="itemCard__image-container">
        <img
          className="itemCard-img"
          src={item.urlToImage}
          alt={item.description}
        />
        {!isLoggedIn && (
          <button
            type="button"
            className="itemCard-sigin-notice-btn"
            style={{ visibility: showSignInNotice ? "visible" : "hidden" }}
          >
            Sign in to save articles
          </button>
        )}
        <button
          type="button"
          className="itemCard-bookmark-btn"
          onMouseEnter={handleBookmarkMouseEnter}
          onMouseLeave={handleBookmarkMouseLeave}
        ></button>
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
        <p className="itemCard-source">{item.source.name}</p>
      </div>
    </li>
  );
}

export default ItemCard;
