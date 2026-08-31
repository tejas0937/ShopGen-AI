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
        <h3>{product.title}</h3>

        <p className="rating">
          ★ {product.rating}
        </p>

        <p className="price">
          ₹{product.price}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="view-button"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;