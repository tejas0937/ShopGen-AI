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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProducts();

        setProducts(
          Array.isArray(data) ? data : []
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
    const values = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...values];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const searchText = [
        product.title,
        product.description,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchText.includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
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
    });
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

  const scrollToCatalog = () => {
    document
      .getElementById("catalog")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="shop-page products-page">
      {/* =====================================================
          HERO
          ===================================================== */}

      

      {/* =====================================================
          CATALOG
          ===================================================== */}

      <main
        className="shop-content"
        id="catalog"
      >
        <section className="catalog-panel">
          <div className="catalog-heading">
            <div>
              <span className="section-label">
                PRODUCT CATALOGUE
              </span>

              <h2>
                Browse the
                <span> collection.</span>
              </h2>

              <p>
                Search products filter by category
                and sort the catalogue your way.
              </p>
            </div>

            <div className="catalog-count">
              <strong>
                {filteredProducts.length}
              </strong>

              <span>
                of {products.length} products
              </span>
            </div>
          </div>

          <div className="shop-toolbar">
            <div className="search-wrapper">
              <span
                className="search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
                aria-label="Search products"
              />

              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <label className="sort-wrapper">
              <span>Sort</span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
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

          <div className="category-strip">
            <span className="category-label">
              Categories
            </span>

            <div className="category-chips">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category
                      ? "category-chip active"
                      : "category-chip"
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            RESULTS HEADER
            ===================================================== */}

        {!loading && !error && (
          <div className="results-header">
            <div>
              <span className="section-label">
                DISCOVER
              </span>

              <h2>
                Products you might
                <span> love.</span>
              </h2>

              <p>
                Showing{" "}
                <strong>
                  {filteredProducts.length}
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
              onClick={handleAiRecommendations}
            >
              <span>✦</span>
              Personalize with AI
              <span>→</span>
            </button>
          </div>
        )}

        {/* =====================================================
            LOADING
            ===================================================== */}

        {loading && (
          <div className="products-grid">
            {Array.from({ length: 8 }).map(
              (_, index) => (
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
              )
            )}
          </div>
        )}

        {/* =====================================================
            ERROR
            ===================================================== */}

        {!loading && error && (
          <div className="state-card error-state">
            <div className="state-icon">
              !
            </div>

            <h3>
              We hit a small bump
            </h3>

            <p>{error}</p>

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

        {/* =====================================================
            EMPTY
            ===================================================== */}

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
                We could not find anything matching
                your current filters.
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

        {/* =====================================================
            PRODUCTS
            ===================================================== */}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map(
                (product, index) => (
                  <article
                    className="product-card"
                    key={product.id}
                    style={{
                      "--card-index": index,
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
                      <div className="product-image-wrapper">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="product-image"
                          loading="lazy"
                        />

                        <span className="product-category">
                          {product.category}
                        </span>

                        {index < 3 && (
                          <span className="product-ribbon">
                            Popular
                          </span>
                        )}

                        <span className="product-view-icon">
                          ↗
                        </span>
                      </div>

                      <div className="product-card-body">
                        <div className="product-rating">
                          <span>★</span>

                          <strong>
                            {product.rating}
                          </strong>

                          <small>
                            ({product.rating_count})
                          </small>
                        </div>

                        <h3 className="product-title">
                          {product.title}
                        </h3>

                        <p className="product-description">
                          {product.description}
                        </p>

                        <div className="product-card-footer">
                          <span className="product-price">
                            $
                            {Number(
                              product.price
                            ).toFixed(2)}
                          </span>

                          <span className="view-product">
                            View details
                            <span>→</span>
                          </span>
                        </div>
                      </div>
                    </button>
                  </article>
                )
              )}
            </div>
          )}

        {/* =====================================================
            AI BANNER
            ===================================================== */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <section className="products-ai-banner">
              <div className="products-ai-decoration" />

              <div className="products-ai-icon">
                ✦
              </div>

              <div className="products-ai-content">
                <span>SHOPGEN AI</span>

                <h2>
                  Not sure what to
                  explore next?
                </h2>

                <p>
                  Let ShopGen AI use your browsing
                  activity to find products that
                  match your interests.
                </p>
              </div>

              <button
                type="button"
                className="products-ai-button"
                onClick={handleAiRecommendations}
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