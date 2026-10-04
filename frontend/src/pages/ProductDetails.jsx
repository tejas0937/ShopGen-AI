import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  fetchProduct,
  trackInteraction,
} from "../services/api";

import "./ShopPages.css";

function ProductDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    user,
    requestLoginPrompt,
  } = useAuth();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data =
          await fetchProduct(id);

        setProduct(data);

        /*
         * Only authenticated users
         * should create interaction
         * records.
         */
        if (user) {
          try {
            await trackInteraction(
              id,
              "view"
            );
          } catch (
            interactionError
          ) {
            console.error(
              "Failed to track product view:",
              interactionError
            );
          }
        }
      } catch (requestError) {
        console.error(
          requestError
        );

        setError(
          "Product could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, user]);

  const handleSimilarProducts = () => {
    if (!user) {
      requestLoginPrompt();
      return;
    }

    navigate(
      `/recommendations?product=${product.id}`
    );
  };

  if (loading) {
    return (
      <div className="product-details-page-state">
        <div className="detail-loader" />

        <p>
          Loading product...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-page-state">
        <div className="state-icon">
          !
        </div>

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            navigate("/products")
          }
        >
          Back to products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page-state">
        <div className="state-icon">
          ?
        </div>

        <h2>
          Product not found
        </h2>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            navigate("/products")
          }
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      {/* BACK NAVIGATION */}
      <div className="product-details-topbar">
        <button
          type="button"
          className="back-link"
          onClick={() =>
            navigate("/products")
          }
        >
          <span>←</span>
          Back to products
        </button>

        <span className="detail-breadcrumb">
          Products
          <span>/</span>
          {product.category}
        </span>
      </div>

      {/* MAIN PRODUCT */}
      <main className="product-details-container">
        {/* PRODUCT IMAGE */}
        <section className="product-details-visual">
          <div className="detail-background-circle" />
          <div className="detail-background-circle-two" />

          <span className="detail-floating-label">
            SHOPGEN
            <strong>AI</strong>
          </span>

          <div className="detail-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="detail-product-image"
            />
          </div>

          <div className="detail-image-footer">
            <span>
              ✦ Product preview
            </span>

            <span>
              High quality image
            </span>
          </div>
        </section>

        {/* PRODUCT INFORMATION */}
        <section className="product-details-info">
          <div className="detail-category-row">
            <span className="detail-category">
              {product.category}
            </span>

            <span className="detail-product-id">
              PRODUCT #{product.id}
            </span>
          </div>

          <h1>
            {product.title}
          </h1>

          <div className="detail-rating">
            <div className="rating-stars">
              ★★★★★
            </div>

            <strong>
              {product.rating}
            </strong>

            <span>
              ({product.rating_count} ratings)
            </span>
          </div>

          <div className="detail-divider" />

          <div className="detail-price-block">
            <span className="detail-price-label">
              CURRENT PRICE
            </span>

            <strong className="detail-price">
              $
              {Number(
                product.price
              ).toFixed(2)}
            </strong>
          </div>

          <div className="detail-description-block">
            <span className="detail-section-label">
              ABOUT THIS PRODUCT
            </span>

            <p>
              {product.description}
            </p>
          </div>

          {/* AI RECOMMENDATION CARD */}
          <div className="detail-ai-card">
            <div className="detail-ai-icon">
              ✦
            </div>

            <div className="detail-ai-content">
              <span>
                SHOPGEN AI
              </span>

              <h3>
                Like this product?
              </h3>

              <p>
                Discover similar products
                selected using your shopping
                activity.
              </p>
            </div>

            <button
              type="button"
              onClick={
                handleSimilarProducts
              }
              className="detail-ai-button"
            >
              Find similar
              <span>→</span>
            </button>
          </div>

          {/* ACTIONS */}
          <div className="detail-actions">
            <button
              type="button"
              className="primary-button detail-main-button"
              onClick={
                handleSimilarProducts
              }
            >
              <span>✦</span>
              Get AI recommendations
            </button>

            <button
              type="button"
              className="secondary-button detail-main-button"
              onClick={() =>
                navigate("/products")
              }
            >
              Continue browsing
            </button>
          </div>

          {!user && (
            <div className="detail-login-hint">
              <span>ⓘ</span>

              <p>
                Login to track your product
                activity and unlock
                personalized recommendations.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* BOTTOM TRUST STRIP */}
      <section className="detail-benefits">
        <div>
          <span className="benefit-icon">
            ✦
          </span>

          <div>
            <strong>
              AI powered
            </strong>

            <small>
              Personalized discovery
            </small>
          </div>
        </div>

        <div>
          <span className="benefit-icon">
            ★
          </span>

          <div>
            <strong>
              Rated by shoppers
            </strong>

            <small>
              Based on product ratings
            </small>
          </div>
        </div>

        <div>
          <span className="benefit-icon">
            ♡
          </span>

          <div>
            <strong>
              Built around you
            </strong>

            <small>
              Recommendations improve
              with activity
            </small>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;