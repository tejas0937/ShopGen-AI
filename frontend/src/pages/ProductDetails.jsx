import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="product-details">
      <p className="hero-label">PRODUCT DETAILS</p>

      <h1>Product #{id}</h1>

      <p>
        Product information will be loaded from the Django
        backend here.
      </p>

      <button className="primary-button">
        Find Similar Products
      </button>
    </div>
  );
}

export default ProductDetails;