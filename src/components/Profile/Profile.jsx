import "./Profile.css";
import ArticlesSection from "../ArticlesSection/ArticlesSection";

function Profile({
  newsData,
  handleArticleLike,
  currentUser,
  handleArticleClick
}) {
  const savedCount = newsData.length;

  const keywords = [...new Set(newsData.map((a) => a.keyword).filter(Boolean))];
  const mainKeywords = keywords.slice(0, 3);
  const remainingCount = Math.max(keywords.length - 3, 0);

  const renderKeywords = () => {
    if (keywords.length === 0) return null;
    if (keywords.length <= 3) {
      return (
        <span className="saved-news-keywords-main">{keywords.join(", ")}</span>
      );
    }
    return (
      <>
        <span className="saved-news-keywords-main">
          {mainKeywords.join(", ")}
        </span>
        ,&nbsp;and&nbsp;
        <span className="saved-news-keywords-rest">
          {remainingCount} other
          {remainingCount > 1 ? "s" : ""}
        </span>
      </>
    );
  };

  return (
    <section className="saved-news">
      <div className="saved-news__info">
        <p className="saved-news__label">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser?.username || "You"}, you have {savedCount} saved articles
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:&nbsp;
            {renderKeywords()}
          </p>
        )}
      </div>

      <div className="saved-news__content">
        <ArticlesSection
          newsData={newsData}
          handleArticleLike={handleArticleLike}
          handleArticleClick={handleArticleClick}
        />
      </div>
    </section>
  );
}

export default Profile;
