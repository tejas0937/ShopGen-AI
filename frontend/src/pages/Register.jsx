import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <section className="auth-showcase auth-showcase-register">
          <div className="auth-showcase-glow auth-showcase-glow-one" />
          <div className="auth-showcase-glow auth-showcase-glow-two" />

          <div className="auth-showcase-content">
            <Link to="/" className="auth-brand">
              <span className="auth-brand-mark">S</span>
              <span>
                ShopGen <strong>AI</strong>
              </span>
            </Link>

            <div className="auth-showcase-copy">
              <span className="auth-showcase-kicker">
                ✦ START YOUR JOURNEY
              </span>

              <h1>
                Shopping that
                <span>understands you.</span>
              </h1>

              <p>
                Create your ShopGen AI account and discover a more
                personalized way to explore products.
              </p>
            </div>

            <div className="auth-benefit-card">
              <div className="auth-benefit-top">
                <span className="auth-benefit-icon">✦</span>

                <span className="auth-benefit-label">
                  SHOPGEN AI
                </span>
              </div>

              <h3>
                Discover products that
                <span>fit your taste.</span>
              </h3>

              <p>
                Browse products first. Your interactions then help
                ShopGen AI create more relevant recommendations.
              </p>

              <div className="auth-benefit-tags">
                <span>Personalized</span>
                <span>AI powered</span>
                <span>Simple</span>
              </div>
            </div>
          </div>

          <div className="auth-showcase-footer">
            <span>SHOPGEN AI</span>
            <span>Built for smarter discovery.</span>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="auth-card auth-card-register">
            <div className="auth-card-header">
              <span className="auth-mobile-brand">SHOPGEN AI</span>

              <span className="auth-card-kicker">GET STARTED</span>

              <h2>Create your account</h2>

              <p>
                Join ShopGen AI and start discovering products
                personalized for you.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="register-username">
                  Username
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">◉</span>

                  <input
                    id="register-username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-email">
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">@</span>

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-password">
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">●</span>

                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-confirm-password">
                  Confirm password
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">●</span>

                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="auth-form-error" role="alert">
                  <span>!</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="auth-button-spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <span>ALREADY A MEMBER?</span>
              <span />
            </div>

            <Link to="/login" className="auth-secondary-action">
              Sign in to your account
              <span>→</span>
            </Link>

            <Link to="/" className="auth-back-link">
              ← Back to ShopGen AI
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;