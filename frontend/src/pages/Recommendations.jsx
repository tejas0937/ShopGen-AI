import { useState } from "react";

function Recommendations() {

  const [query, setQuery] = useState("");

  const [submittedQuery, setSubmittedQuery] =
    useState("");

  const handleRecommend = () => {

    if (!query.trim()) {
      return;
    }

    setSubmittedQuery(query);

  };


  return (
    <div className="recommendations-page">

      <section className="ai-header">

        <p className="hero-badge">
          ✦ SHOPGEN AI
        </p>

        <h1>
          What are you looking for?
        </h1>

        <p>
          Describe what you need in natural language.
          Our recommendation engine will find suitable products.
        </p>

      </section>


      <section className="recommendation-box">

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: I need wireless headphones for gaming under ₹5000..."
        />

        <div className="recommendation-actions">

          <span>
            Describe your requirements naturally
          </span>

          <button
            onClick={handleRecommend}
            className="primary-button"
          >
            ✦ Get Recommendations
          </button>

        </div>

      </section>


      {submittedQuery && (

        <section className="recommendation-preview">

          <div className="query-display">

            <p>
              YOUR REQUEST
            </p>

            <h3>
              "{submittedQuery}"
            </h3>

          </div>


          <div className="coming-soon">

            <div className="ai-icon">
              ✦
            </div>

            <h2>
              AI recommendations coming next
            </h2>

            <p>
              This interface is ready. Next we'll connect
              it to the Django recommendation API and Gemini.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default Recommendations;