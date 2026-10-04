import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPromptModal({ open, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div
      className="login-modal-backdrop"
      onMouseDown={onClose}
    >
      <section
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-spark">✦</div>

        <p className="eyebrow">SHOPGEN AI</p>

        <h2 id="login-modal-title">
          Please login first
        </h2>

        <p>
          AI Recommendations and AI Assistant features
          are available after you sign in.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="primary-button"
            onClick={handleLogin}
          >
            Login to continue
          </button>

          <Link
            to="/register"
            className="secondary-button"
            onClick={onClose}
          >
            Create an account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LoginPromptModal;