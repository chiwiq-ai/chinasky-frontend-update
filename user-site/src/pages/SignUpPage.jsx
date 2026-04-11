import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone, User, ShoppingCart, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      await signup({ name, email, phone, password });
      navigate('/');
    } catch (err) {
      setErrorMessage(err?.message || 'Unable to create your account. Please try again.');
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

          <h1>Create an account</h1>
          <div style={{ height: 8 }} />

          <div className="auth-field">
            <label>Full Name</label>
            <div className="auth-input-wrapper">
              <User size={16} className="auth-input-icon" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <label>Phone Number</label>
            <div className="auth-input-wrapper">
              <Phone size={16} className="auth-input-icon" />
              <input
                type="tel"
                placeholder="+1(555)000-0000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
            <p className="auth-hint">Must be at least 8 characters with a mix of letters and numbers.</p>
          </div>

          {errorMessage && (
            <div className="auth-error" role="alert" style={{ color: '#C8102E', fontSize: 13, marginBottom: 12 }}>
              {errorMessage}
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={submitting}>
            {submitting ? 'CREATING…' : (<>CREATE ACCOUNT <ArrowRight size={16} /></>)}
          </button>

          <p className="auth-terms">
            By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>

          <p className="auth-switch">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
