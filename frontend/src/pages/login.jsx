import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";

function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful", response.data);

      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      
    } catch (error) {
      console.error("Login unsuccesful: ", error);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-logo" aria-hidden="true">
            C
          </div>
          <h1>Welcome back to Campus Connect</h1>
          <p>
            Sign in to join chatrooms, discover clubs, and stay updated on campus events.
          </p>
          <ul className="auth-features">
            <li>
              <span className="auth-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </span>
              Floor & block chatrooms
            </li>
            <li>
              <span className="auth-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </span>
              Student clubs & societies
            </li>
            <li>
              <span className="auth-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              Upcoming campus events
            </li>
          </ul>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="auth-card">
          <header className="auth-card-header">
            <span className="page-eyebrow">Sign in</span>
            <h2 className="auth-card-title">Log in to your account</h2>
            <p className="auth-card-subtitle">
              Enter your credentials to access your campus dashboard.
            </p>
          </header>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-field">
              <label className="form-label" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                className="form-input"
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>

          <div className="auth-divider">or</div>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
