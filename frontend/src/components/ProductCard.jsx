import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image-container">

        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

      </div>


      <div className="product-info">

        <p className="product-category">
          {product.category || "Product"}
        </p>

        <h3>
          {product.title}
        </h3>

        <div className="product-meta">

          <span className="rating">
            ★ {product.rating}
          </span>

          <span className="price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

        </div>


        <Link
          to={`/products/${product.id}`}
          className="view-button"
        >
          View Product →
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;