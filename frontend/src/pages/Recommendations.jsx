import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { fetchRecommendations } from "../services/api";

import "./ShopPages.css";
import "../styles/recommendations.css";

function Recommendations() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [recommendationData, setRecommendationData] =
    useState({
      reason: "",
      products: [],
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecommendations = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchRecommendations();

        setRecommendationData({
          reason:
            data?.reason ||
            "These products were selected for you.",
          products: Array.isArray(data?.products)
            ? data.products
            : [],
        });
      } catch (requestError) {
        console.error(requestError);

        setError(
          "We could not generate recommendations right now."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  return (
    <div className="recommendations-page">
      <section className="recommendations-hero">
        <div className="recommendation-hero-glow" />
        <div className="recommendation-orbit orbit-one" />
        <div className="recommendation-orbit orbit-two" />

        <div className="hero-content">
          <span className="recommendations-label">
            ✦ AI SHOPPING ASSISTANT
          </span>

          <p className="recommendations-greeting">
            Welcome back, {user?.username}
          </p>

          <h1>
            Recommendations
            <span>with a reason.</span>
          </h1>

          <p>
            ShopGen AI learns from your product views
            and combines them with catalog signals to
            discover products worth exploring next.
          </p>
        </div>

        <div className="ai-orb-main">
          <div className="ai-orb-core">
            ✦
          </div>

          <span>Gemini AI</span>
        </div>
      </section>

      <main className="recommendation-content">
        <section className="recommendation-reason">
          <div className="reason-icon">
            ✦
          </div>

          <div>
            <span className="reason-title">
              Why these products?
            </span>

            <p>
              {recommendationData.reason}
            </p>
          </div>
        </section>

        <section className="recommendations-section-header">
          <div>
            <span className="section-label">
              CURATED FOR YOU
            </span>

            <h2>
              Your next discoveries
            </h2>

            <p>
              Personalized using your ShopGen activity.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={loadRecommendations}
            disabled={loading}
          >
            {loading
              ? "Thinking..."
              : "↻ Refresh"}
          </button>
        </section>

        {loading && (
          <div className="recommendation-grid">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  className="recommendation-card skeleton-card"
                  key={index}
                >
                  <div className="skeleton skeleton-image" />

                  <div className="recommendation-card-content">
                    <div className="skeleton skeleton-line small" />
                    <div className="skeleton skeleton-line" />
                    <div className="skeleton skeleton-line medium" />
                    <div className="skeleton skeleton-button" />
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {!loading && error && (
          <div className="recommendations-state">
            <div className="state-icon">
              !
            </div>

            <h2>
              Recommendation engine unavailable
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={loadRecommendations}
            >
              Try again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          recommendationData.products.length === 0 && (
            <div className="recommendations-empty">
              <div className="empty-icon">
                ✦
              </div>

              <h2>
                Your recommendations are warming up
              </h2>

              <p>
                Browse a few products first.
                ShopGen AI will use those interactions
                to personalize your recommendations.
              </p>

              <button
                type="button"
                className="browse-products-button"
                onClick={() => navigate("/products")}
              >
                Explore products →
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          recommendationData.products.length > 0 && (
            <div className="recommendation-grid">
              {recommendationData.products.map(
                (product, index) => (
                  <article
                    className="recommendation-card"
                    key={product.id}
                  >
                    <div className="recommendation-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="recommendation-image"
                        loading="lazy"
                      />

                      <span className="ai-badge">
                        AI PICK {index + 1}
                      </span>
                    </div>

                    <div className="recommendation-card-content">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <button
                        type="button"
                        className="recommendation-title"
                        onClick={() =>
                          navigate(
                            `/products/${product.id}`
                          )
                        }
                      >
                        {product.title}
                      </button>

                      <div className="recommendation-rating">
                        <span className="stars">
                          ★★★★★
                        </span>

                        <strong>
                          {product.rating}
                        </strong>

                        <span className="rating-count">
                          ({product.rating_count})
                        </span>
                      </div>

                      <div className="recommendation-bottom">
                        <span className="recommendation-price">
                          ${Number(product.price).toFixed(2)}
                        </span>

                        <button
                          type="button"
                          className="view-product-button"
                          onClick={() =>
                            navigate(
                              `/products/${product.id}`
                            )
                          }
                        >
                          Explore ↗
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          )}

        <section className="recommendations-cta">
          <div>
            <span className="cta-label">
              KEEP EXPLORING
            </span>

            <h2>
              Your next product view can improve
              the next recommendation.
            </h2>

            <p>
              Browse the catalog and return to see
              how your personalized results change.
            </p>
          </div>

          <button
            type="button"
            className="cta-button"
            onClick={() => navigate("/products")}
          >
            Explore catalog →
          </button>
        </section>
      </main>
    </div>
  );
}

export default Recommendations;