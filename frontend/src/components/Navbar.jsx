import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/pages.css";

function Navbar() {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => ({
    isLoggedIn: Boolean(localStorage.getItem("authToken")),
    name: localStorage.getItem("userName") || "Student",
  }));

  useEffect(() => {
    const syncUser = () => {
      setUser({
        isLoggedIn: Boolean(localStorage.getItem("authToken")),
        name: localStorage.getItem("userName") || "Student",
      });
    };

    window.addEventListener("campusconnect:auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("campusconnect:auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsProfileMenuOpen(false);
    window.dispatchEvent(new Event("campusconnect:auth-change"));
    navigate("/");
  };

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="site-brand" to="/" aria-label="CampusConnect home">
          <span className="site-brand-mark" aria-hidden="true">C</span>
          <span>
            Campus<span>Connect</span>
          </span>
        </Link>

        <div className="site-nav-links">
          <Link to="/clubs">Clubs</Link>
          <Link to="/events">Events</Link>
          <Link to="/chatrooms">Chatrooms</Link>
        </div>

        <div className="site-nav-actions">
          {user.isLoggedIn ? (
            <div className="site-user">
              <span className="site-user-name">{user.name}</span>
              <div className="site-profile-menu-wrap">
                <button
                  className="site-profile-icon"
                  type="button"
                  aria-label="Profile menu"
                  aria-expanded={isProfileMenuOpen}
                  aria-controls="site-profile-menu"
                  onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20a7 7 0 0 1 14 0" />
                  </svg>
                </button>
                {isProfileMenuOpen && (
                  <div className="site-profile-menu" id="site-profile-menu">
                    <button type="button" onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link className="site-login-link" to="/login">Log in</Link>
              <Link className="btn btn-primary site-nav-cta" to="/signup">
                Join CampusConnect
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
