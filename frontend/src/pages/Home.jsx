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
      <section className="home-hero">
  <div className="home-hero-pattern" />

  <div className="home-hero-orb home-hero-orb-one" />
  <div className="home-hero-orb home-hero-orb-two" />

  <div className="home-shell">
    <div className="home-hero-copy">
      

      <h1>
        Discover products
        <span>made to fit your taste.</span>
      </h1>

      <p>
        ShopGen AI turns your product browsing into a
        personalized shopping experience with smart
        recommendations and clear AI explanations.
      </p>

      <div className="home-hero-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={() => navigate("/products")}
        >
          Explore products
          <span>→</span>
        </button>

        <button
          type="button"
          className="button button-light"
          onClick={handleAiClick}
        >
          <span>✦</span>
          Ask ShopGen AI
        </button>
      </div>

      <div className="home-trust-row">
        <div>
          <strong>Smart</strong>
          <span>discovery</span>
        </div>

        <div>
          <strong>Personalized</strong>
          <span>recommendations</span>
        </div>

        <div>
          <strong>AI</strong>
          <span>explanations</span>
        </div>
      </div>
    </div>

    <div className="home-hero-cart" aria-hidden="true">
      <div className="home-cart-glow" />

      <img
        src="/shopping-cart.png"
        alt=""
        className="home-cart-image"
      />
    </div>
  </div>
</section>
      

      <section className="home-section">
        <div className="content-shell">
          <div className="section-intro">
            <div>
              <span className="section-kicker">
                WHY SHOPGEN AI
              </span>

              <h2>
                Everything you need for a{" "}
                <span>
                  smarter shopping journey.
                </span>
              </h2>
            </div>

            <p>
              A focused ecommerce experience built around
              product discovery user activity and
              personalized recommendations.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card feature-card-featured">
              <span className="feature-index">
                01
              </span>

              <div className="feature-icon">
                ⌕
              </div>

              <h3>
                Discover faster
              </h3>

              <p>
                Search and browse the catalogue with
                clean categories and quick access to
                product details.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  navigate("/products")
                }
              >
                Explore catalogue →
              </button>
            </article>

            <article className="feature-card">
              <span className="feature-index">
                02
              </span>

              <div className="feature-icon feature-icon-soft">
                ♡
              </div>

              <h3>
                Learn your taste
              </h3>

              <p>
                Product views become preference signals
                that help the recommendation engine
                personalize results.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={handleAiClick}
              >
                Personalize with AI →
              </button>
            </article>

            <article className="feature-card">
              <span className="feature-index">
                03
              </span>

              <div className="feature-icon feature-icon-dark">
                AI
              </div>

              <h3>
                Understand the result
              </h3>

              <p>
                See an AI generated explanation so your
                recommendations feel clear instead of
                random.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={handleAiClick}
              >
                See recommendations →
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="home-how">
        <div className="content-shell">
          <div className="section-intro section-intro-dark">
            <div>
              <span className="section-kicker">
                HOW IT WORKS
              </span>

              <h2>
                Simple inputs.{" "}
                <span>
                  Useful recommendations.
                </span>
              </h2>
            </div>

            <p>
              Browse products first. ShopGen AI then uses
              your activity to produce a more relevant
              product shortlist.
            </p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span>01</span>
              <h3>Browse</h3>
              <p>
                Explore products and find items that
                catch your attention.
              </p>
            </article>

            <article className="step-card">
              <span>02</span>
              <h3>Interact</h3>
              <p>
                Your authenticated product views create
                useful signals.
              </p>
            </article>

            <article className="step-card">
              <span>03</span>
              <h3>Personalize</h3>
              <p>
                The recommendation engine identifies
                relevant categories.
              </p>
            </article>

            <article className="step-card">
              <span>04</span>
              <h3>Discover</h3>
              <p>
                Return to see curated picks with an AI
                generated reason.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-final-cta">
        <div className="content-shell final-cta-inner">
          <div>
            <span className="section-kicker section-kicker-light">
              YOUR PERSONAL SHOPPING ASSISTANT
            </span>

            <h2>
              Your next favourite product could be one
              click away.
            </h2>

            <p>
              Start with the catalogue then let ShopGen AI
              take it from there.
            </p>
          </div>

          <div className="final-cta-actions">
            <button
              type="button"
              className="button button-white"
              onClick={() =>
                navigate("/products")
              }
            >
              Explore products →
            </button>

            <button
              type="button"
              className="button button-outline-light"
              onClick={handleAiClick}
            >
              ✦ Get AI recommendations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;