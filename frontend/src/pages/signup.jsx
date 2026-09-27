import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./pages.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        name,
        email,
        password,
        branch,
        year,
      });

      console.log("Signup successful: ", response.data);
    } catch (error) {
      console.log("Signup failed: ", error);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-logo" aria-hidden="true">
            C
          </div>
          <h1>Join your campus community</h1>
          <p>
            Create an account to connect with classmates, explore clubs, and never miss an event.
          </p>
          <ul className="auth-features">
            <li>
              <span className="auth-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              Build your student profile
            </li>
            <li>
              <span className="auth-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </span>
              Chat with your floor & block
            </li>
            <li>
              <span className="auth-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              Discover clubs & events
            </li>
          </ul>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="auth-card">
          <header className="auth-card-header">
            <span className="page-eyebrow">Get started</span>
            <h2 className="auth-card-title">Create your account</h2>
            <p className="auth-card-subtitle">
              Fill in your details to join Campus Connect.
            </p>
          </header>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="form-field">
              <label className="form-label" htmlFor="signup-name">
                Full name
              </label>
              <input
                id="signup-name"
                className="form-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                className="form-input"
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                className="form-input"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="signup-branch">
                  Branch
                </label>
                <input
                  id="signup-branch"
                  className="form-input"
                  type="text"
                  placeholder="e.g. CSE"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="signup-year">
                  Year
                </label>
                <input
                  id="signup-year"
                  className="form-input"
                  type="number"
                  placeholder="e.g. 2"
                  min="1"
                  max="5"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </form>

          <div className="auth-divider">or</div>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
