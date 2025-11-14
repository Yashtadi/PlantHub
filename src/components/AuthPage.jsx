import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const styles = {
  container: { padding: '2rem 1rem', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { width: '100%', maxWidth: '400px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  title: { fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' },
  subtitle: { color: '#666', marginBottom: '2rem', textAlign: 'center', fontSize: '0.95rem' },
  formGroup: { marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontWeight: '500' },
  input: { width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  toggle: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' },
  toggleButton: { background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }
};

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup, setCurrentPage } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        toast.error('Please fill all fields');
        return;
      }
      login(email, password);
      toast.success('Login successful!');
      setCurrentPage('home');
    } else {
      if (!name || !email || !password) {
        toast.error('Please fill all fields');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      signup(name, email, password);
      toast.success('Signup successful! Welcome!');
      setCurrentPage('home');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <p style={styles.subtitle}>{isLogin ? 'Welcome back!' : 'Create your account'}</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.toggle}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button 
            style={styles.toggleButton}
            onClick={() => {
              setIsLogin(!isLogin);
              setName('');
              setEmail('');
              setPassword('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};
