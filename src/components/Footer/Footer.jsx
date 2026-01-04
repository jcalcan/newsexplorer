import { Link } from "react-router-dom";
import "./Footer.css";
import Gh_logo from "../../assets/github.svg?react";
import Fb_logo from "../../assets/fb.svg?react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <nav className="footer__nav">
          <Link to="/" className="footer__home-btn">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__tripleten-btn"
          >
            TripleTen
          </a>
        </nav>
      </div>

      <div className="footer__icons">
        <a
          href="https://github.com/jcalcan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Gh_logo className="footer__gh-logo" alt="Github" />
        </a>
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Fb_logo className="footer__fb-logo" alt="Facebook" />
        </a>
      </div>
      <div className="footer__bottom-container">
        <p className="footer__title">© 2025 Supersite, Powered by News API</p>
      </div>
    </footer>
  );
}

export default Footer;
