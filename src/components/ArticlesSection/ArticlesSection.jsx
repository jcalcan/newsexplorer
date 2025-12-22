import ItemCard from "../ItemCard/ItemCard";
import "./ArticlesSection.css";

function ArticlesSection({ newsData, handleArticleLike, handleArticleClick }) {
  return (
    <div className="articles-section">
      <ul className="articles-section__list">
        {newsData.map((item) => {
          return (
            <ItemCard
              key={item._id || item.url}
              item={item}
              handleArticleLike={handleArticleLike}
              onCardClick={handleArticleClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ArticlesSection;
