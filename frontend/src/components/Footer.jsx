import { Link } from "react-router-dom";
import "../pages/pages.css";

function Footer() {
  return (
    <footer className="site-footer">
      <Link className="site-brand" to="/" aria-label="CampusConnect home">
        <span className="site-brand-mark" aria-hidden="true">C</span>
        <span>
          Campus<span>Connect</span>
        </span>
      </Link>
      <span className="site-footer-tagline">Made for campus life.</span>
      <nav className="site-footer-links" aria-label="Footer navigation">
        <Link to="/clubs">Clubs</Link>
        <Link to="/events">Events</Link>
        <Link to="/login">Log in</Link>
      </nav>
    </footer>
  );
}

export default Footer;
