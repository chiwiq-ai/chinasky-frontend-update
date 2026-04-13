import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      // Mock: simulate API call
      await new Promise(r => setTimeout(r, 1000));
      setSent(true);
    } catch (err) {
      setErrorMessage(err?.message || 'Unable to send reset link. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-overlay" />
        <div className="auth-left-content">
          <h2>China Sky Supermarket</h2>
          <p>Experience the finest selection of authentic groceries, fresh produce, and premium household essentials delivered to your doorstep.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form">
          <div className="auth-logo">
            <div className="auth-logo-text">
              <span className="logo-china">China</span>
              <span className="logo-sky">Sky</span>
            </div>
            <div className="auth-logo-icon">
              <ShoppingCart size={20} />
            </div>
            <div className="auth-logo-chinese">中国天和市</div>
            <div className="auth-logo-sub">SUPERMARKET</div>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit}>
              <h1>Forgot Password?</h1>
              <p className="auth-subtitle">
                No worries. Enter your email address and we'll send you a link to reset your password.
              </p>

              <div className="auth-field">
                <label>Email</label>
                <div className="auth-input-wrapper">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="auth-error" role="alert" style={{ color: '#C8102E', fontSize: 13, marginBottom: 12 }}>
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={submitting}>
                {submitting ? 'SENDING…' : 'SEND RESET LINK'}
              </button>

              <Link to="/signin" className="auth-back-link">
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </form>
          ) : (
            <div className="auth-success-state">
              <div className="auth-success-icon">
                <Mail size={32} />
              </div>
              <h1>Check your email</h1>
              <p className="auth-subtitle">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <p className="auth-hint" style={{ marginTop: 16 }}>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => { setSent(false); setEmail(''); }}
                >
                  try again
                </button>
              </p>
              <Link to="/signin" className="auth-back-link" style={{ marginTop: 24 }}>
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
