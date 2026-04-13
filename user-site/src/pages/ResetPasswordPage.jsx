import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Lock, ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      // Mock: simulate API call with token
      await new Promise(r => setTimeout(r, 1000));
      setDone(true);
    } catch (err) {
      setErrorMessage(err?.message || 'Unable to reset password. The link may have expired.');
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

          {!done ? (
            <form onSubmit={handleSubmit}>
              <h1>Set New Password</h1>
              <p className="auth-subtitle">
                Your new password must be at least 8 characters with a mix of letters and numbers.
              </p>

              <div className="auth-field">
                <label>New Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="auth-error" role="alert" style={{ color: '#C8102E', fontSize: 13, marginBottom: 12 }}>
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={submitting}>
                {submitting ? 'RESETTING…' : 'RESET PASSWORD'}
              </button>

              <Link to="/signin" className="auth-back-link">
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </form>
          ) : (
            <div className="auth-success-state">
              <div className="auth-success-icon" style={{ color: '#16a34a' }}>
                <CheckCircle size={40} />
              </div>
              <h1>Password Reset!</h1>
              <p className="auth-subtitle">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Link to="/signin">
                <button type="button" className="auth-submit-btn" style={{ marginTop: 16 }}>
                  SIGN IN
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
