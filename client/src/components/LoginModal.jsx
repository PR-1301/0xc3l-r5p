import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { loginAdmin } from "../services/api";

export default function LoginModal({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !pin.trim()) {
      setError("Please enter both username and PIN.");
      return;
    }

    try {
      setLoading(true);
      const data = await loginAdmin(username.trim(), pin.trim());
      if (data.success && data.token) {
        localStorage.setItem("admin_token", data.token);
        onLoginSuccess(data.token);
      } else {
        setError(data.message || "Failed to authenticate.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid credentials or server unavailable.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-badge">
            <ShieldCheck size={32} className="shield-icon" />
          </div>
          <h2>Admin Portal</h2>
          <p>Enter your admin credentials to access recruitment responses</p>
        </div>

        {error && (
          <div className="login-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Admin Username</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                autoFocus
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pin">Admin PIN</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="pin"
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 6-digit PIN"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-pin-btn"
                onClick={() => setShowPin(!showPin)}
                tabIndex={-1}
                aria-label="Toggle PIN visibility"
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="spinner" />
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="login-footer">
          <span>🔒 Secured with 256-bit JWT authentication</span>
        </div>
      </div>
    </div>
  );
}
