import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Load cart and orders from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('plantCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedUser = localStorage.getItem('plantUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedOrders = localStorage.getItem('plantOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('plantCart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('plantOrders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (plant) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === plant.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId) => {
    setCart((prev) => prev.filter((item) => item.id !== plantId));
  };

  const updateQuantity = (plantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === plantId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (email, password) => {
    // Mock login - in real app would validate against backend
    const mockUser = {
      id: '1',
      name: 'Plant Lover',
      email,
      subscription: 'pro',
    };
    setUser(mockUser);
    localStorage.setItem('plantUser', JSON.stringify(mockUser));
  };

  const signup = (name, email, password) => {
    // Mock signup
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      subscription: null,
    };
    setUser(newUser);
    localStorage.setItem('plantUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('plantUser');
  };

  const subscribe = (plan) => {
    if (user) {
      const updatedUser = { ...user, subscription: plan };
      setUser(updatedUser);
      localStorage.setItem('plantUser', JSON.stringify(updatedUser));
    }
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        login,
        signup,
        logout,
        subscribe,
        currentPage,
        setCurrentPage,
        orders,
        addOrder,
        selectedOrderId,
        setSelectedOrderId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
