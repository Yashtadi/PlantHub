import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
// Razorpay removed: payments are now mocked/simulated client-side
import { toast } from 'sonner';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '2rem 1rem'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  progressContainer: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  progressStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  progressCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    fontSize: '0.95rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  radioContainer: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  radioContainerSelected: {
    border: '2px solid #16a34a',
    backgroundColor: '#f0fdf4'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer'
  },
  radioInput: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  summary: {
    position: 'sticky',
    top: '2rem'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontSize: '0.95rem'
  },
  total: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: '1rem'
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  addressDisplay: {
    color: '#666'
  }
};

export const CheckoutPage = () => {
  const { cart, user, clearCart, setCurrentPage, addOrder } = useApp();
  const [step, setStep] = useState('address');
  const [isProcessing, setIsProcessing] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let subscriptionDiscount = 0;
  if (user?.subscription === 'eco') {
    subscriptionDiscount = subtotal * 0.10;
  } else if (user?.subscription === 'pro') {
    subscriptionDiscount = subtotal * 0.20;
  }
  
  const subtotalAfterSubscription = subtotal - subscriptionDiscount;
  const couponDiscount = appliedCoupon ? (subtotalAfterSubscription * appliedCoupon.discount) : 0;
  const subtotalAfterAllDiscounts = subtotalAfterSubscription - couponDiscount;
  
  let shippingCost = 99;
  if (user?.subscription === 'pro') {
    shippingCost = 0;
  } else if (subtotalAfterAllDiscounts > 2000 || (user?.subscription === 'eco' && subtotalAfterAllDiscounts > 1000)) {
    shippingCost = 0;
  }
  
  const total = subtotalAfterAllDiscounts + shippingCost;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-IN');

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressInfo.fullName || !addressInfo.phone || !addressInfo.address || !addressInfo.city || !addressInfo.state || !addressInfo.pincode) {
      toast.error('Please fill all address fields');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep('review');
  };

  const handleApplyCoupon = () => {
    const validCoupons = [
      { code: 'PLANT10', discount: 0.10 },
      { code: 'FIRST50', discount: 0.05 },
      { code: 'WELCOME15', discount: 0.15 },
    ];
    
    const coupon = validCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success(`Coupon ${coupon.code} applied! ${(coupon.discount * 100)}% discount`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'upi') {
      // Since Razorpay was removed, simulate a UPI payment flow here.
      setIsProcessing(true);
      setTimeout(() => {
        handlePaymentSuccess({
          payment_id: `upi_${Date.now()}`,
          payment_order_id: Date.now().toString(),
          payment_signature: 'upi_mock_signature',
        });
      }, 800);
    } else {
      handlePaymentSuccess({
        payment_id: `cod_${Date.now()}`,
        payment_order_id: Date.now().toString(),
        payment_signature: 'cod_no_payment',
      });
    }
  };

  const handlePaymentSuccess = (paymentResponse) => {
    setIsProcessing(false);
    
    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      total: total,
      subtotal: subtotal,
      discount: subscriptionDiscount,
      shipping: shippingCost,
      status: 'pending',
      orderDate: new Date().toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      address: addressInfo,
      paymentMethod: paymentMethod,
      couponCode: appliedCoupon?.code,
      couponDiscount: couponDiscount,
      paymentId: paymentResponse.payment_id,
    };

    addOrder(newOrder);
    toast.success('Order placed successfully! 🌱');
    clearCart();
    setCurrentPage('orders');
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => step === 'address' ? setCurrentPage('cart') : setStep(step === 'payment' ? 'address' : 'payment')}>
            ← Back
          </button>
          <h1 style={styles.title}>Checkout</h1>
          
          <div style={styles.progressContainer}>
            <div style={styles.progressStep}>
              <div style={{...styles.progressCircle, backgroundColor: step === 'address' || step === 'payment' || step === 'review' ? '#16a34a' : '#ccc', color: '#fff'}}>1</div>
              <span>Address</span>
            </div>
            <div style={{height: '2px', width: '40px', backgroundColor: step === 'payment' || step === 'review' ? '#16a34a' : '#ddd'}}></div>
            <div style={styles.progressStep}>
              <div style={{...styles.progressCircle, backgroundColor: step === 'payment' || step === 'review' ? '#16a34a' : '#ccc', color: '#fff'}}>2</div>
              <span>Payment</span>
            </div>
            <div style={{height: '2px', width: '40px', backgroundColor: step === 'review' ? '#16a34a' : '#ddd'}}></div>
            <div style={styles.progressStep}>
              <div style={{...styles.progressCircle, backgroundColor: step === 'review' ? '#16a34a' : '#ccc', color: '#fff'}}>3</div>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div>
            {/* Address Form */}
            {step === 'address' && (
              <div style={styles.card}>
                <h2 style={{fontSize: '1.25rem', marginBottom: '1.5rem'}}>Delivery Address</h2>
                <form onSubmit={handleAddressSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={addressInfo.fullName}
                      onChange={(e) => setAddressInfo({ ...addressInfo, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      style={styles.input}
                      value={addressInfo.phone}
                      onChange={(e) => setAddressInfo({ ...addressInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Address</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={addressInfo.address}
                      onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.grid2Col}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>City</label>
                      <input
                        type="text"
                        style={styles.input}
                        value={addressInfo.city}
                        onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>State</label>
                      <input
                        type="text"
                        style={styles.input}
                        value={addressInfo.state}
                        onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Pincode</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={addressInfo.pincode}
                      onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                      maxLength="6"
                      required
                    />
                  </div>
                  <button type="submit" style={styles.button}>Continue to Payment</button>
                </form>
              </div>
            )}

            {/* Payment Method */}
            {step === 'payment' && (
              <div style={styles.card}>
                <h2 style={{fontSize: '1.25rem', marginBottom: '1.5rem'}}>Payment Method</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div style={paymentMethod === 'upi' ? {...styles.radioContainer, ...styles.radioContainerSelected} : styles.radioContainer}>
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        style={styles.radioInput}
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div style={{fontWeight: '500'}}>UPI Payment</div>
                        <div style={{fontSize: '0.85rem', color: '#666'}}>Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </label>
                  </div>

                  <div style={paymentMethod === 'cod' ? {...styles.radioContainer, ...styles.radioContainerSelected} : styles.radioContainer}>
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        style={styles.radioInput}
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div style={{fontWeight: '500'}}>Cash on Delivery</div>
                        <div style={{fontSize: '0.85rem', color: '#666'}}>Pay when you receive</div>
                      </div>
                    </label>
                  </div>

                  <button type="submit" style={styles.button}>Continue to Review</button>
                </form>
              </div>
            )}

            {/* Review */}
            {step === 'review' && (
              <div>
                <div style={styles.card}>
                  <h3 style={{fontSize: '1.1rem', marginBottom: '1rem'}}>Delivery Address</h3>
                  <div style={styles.addressDisplay}>
                    <p><strong>{addressInfo.fullName}</strong></p>
                    <p>{addressInfo.phone}</p>
                    <p>{addressInfo.address}</p>
                    <p>{addressInfo.city}, {addressInfo.state} - {addressInfo.pincode}</p>
                  </div>
                  <button style={{...styles.backButton, marginTop: '1rem'}} onClick={() => setStep('address')}>Edit Address</button>
                </div>

                <div style={styles.card}>
                  <h3 style={{fontSize: '1.1rem', marginBottom: '1rem'}}>Payment Method</h3>
                  <div>
                    <strong>{paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}</strong>
                  </div>
                  <button style={{...styles.backButton, marginTop: '1rem'}} onClick={() => setStep('payment')}>Edit Payment</button>
                </div>

                <div style={styles.card}>
                  <h3 style={{fontSize: '1.1rem', marginBottom: '1rem'}}>Order Items ({cart.length})</h3>
                  {cart.map((item) => (
                    <div key={item.id} style={{display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee'}}>
                      <img src={item.image} alt={item.name} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px'}} />
                      <div style={{flex: 1}}>
                        <h4 style={{margin: '0', fontSize: '0.95rem'}}>{item.name}</h4>
                        <p style={{margin: '0.25rem 0', fontSize: '0.85rem', color: '#666'}}>Qty: {item.quantity}</p>
                        <p style={{margin: '0.25rem 0', color: '#16a34a', fontWeight: '500'}}>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  style={{...styles.button, ...(isProcessing ? styles.buttonDisabled : {})}} 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : (paymentMethod === 'upi' ? 'Pay with UPI' : 'Place Order')}
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={styles.summary}>
            <div style={styles.card}>
              <h3 style={{fontSize: '1.1rem', marginBottom: '1.5rem'}}>Bill Summary</h3>
              
              <div style={styles.summaryItem}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {subscriptionDiscount > 0 && (
                <div style={{...styles.summaryItem, color: '#16a34a'}}>
                  <span>Subscription Discount</span>
                  <span>-₹{subscriptionDiscount.toFixed(2)}</span>
                </div>
              )}
              
              {appliedCoupon && (
                <div style={{...styles.summaryItem, color: '#16a34a'}}>
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div style={styles.summaryItem}>
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
              </div>

              <hr style={{margin: '1rem 0', border: 'none', borderTop: '1px solid #ddd'}} />

              <div style={{...styles.summaryItem, ...styles.total}}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {step === 'review' && !appliedCoupon && (
                <div style={{marginTop: '1.5rem'}}>
                  <label style={styles.label}>Have a coupon code?</label>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <input
                      type="text"
                      style={{...styles.input, flex: 1}}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode}
                      style={{...styles.button, flex: '0 0 auto', backgroundColor: couponCode ? '#16a34a' : '#ccc'}}
                    >
                      Apply
                    </button>
                  </div>
                  <p style={{fontSize: '0.8rem', color: '#666', marginTop: '0.5rem'}}>Try: PLANT10, FIRST50, WELCOME15</p>
                </div>
              )}

              {appliedCoupon && step === 'review' && (
                <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #16a34a', borderRadius: '4px', fontSize: '0.9rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{color: '#16a34a'}}>{appliedCoupon.code} applied</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode('');
                      }}
                      style={{background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer'}}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {user?.subscription === 'pro' && (
                <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '4px', fontSize: '0.9rem', color: '#b45309'}}>
                  Pro benefits: {cart.reduce((sum, item) => sum + item.quantity, 0)} free pot(s)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
