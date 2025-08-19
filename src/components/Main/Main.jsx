import "./Main.css";

function Main() {
  return (
    <main className="main">
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
