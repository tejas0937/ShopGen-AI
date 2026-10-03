import { useEffect, useState } from "react";
import { fetchRecommendations } from "../services/api";
import ProductCard from "../components/ProductCard";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await fetchRecommendations();

        setRecommendations(data.products);
        setReason(data.reason);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="recommendations-page">
        <h1>AI Recommendations</h1>
        <p>Finding products for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-page">
        <h1>AI Recommendations</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <h1>AI Recommendations</h1>

      <p className="recommendation-reason">
        {reason}
      </p>

      {recommendations.length === 0 ? (
        <p>No recommendations available yet.</p>
      ) : (
        <div className="products-grid">
          {recommendations.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;