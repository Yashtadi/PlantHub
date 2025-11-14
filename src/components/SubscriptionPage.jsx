import React from 'react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const styles = {
  container: { padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
  card: {
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  cardSelected: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)'
  },
  price: { fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', margin: '1rem 0' },
  badge: { display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '9999px', fontSize: '0.9rem', marginBottom: '1rem' },
  features: { textAlign: 'left', margin: '1.5rem 0' },
  feature: { padding: '0.5rem 0', color: '#666' },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1rem'
  }
};

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: '/month',
    features: [
      'Regular pricing',
      'Standard delivery',
      'Customer support',
      'Plant care guides'
    ]
  },
  {
    id: 'eco',
    name: 'Eco Plus',
    price: '₹199',
    period: '/month',
    badge: 'Popular',
    features: [
      '10% discount on orders',
      'Free delivery on orders > ₹1000',
      'Priority customer support',
      'Early access to new plants',
      'Exclusive tips & guides'
    ]
  },
  {
    id: 'pro',
    name: 'Plant Pro',
    price: '₹499',
    period: '/month',
    badge: 'Best Value',
    features: [
      '20% discount on all orders',
      'Free delivery on all orders',
      '24/7 priority support',
      'Free plant care starter kit',
      'Monthly plant subscription',
      'Exclusive member events'
    ]
  }
];

export const SubscriptionPage = () => {
  const { user, subscribe, setCurrentPage } = useApp();

  const handleSubscribe = (planId) => {
    subscribe(planId);
    toast.success(`Upgraded to ${plans.find(p => p.id === planId).name} plan!`);
    setCurrentPage('home');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Subscription Plans</h1>
      <p style={{textAlign: 'center', color: '#666', marginBottom: '2rem', fontSize: '1.1rem'}}>
        Choose the perfect plan for your plant collection
      </p>

      <div style={styles.grid}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              ...styles.card,
              ...(user?.subscription === plan.id ? styles.cardSelected : {})
            }}
            onClick={() => user?.subscription !== plan.id && handleSubscribe(plan.id)}
          >
            {plan.badge && <div style={styles.badge}>{plan.badge}</div>}
            <h2 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{plan.name}</h2>
            <div style={styles.price}>
              {plan.price}
              <span style={{fontSize: '0.8rem', color: '#666'}}>{plan.period}</span>
            </div>

            <div style={styles.features}>
              {plan.features.map((feature, idx) => (
                <div key={idx} style={styles.feature}>
                  ✓ {feature}
                </div>
              ))}
            </div>

            <button
              style={{
                ...styles.button,
                backgroundColor: user?.subscription === plan.id ? '#16a34a' : '#ddd',
                color: user?.subscription === plan.id ? '#fff' : '#666'
              }}
              onClick={() => handleSubscribe(plan.id)}
            >
              {user?.subscription === plan.id ? 'Current Plan' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>

      {user && (
        <div style={{marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #16a34a'}}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>Current Subscription</h3>
          <p style={{color: '#666'}}>You are currently on the <strong>{user.subscription || 'Free'}</strong> plan.</p>
        </div>
      )}
    </div>
  );
};
