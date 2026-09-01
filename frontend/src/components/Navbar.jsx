import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          <span className="logo-mark">S</span>
          ShopGen AI
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/recommendations">
            AI Recommendations
          </NavLink>
        </div>

        <Link
          to="/recommendations"
          className="nav-ai-button"
        >
          Ask AI
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;