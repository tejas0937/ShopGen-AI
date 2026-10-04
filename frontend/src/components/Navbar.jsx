import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

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
    <header className="site-header">
      <nav
        className="navbar"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          <Link
            to="/"
            className="brand"
          >
            <span className="brand-mark">
              S
            </span>

            <span className="brand-name">
              ShopGen <strong>AI</strong>
            </span>
          </Link>

          <div className="nav-links">
            <NavLink to="/" end>
              Home
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>

            <a
              href="/recommendations"
              onClick={handleAiNavigation}
            >
              AI Recommendations
            </a>
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-ai-button"
              onClick={handleAiNavigation}
            >
              <span>✦</span>
              Ask AI
            </button>

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

                <span className="user-name">
                  {user.username}
                </span>

                <button
                  type="button"
                  className="nav-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="nav-auth">
                <Link
                  to="/login"
                  className="nav-login"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="nav-register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;