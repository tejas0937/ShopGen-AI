import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <p className="hero-label">GENERATIVE AI ECOMMERCE</p>

        <h1>
          Find Products
          <br />
          You'll Love.
        </h1>

        <p className="hero-description">
          ShopGen AI helps you discover products using
          intelligent recommendations powered by Generative AI.
        </p>

        <div className="hero-buttons">
          <Link to="/products" className="primary-button">
            Explore Products
          </Link>

          <Link to="/recommendations" className="secondary-button">
            Ask AI
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Smart Recommendations</h3>
          <p>
            Get product suggestions based on your requirements.
          </p>
        </div>

        <div className="feature-card">
          <h3>Easy Product Search</h3>
          <p>
            Search and filter products quickly.
          </p>
        </div>

        <div className="feature-card">
          <h3>AI Powered</h3>
          <p>
            Generative AI provides helpful shopping explanations.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;