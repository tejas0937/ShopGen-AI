import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          ShopGen AI
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/recommendations">AI Recommendations</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;