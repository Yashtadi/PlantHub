import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (plant, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === plant._id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === plant._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...plant, quantity }];
      }
    });
  };

  const removeFromCart = (plantId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== plantId));
  };

  const updateQuantity = (plantId, quantity) => {
    if (quantity < 1) {
      removeFromCart(plantId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};