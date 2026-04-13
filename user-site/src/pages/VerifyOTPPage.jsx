import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';

export default function VerifyOTPPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [submitting, setSubmitting] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setErrorMessage('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || '';
    setOtp(next);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter the full 6-digit code.');
      return;
    }
    if (submitting) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      // Mock: simulate verification
      await new Promise(r => setTimeout(r, 1000));
      setVerified(true);
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setErrorMessage(err?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    // Mock: simulate resend
    await new Promise(r => setTimeout(r, 500));
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

          {!verified ? (
            <form onSubmit={handleSubmit}>
              <h1>Verify Your Email</h1>
              <p className="auth-subtitle">
                We've sent a 6-digit verification code to{' '}
                {email ? <strong>{email}</strong> : 'your email'}. Enter it below to verify your account.
              </p>

              <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    className="otp-input"
                  />
                ))}
              </div>

              {errorMessage && (
                <div className="auth-error" role="alert" style={{ color: '#C8102E', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={submitting}>
                {submitting ? 'VERIFYING…' : 'VERIFY EMAIL'}
              </button>

              <p className="auth-hint" style={{ textAlign: 'center', marginTop: 16 }}>
                Didn't receive the code?{' '}
                {resendCooldown > 0 ? (
                  <span style={{ color: 'var(--gray-400)' }}>Resend in {resendCooldown}s</span>
                ) : (
                  <button type="button" className="auth-link-btn" onClick={handleResend}>
                    Resend Code
                  </button>
                )}
              </p>

              <Link to="/signup" className="auth-back-link">
                <ArrowLeft size={16} /> Back to Sign Up
              </Link>
            </form>
          ) : (
            <div className="auth-success-state">
              <div className="auth-success-icon" style={{ color: '#16a34a' }}>
                <CheckCircle size={40} />
              </div>
              <h1>Email Verified!</h1>
              <p className="auth-subtitle">
                Your email has been verified successfully. Redirecting you to sign in...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
