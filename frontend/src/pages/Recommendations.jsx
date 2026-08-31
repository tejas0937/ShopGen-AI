function Recommendations() {
  return (
    <div className="recommendations-page">
      <div className="page-header">
        <p className="hero-label">SHOPGEN AI</p>

        <h1>AI Product Recommendations</h1>

        <p>
          Tell us what you're looking for and we'll find
          suitable products for you.
        </p>
      </div>

      <div className="recommendation-form">
        <textarea
          placeholder="Example: I need gaming headphones under ₹5000"
          rows="5"
        />

        <button className="primary-button">
          Get Recommendations
        </button>
      </div>

      <div className="recommendation-results">
        <h2>Recommended Products</h2>

        <p>
          Your AI recommendations will appear here.
        </p>
      </div>
    </div>
  );
}

export default Recommendations;