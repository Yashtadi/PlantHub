import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { data } = await API.post('/auth/forgot-password', { email });
      setMessage(data.message);
      setEmail(''); // Clear input after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-brand">
          <span className="brand-logo">🌿</span>
          <div className="brand-text">
            <h1>Welcome to PlantHub</h1>
            <p>Join our community of plant lovers</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Reset Your Password</h1>
            <p style={{ 
              color: 'var(--text-light)', 
              fontSize: '0.95rem', 
              marginTop: '0.5rem',
              fontWeight: 'normal'
            }}>
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your registered email"
                className="light-input"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/login" className="link">← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;