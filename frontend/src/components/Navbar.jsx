import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-mark">S</span>
          ShopGen AI
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/products">Products</NavLink>

          <NavLink to="/recommendations">AI Recommendations</NavLink>
        </div>

        <div className="nav-actions">
          <Link to="/recommendations" className="nav-ai-button">
            Ask AI
          </Link>

          {user ? (
            <>
              <span className="user-badge">Hi, {user.username}</span>
              <button type="button" className="secondary-button small-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="secondary-button small-button">
                Login
              </Link>
              <Link to="/register" className="primary-button small-button">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;