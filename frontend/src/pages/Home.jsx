import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ GENERATIVE AI ECOMMERCE
          </div>

          <h1>
            Find Products
            <br />
            <span>You'll Love.</span>
          </h1>

          <p className="hero-description">
            ShopGen AI helps you discover the right products
            using intelligent recommendations and Generative AI.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="primary-button"
            >
              Explore Products →
            </Link>

            <Link
              to="/recommendations"
              className="secondary-button"
            >
              ✦ Ask ShopGen AI
            </Link>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="features-section">

        <div className="section-heading">
          <p>WHY SHOPGEN AI?</p>

          <h2>
            Shopping made smarter.
          </h2>
        </div>

        <div className="features">

          <div className="feature-card">

            <div className="feature-number">
              01
            </div>

            <h3>
              Smart Recommendations
            </h3>

            <p>
              Get product suggestions based on your
              requirements, preferences and budget.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <h3>
              Easy Product Search
            </h3>

            <p>
              Browse, search and filter products
              through a simple ecommerce interface.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <h3>
              Generative AI
            </h3>

            <p>
              AI explains why selected products
              are suitable for your requirements.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta-section">

        <p>READY TO FIND YOUR PRODUCT?</p>

        <h2>
          Tell ShopGen AI what you need.
        </h2>

        <Link
          to="/recommendations"
          className="primary-button"
        >
          Get AI Recommendations →
        </Link>

      </section>

    </div>
  );
}

export default Home;