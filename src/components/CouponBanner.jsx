import React from 'react';

const styles = {
  banner: {
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#b45309'
  }
};

export const CouponBanner = () => {
  return (
    <div style={styles.banner}>
      🎉 Use coupon codes: <strong>PLANT10</strong>, <strong>FIRST50</strong>, or <strong>WELCOME15</strong> for discounts!
    </div>
  );
};
