import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import "./ShopPages.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="shop-page">
      {/* Hero */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <span className="hero-badge">SHOPGEN AI</span>

          <h1>
            Discover products
            <span> you'll love.</span>
          </h1>

          <p>
            Explore our collection and discover products selected
            for your interests.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="shop-content">

        {/* Toolbar */}
        <div className="shop-toolbar">

          <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="category-filter">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results header */}
        {!loading && !error && (
          <div className="results-header">
            <div>
              <h2>Explore products</h2>

              <p>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}{" "}
                available
              </p>
            </div>

            <Link
              to="/recommendations"
              className="ai-link"
            >
              ✨ Get AI Recommendations
            </Link>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="product-card skeleton-card" key={index}>
                <div className="skeleton skeleton-image"></div>

                <div className="skeleton skeleton-small"></div>

                <div className="skeleton skeleton-title"></div>

                <div className="skeleton skeleton-text"></div>

                <div className="skeleton skeleton-price"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="state-card error-state">
            <div className="state-icon">!</div>

            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="primary-button"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty search */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="state-card">
              <div className="state-icon">⌕</div>

              <h3>No products found</h3>

              <p>
                Try a different search term or category.
              </p>

              <button
                className="secondary-button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  className="product-card"
                  key={product.id}
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
                        ${Number(product.price).toFixed(2)}
                      </span>

                      <span className="view-product">
                        View →
                      </span>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
      </main>
    </div>
  );
}

export default Products;