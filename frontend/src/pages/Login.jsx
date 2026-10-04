import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectPath = location.state?.from || "/";

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

    if (!formData.username.trim() || !formData.password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to login. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <section className="auth-showcase">
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
                ✦ PERSONALIZED SHOPPING
              </span>

              <h1>
                Your smarter way
                <span>to discover products.</span>
              </h1>

              <p>
                Sign in to unlock personalized recommendations powered by
                your shopping activity.
              </p>
            </div>

            <div className="auth-feature-list">
              <div className="auth-feature">
                <span className="auth-feature-icon">✦</span>
                <div>
                  <strong>AI recommendations</strong>
                  <p>Discover products selected around your interests.</p>
                </div>
              </div>

              <div className="auth-feature">
                <span className="auth-feature-icon">♡</span>
                <div>
                  <strong>Personalized experience</strong>
                  <p>Your browsing activity helps improve your suggestions.</p>
                </div>
              </div>

              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <div>
                  <strong>Simple shopping</strong>
                  <p>Browse products and let ShopGen AI guide you.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-showcase-footer">
            <span>SHOPGEN AI</span>
            <span>Smart shopping starts here.</span>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="auth-card">
            <div className="auth-card-header">
              <span className="auth-mobile-brand">SHOPGEN AI</span>

              <span className="auth-card-kicker">WELCOME BACK</span>

              <h2>Sign in to your account</h2>

              <p>
                Continue your personalized shopping experience.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="login-username">
                  Username
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">◉</span>

                  <input
                    id="login-username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="login-password">
                    Password
                  </label>
                </div>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">●</span>

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <span>NEW TO SHOPGEN AI?</span>
              <span />
            </div>

            <Link to="/register" className="auth-secondary-action">
              Create your account
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

export default Login;