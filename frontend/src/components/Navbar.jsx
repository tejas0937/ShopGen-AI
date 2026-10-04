import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    isLoading,
    logout,
    requestLoginPrompt,
  } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleAiNavigation = (event) => {
    event.preventDefault();

    if (!user) {
      requestLoginPrompt();
      return;
    }

    navigate("/recommendations");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="logo"
        >
          <span className="logo-mark">
            S
          </span>

          <span>
            ShopGen <strong>AI</strong>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink
            to="/recommendations"
            onClick={handleAiNavigation}
          >
            AI Recommendations
          </NavLink>
        </div>

        <div className="nav-actions">
          <a
            href="/recommendations"
            className="nav-ai-button"
            onClick={handleAiNavigation}
          >
            <span>✦</span>
            Ask AI
          </a>

          {isLoading ? (
            <span
              className="nav-loading"
              aria-label="Checking login"
            />
          ) : user ? (
            <div className="nav-user">
              <span className="user-avatar">
                {user.username
                  ?.slice(0, 1)
                  .toUpperCase()}
              </span>

              <span className="user-badge">
                Hi, {user.username}
              </span>

              <button
                type="button"
                className="secondary-button small-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link
                to="/login"
                className="secondary-button small-button"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="primary-button small-button"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;