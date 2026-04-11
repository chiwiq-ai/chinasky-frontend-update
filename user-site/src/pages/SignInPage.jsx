import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setErrorMessage(err?.message || 'Unable to sign in. Please try again.');
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
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Logo */}
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

          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Please enter your details to sign in</p>

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

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <a href="#" className="auth-forgot">Forgot Password?</a>
          </div>

          {errorMessage && (
            <div className="auth-error" role="alert" style={{ color: '#C8102E', fontSize: 13, marginBottom: 12 }}>
              {errorMessage}
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={submitting}>
            {submitting ? 'SIGNING IN…' : 'SIGN IN'}
          </button>

          <p className="auth-switch">
            New to ChinaSky? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
