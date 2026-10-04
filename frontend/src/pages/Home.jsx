import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();

  const {
    user,
    requestLoginPrompt,
  } = useAuth();

  const handleAiClick = () => {
    if (!user) {
      requestLoginPrompt();
      return;
    }

    navigate("/recommendations");
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />

        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        <div className="hero-decoration hero-decoration-three" />

        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span>
            GENERATIVE AI ECOMMERCE
          </div>

          <h1>
            Find products
            <br />
            <span>that feel right.</span>
          </h1>

          <p className="hero-description">
            ShopGen AI combines intelligent product discovery
            with personalized recommendations so you can shop
            with less searching and more confidence.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/products")}
            >
              Explore Products
              <span>→</span>
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleAiClick}
            >
              <span>✦</span>
              Ask ShopGen AI
            </button>
          </div>

          <div className="hero-proof">
            <div>
              <span className="proof-icon">✓</span>
              <strong>Smart</strong>
              discovery
            </div>

            <div>
              <span className="proof-icon">✓</span>
              <strong>Personalized</strong>
              recommendations
            </div>

            <div>
              <span className="proof-icon">✓</span>
              <strong>AI</strong>
              powered insights
            </div>
          </div>
        </div>

        {/* Floating AI Card */}
        <div className="hero-floating-card hero-card-one">
          <span className="floating-icon">✦</span>

          <div>
            <strong>AI Pick</strong>
            <small>Personalized for you</small>
          </div>
        </div>

        <div className="hero-floating-card hero-card-two">
          <span className="floating-rating">★</span>

          <div>
            <strong>4.8</strong>
            <small>Top rated</small>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <div className="stats-container">
          <div className="stat-item">
            <strong>AI</strong>
            <span>Powered recommendations</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>6+</strong>
            <span>Personalized product picks</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>24/7</strong>
            <span>Smart shopping assistant</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <strong>1</strong>
            <span>Simple shopping experience</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-heading">
          <span className="section-eyebrow">
            WHY SHOPGEN AI
          </span>

          <h2>
            Shopping that
            <span> adapts to you.</span>
          </h2>

          <p>
            Explore products normally or let artificial
            intelligence help you discover what comes next.
          </p>
        </div>

        <div className="features">
          <article className="feature-card feature-card-primary">
            <div className="feature-top">
              <span className="feature-number">
                01
              </span>

              <span className="feature-arrow">
                ↗
              </span>
            </div>

            <div className="feature-icon">
              ⌕
            </div>

            <h3>
              Discover faster
            </h3>

            <p>
              Browse a clean product catalogue with
              search, categories and sorting designed
              for quick discovery.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="feature-link"
            >
              Explore catalogue →
            </button>
          </article>

          <article className="feature-card">
            <div className="feature-top">
              <span className="feature-number">
                02
              </span>

              <span className="feature-arrow">
                ↗
              </span>
            </div>

            <div className="feature-icon feature-icon-green">
              ♡
            </div>

            <h3>
              Learn your taste
            </h3>

            <p>
              Your product interactions become useful
              signals that help ShopGen understand
              what you are interested in.
            </p>

            <button
              type="button"
              onClick={handleAiClick}
              className="feature-link"
            >
              Personalize →
            </button>
          </article>

          <article className="feature-card">
            <div className="feature-top">
              <span className="feature-number">
                03
              </span>

              <span className="feature-arrow">
                ↗
              </span>
            </div>

            <div className="feature-icon feature-icon-dark">
              AI
            </div>

            <h3>
              Understand why
            </h3>

            <p>
              AI generated explanations help you
              understand why a product has been
              recommended.
            </p>

            <button
              type="button"
              onClick={handleAiClick}
              className="feature-link"
            >
              Ask ShopGen AI →
            </button>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="how-header">
          <span className="section-eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            From browsing
            <br />
            to <span>better recommendations.</span>
          </h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">
              01
            </div>

            <div className="step-line" />

            <h3>
              Browse
            </h3>

            <p>
              Explore products and discover what
              catches your attention.
            </p>
          </div>

          <div className="step">
            <div className="step-number">
              02
            </div>

            <div className="step-line" />

            <h3>
              Interact
            </h3>

            <p>
              Your product views create preference
              signals for the recommendation engine.
            </p>
          </div>

          <div className="step">
            <div className="step-number">
              03
            </div>

            <div className="step-line" />

            <h3>
              Personalize
            </h3>

            <p>
              ShopGen AI identifies relevant categories
              and products for your next visit.
            </p>
          </div>

          <div className="step">
            <div className="step-number">
              04
            </div>

            <h3>
              Discover
            </h3>

            <p>
              Get a curated set of recommendations
              with an AI generated explanation.
            </p>
          </div>
        </div>
      </section>

      {/* AI CTA */}
      <section className="cta-section">
        <div className="cta-glow" />

        <div className="cta-decoration cta-decoration-one" />
        <div className="cta-decoration cta-decoration-two" />

        <div className="cta-content">
          <span className="cta-label">
            ✦ YOUR PERSONAL SHOPPING ASSISTANT
          </span>

          <h2>
            Your next favourite
            <span> product is waiting.</span>
          </h2>

          <p>
            Explore the catalogue and let ShopGen AI
            help you find products worth discovering.
          </p>

          <div className="cta-buttons">
            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/products")}
            >
              Explore Products →
            </button>

            <button
              type="button"
              className="cta-secondary-button"
              onClick={handleAiClick}
            >
              ✦ Get AI Recommendations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;