import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  fetchRecommendationSearch,
  fetchRecommendations,
} from "../services/api";

import "./RecommendationSearch.css";


function Recommendations() {
  const navigate =
    useNavigate();

  const {
    user,
  } = useAuth();

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    searchedQuery,
    setSearchedQuery,
  ] = useState("");

  const [
    recommendationData,
    setRecommendationData,
  ] = useState({
    reason: "",
    products: [],
  });

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    searching,
    setSearching,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");


  const loadRecommendations =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");
        setSearchedQuery("");

        const data =
          await fetchRecommendations();

        setRecommendationData({
          reason:
            data?.reason ||
            "These products were selected for you.",
          products:
            Array.isArray(
              data?.products
            )
              ? data.products
              : [],
        });
      } catch (requestError) {
        console.error(
          requestError
        );

        setError(
          "We could not load recommendations right now."
        );
      } finally {
        setLoading(false);
      }
    }, []);


  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);


  const handleSearch =
    async (event) => {
      event.preventDefault();

      const query =
        searchQuery.trim();

      if (!query) {
        return;
      }

      try {
        setSearching(true);
        setError("");

        const data =
          await fetchRecommendationSearch(
            query
          );

        setRecommendationData({
          reason:
            data?.reason ||
            "These products match your request.",
          products:
            Array.isArray(
              data?.products
            )
              ? data.products
              : [],
        });

        setSearchedQuery(
          query
        );
      } catch (requestError) {
        console.error(
          requestError
        );

        setError(
          "We could not understand that request. Try another search."
        );
      } finally {
        setSearching(false);
      }
    };


  const handleExampleSearch =
    (query) => {
      setSearchQuery(query);

      setTimeout(() => {
        document
          .getElementById(
            "ai-recommendation-search"
          )
          ?.focus();
      }, 0);
    };


  const handleReset =
    async () => {
      setSearchQuery("");

      await loadRecommendations();
    };


  return (
    <div className="ai-recommendation-page">

      <section className="ai-recommendation-hero">

        <div className="ai-hero-background">
          <span className="ai-glow ai-glow-one" />
          <span className="ai-glow ai-glow-two" />
          <span className="ai-grid-pattern" />
        </div>

        <div className="ai-hero-content">

          

          <p className="ai-welcome">
            Welcome back,{" "}
            {user?.username}
          </p>

          <h1>
            Tell us what
            <span>
              you want to buy.
            </span>
          </h1>

          <p className="ai-hero-description">
            Describe what you are looking for
            in normal language and ShopGen AI
            will find matching products from
            our catalog.
          </p>

          <form
            className="ai-search-form"
            onSubmit={handleSearch}
          >
            <div className="ai-search-box">

              <span className="ai-search-icon">
                ⌕
              </span>

              <input
                id="ai-recommendation-search"
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder="I want to buy headphones"
                autoComplete="off"
              />

              {searchQuery && (
                <button
                  type="button"
                  className="ai-clear-button"
                  onClick={() =>
                    setSearchQuery("")
                  }
                >
                  ×
                </button>
              )}

              <button
                type="submit"
                className="ai-search-button"
                disabled={
                  searching ||
                  !searchQuery.trim()
                }
              >
                {searching
                  ? "Searching..."
                  : "Ask AI"}
              </button>

            </div>
          </form>

          <div className="ai-example-row">

            <span>
              Try:
            </span>

            <button
              type="button"
              onClick={() =>
                handleExampleSearch(
                  "I want to buy headphones"
                )
              }
            >
              Headphones
            </button>

            <button
              type="button"
              onClick={() =>
                handleExampleSearch(
                  "I need running shoes"
                )
              }
            >
              Running shoes
            </button>

            <button
              type="button"
              onClick={() =>
                handleExampleSearch(
                  "I want a backpack"
                )
              }
            >
              Backpack
            </button>

            <button
              type="button"
              onClick={() =>
                handleExampleSearch(
                  "I need a smartwatch"
                )
              }
            >
              Smartwatch
            </button>

          </div>

        </div>
      </section>


      <main className="ai-results-container">

        <section className="ai-results-header">

          <div>

            <span className="ai-section-label">
              {searchedQuery
                ? "AI SEARCH RESULTS"
                : "PERSONALIZED FOR YOU"}
            </span>

            <h2>
              {searchedQuery
                ? `Results for "${searchedQuery}"`
                : "Your recommendations"}
            </h2>

            <p>
              {recommendationData.reason}
            </p>

          </div>

          {searchedQuery && (
            <button
              type="button"
              className="ai-reset-button"
              onClick={handleReset}
            >
              Back to recommendations
            </button>
          )}

        </section>


        {error && (
          <section className="ai-state-card">

            <div className="ai-state-icon">
              !
            </div>

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={
                loadRecommendations
              }
            >
              Try again
            </button>

          </section>
        )}


        {(loading || searching) && (
          <section className="ai-product-grid">

            {Array.from({
              length: 6,
            }).map((_, index) => (
              <article
                className="ai-product-card ai-skeleton-card"
                key={index}
              >
                <div className="ai-skeleton-image" />

                <div className="ai-card-content">

                  <div className="ai-skeleton-line small" />
                  <div className="ai-skeleton-line" />
                  <div className="ai-skeleton-line medium" />
                  <div className="ai-skeleton-button" />

                </div>
              </article>
            ))}

          </section>
        )}


        {!loading &&
          !searching &&
          !error &&
          recommendationData.products.length === 0 && (
            <section className="ai-empty-card">

              <div className="ai-empty-icon">
                ✦
              </div>

              <h3>
                No matching products found
              </h3>

              <p>
                Try describing the product
                in a different way.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSearchQuery("")
                }
              >
                Try another search
              </button>

            </section>
          )}


        {!loading &&
          !searching &&
          !error &&
          recommendationData.products.length > 0 && (
            <section className="ai-product-grid">

              {recommendationData.products.map(
                (product, index) => (
                  <article
                    className="ai-product-card"
                    key={product.id}
                  >

                    <div className="ai-product-image-wrapper">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="ai-product-image"
                        loading="lazy"
                      />

                      <span className="ai-pick-badge">
                        AI PICK {index + 1}
                      </span>

                    </div>


                    <div className="ai-card-content">

                      <span className="ai-product-category">
                        {product.category}
                      </span>

                      <button
                        type="button"
                        className="ai-product-title"
                        onClick={() =>
                          navigate(
                            `/products/${product.id}`
                          )
                        }
                      >
                        {product.title}
                      </button>


                      <div className="ai-product-rating">

                        <span className="ai-stars">
                          ★★★★★
                        </span>

                        <strong>
                          {product.rating}
                        </strong>

                        <span>
                          ({product.rating_count})
                        </span>

                      </div>


                      <p className="ai-product-description">
                        {product.description}
                      </p>


                      <div className="ai-product-bottom">

                        <span className="ai-product-price">
                          $
                          {Number(
                            product.price
                          ).toFixed(2)}
                        </span>

                        <button
                          type="button"
                          className="ai-view-button"
                          onClick={() =>
                            navigate(
                              `/products/${product.id}`
                            )
                          }
                        >
                          View product
                          <span>
                            ↗
                          </span>
                        </button>

                      </div>

                    </div>

                  </article>
                )
              )}

            </section>
          )}


        <section className="ai-how-it-works">

          <div className="ai-how-label">
            HOW IT WORKS
          </div>

          <h2>
            Shopping does not need
            to be complicated.
          </h2>

          <div className="ai-steps">

            <div className="ai-step">

              <div className="ai-step-number">
                01
              </div>

              <div>
                <h3>
                  Tell us what you need
                </h3>

                <p>
                  Type your request naturally.
                  You do not need to search
                  using exact product names.
                </p>
              </div>

            </div>


            <div className="ai-step">

              <div className="ai-step-number">
                02
              </div>

              <div>
                <h3>
                  ShopGen finds matches
                </h3>

                <p>
                  Your request is compared
                  with products in the ShopGen
                  catalog.
                </p>
              </div>

            </div>


            <div className="ai-step">

              <div className="ai-step-number">
                03
              </div>

              <div>
                <h3>
                  Explore your picks
                </h3>

                <p>
                  Open the products that look
                  right for you and continue
                  shopping.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}


export default Recommendations;