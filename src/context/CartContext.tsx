"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  slug: string;
  image: string;
  title: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  badge: string;
  deliveryText: string;
  highlights: string[];
  offers: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  fullName: string;
  mobile: string;
  pincode: string;
  city: string;
  state: string;
  houseNo: string;
  roadName: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  discountTotal: number;
  address: Address | null;
  setAddress: (address: Address) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      
      const savedAddress = localStorage.getItem('address');
      if (savedAddress) setAddress(JSON.parse(savedAddress));
      
      const savedPayment = localStorage.getItem('paymentMethod');
      if (savedPayment) setPaymentMethod(savedPayment);
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('address', JSON.stringify(address));
      localStorage.setItem('paymentMethod', paymentMethod);
    }
  }, [cart, address, paymentMethod, isLoaded]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.currentPrice * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const discountTotal = cart.reduce((total, item) => total + (item.originalPrice - item.currentPrice) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        discountTotal,
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
