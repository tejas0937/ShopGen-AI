import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct, trackInteraction } from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
  try {
    const data = await fetchProduct(id);
    setProduct(data);

    try {
      await trackInteraction(id, "view");
    } catch (interactionError) {
      console.error(
        "Failed to track product view:",
        interactionError
      );
    }
  } catch (err) {
    console.error(err);
    setError("Product could not be loaded.");
  } finally {
    setLoading(false);
  }
}

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="product-details">Loading product...</div>;
  }

  if (error) {
    return <div className="product-details">{error}</div>;
  }

  if (!product) {
    return <div className="product-details">Product not found.</div>;
  }

  return (
    <div className="product-details">
      <Link to="/products">← Back to Products</Link>

      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-details-info">
          <p className="product-category">{product.category}</p>

          <h1>{product.title}</h1>

          <p className="product-rating">
            ⭐ {product.rating} ({product.rating_count} ratings)
          </p>

          <h2>${product.price}</h2>

          <p className="product-description">
            {product.description}
          </p>

          <Link
            to={`/recommendations?product=${product.id}`}
            className="recommendation-button"
          >
            Find Similar Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;