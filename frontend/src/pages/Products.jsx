import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { fetchProducts } from "../services/api";

import "./ShopPages.css";

function Products() {
  const navigate = useNavigate();

  const {
    user,
    requestLoginPrompt,
  } = useAuth();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("featured");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProducts();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (requestError) {
        console.error(requestError);

        setError(
          "Unable to load products right now."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const categoryValues = [
      ...new Set(
        products
          .map(
            (product) =>
              product.category
          )
          .filter(Boolean)
      ),
    ];

    return [
      "All",
      ...categoryValues,
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    const filtered =
      products.filter((product) => {
        const searchText = [
          product.title,
          product.description,
          product.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !normalizedSearch ||
          searchText.includes(
            normalizedSearch
          );

        const matchesCategory =
          selectedCategory === "All" ||
          product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      });

    return [...filtered].sort(
      (a, b) => {
        if (sortBy === "price-low") {
          return (
            Number(a.price) -
            Number(b.price)
          );
        }

        if (sortBy === "price-high") {
          return (
            Number(b.price) -
            Number(a.price)
          );
        }

        if (sortBy === "rating") {
          return (
            Number(b.rating) -
            Number(a.rating)
          );
        }

        return (
          Number(b.rating_count) -
          Number(a.rating_count)
        );
      }
    );
  }, [
    products,
    search,
    selectedCategory,
    sortBy,
  ]);

  const handleAiRecommendations = () => {
    if (!user) {
      requestLoginPrompt();
      return;
    }

    navigate("/recommendations");
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("featured");
  };

  return (
    <div className="shop-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-hero-grid" />

        <div className="shop-floating-shape shop-floating-shape-one" />
        <div className="shop-floating-shape shop-floating-shape-two" />

        <div className="shop-hero-content">
          <span className="hero-badge">
            SHOPGEN MARKETPLACE
          </span>

          <h1>
            Explore products
            <span>
              without the noise.
            </span>
          </h1>

          <p>
            Browse the ShopGen catalogue,
            discover products you like and
            build the signals that power your
            AI recommendations.
          </p>

          <div className="shop-hero-actions">
            <button
              type="button"
              className="hero-shop-button"
              onClick={() =>
                document
                  .getElementById(
                    "catalog"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Start browsing ↓
            </button>

            <button
              type="button"
              className="hero-ai-button"
              onClick={
                handleAiRecommendations
              }
            >
              ✦ Ask AI
            </button>
          </div>
        </div>

        <div className="shop-hero-stat">
          <strong>
            {products.length || "—"}
          </strong>

          <span>
            products available
          </span>
        </div>
      </section>

      {/* CATALOG */}
      <main
        className="shop-content"
        id="catalog"
      >
        <section className="catalog-panel">
          <div className="catalog-panel-header">
            <div>
              <span className="section-label">
                PRODUCT CATALOGUE
              </span>

              <h2>
                Find something
                <span> interesting.</span>
              </h2>
            </div>

            <div className="catalog-count">
              <strong>
                {filteredProducts.length}
              </strong>

              <span>
                results
              </span>
            </div>
          </div>

          {/* SEARCH + SORT */}
          <div className="shop-toolbar">
            <label className="search-wrapper">
              <span
                className="search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search products, categories or descriptions..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                aria-label="Search products"
              />

              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>

            <label className="category-filter">
              <span>
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
              >
                <option value="featured">
                  Featured
                </option>

                <option value="rating">
                  Top rated
                </option>

                <option value="price-low">
                  Price: low to high
                </option>

                <option value="price-high">
                  Price: high to low
                </option>
              </select>
            </label>
          </div>

          {/* CATEGORY FILTER */}
          <div className="category-strip">
            {categories.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory ===
                    category
                      ? "category-chip active"
                      : "category-chip"
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}
          </div>
        </section>

        {/* RESULTS HEADER */}
        {!loading && !error && (
          <div className="results-header">
            <div>
              <span className="section-label">
                DISCOVER
              </span>

              <h2>
                Your product universe
              </h2>

              <p>
                Showing{" "}
                <strong>
                  {
                    filteredProducts.length
                  }
                </strong>{" "}
                of{" "}
                <strong>
                  {products.length}
                </strong>{" "}
                products
              </p>
            </div>

            <button
              type="button"
              className="ai-link"
              onClick={
                handleAiRecommendations
              }
            >
              <span>✦</span>
              Personalize with AI
              <span>→</span>
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="products-grid">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                className="product-card skeleton-card"
                key={index}
              >
                <div className="skeleton skeleton-image" />

                <div className="skeleton skeleton-small" />

                <div className="skeleton skeleton-title" />

                <div className="skeleton skeleton-text" />

                <div className="skeleton skeleton-price" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="state-card error-state">
            <div className="state-icon">
              !
            </div>

            <h3>
              We hit a small bump
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="state-card">
              <div className="state-icon">
                ⌕
              </div>

              <h3>
                No products found
              </h3>

              <p>
                Try a different search
                or category.
              </p>

              <button
                type="button"
                className="secondary-button"
                onClick={clearFilters}
              >
                Reset filters
              </button>
            </div>
          )}

        {/* PRODUCTS */}
        {!loading &&
          !error &&
          filteredProducts.length >
            0 && (
            <div className="products-grid">
              {filteredProducts.map(
                (
                  product,
                  index
                ) => (
                  <article
                    className="product-card"
                    key={product.id}
                    style={{
                      "--card-index":
                        index,
                    }}
                  >
                    <button
                      type="button"
                      className="product-card-click"
                      onClick={() =>
                        navigate(
                          `/products/${product.id}`
                        )
                      }
                      aria-label={`View ${product.title}`}
                    >
                      {/* IMAGE */}
                      <div className="product-image-wrapper">
                        <img
                          src={
                            product.image
                          }
                          alt={
                            product.title
                          }
                          className="product-image"
                          loading="lazy"
                        />

                        <span className="product-category">
                          {
                            product.category
                          }
                        </span>

                        {index <
                          3 && (
                          <span className="product-ribbon">
                            Popular
                          </span>
                        )}

                        <span className="product-view-icon">
                          ↗
                        </span>
                      </div>

                      {/* BODY */}
                      <div className="product-card-body">
                        <div className="product-rating">
                          <span>
                            ★
                          </span>

                          <strong>
                            {
                              product.rating
                            }
                          </strong>

                          <small>
                            (
                            {
                              product.rating_count
                            }
                            )
                          </small>
                        </div>

                        <h3 className="product-title">
                          {
                            product.title
                          }
                        </h3>

                        <p className="product-description">
                          {
                            product.description
                          }
                        </p>

                        <div className="product-card-footer">
                          <span className="product-price">
                            $
                            {Number(
                              product.price
                            ).toFixed(
                              2
                            )}
                          </span>

                          <span className="view-product">
                            View details
                            <span>
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </button>
                  </article>
                )
              )}
            </div>
          )}

        {/* BOTTOM AI CTA */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <section className="products-ai-banner">
              <div className="products-ai-decoration" />

              <div className="products-ai-icon">
                ✦
              </div>

              <div className="products-ai-content">
                <span>
                  SHOPGEN AI
                </span>

                <h2>
                  Not sure what to
                  explore next?
                </h2>

                <p>
                  Let AI use your browsing
                  activity to find relevant
                  products for you.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handleAiRecommendations
                }
                className="products-ai-button"
              >
                Get recommendations
                <span>→</span>
              </button>
            </section>
          )}
      </main>
    </div>
  );
}

export default Products;