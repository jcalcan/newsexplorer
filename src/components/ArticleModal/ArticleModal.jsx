import "./ArticleModal.css";
import { useLocation } from "react-router-dom";

function ArticleModal({ isOpen, article, onClose, handleArticleLike }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  if (!article) return null;

  const cleanText = (text) => {
    if (!text) return "";
    // Remove HTML tags
    let cleaned = text.replace(/<[^>]*>?/gm, "");
    // Remove the [+XXXX chars] suffix found in NewsAPI content
    cleaned = cleaned.replace(/\s*\[\+\d+\s+chars\]/gi, "");
    return cleaned;
  };

  const handleLike = (e) => {
    e.stopPropagation();
    handleArticleLike({
      id: isSavedNews ? article._id : article.url,
      isLiked: isSavedNews || article.isLiked || false,
      article: article,
    });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container article-modal">
        <button
          className="article-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        />
        <img
          className="article-modal__image"
          src={article.urlToImage || article.image}
          alt={article.title}
        />
        <div className="article-modal__content">
          <div className="article-modal__header">
            <p className="article-modal__date">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <button
              type="button"
              className={`article-modal__action-btn ${
                isSavedNews ? "article-modal__action-btn_type_trash" : ""
              } ${article.isLiked ? "article-modal__action-btn_type_liked" : ""}`}
              onClick={handleLike}
              title={isSavedNews ? "Remove" : "Save"}
            />
          </div>
          <h2 className="article-modal__title">{article.title}</h2>
          <p className="article-modal__text">
            {cleanText(article.content || article.description)}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="article-modal__link"
          >
            Read more at {article.source?.name || article.source}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;

