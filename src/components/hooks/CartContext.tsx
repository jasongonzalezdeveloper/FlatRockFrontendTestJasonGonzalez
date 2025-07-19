'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/products/Product';

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  setProductToCartItem: (product: Product, optionType: string, optionName: string) => CartItem;
  totalItems: number;
  totalPrice: number;
  isLoaded: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error parsing cart', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setTotalItems(cart.reduce((sum, item) => sum + item.quantity, 0));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const setProductToCartItem = (product: Product, optionType: string, optionName: string) => ({
    id: product ? product.id : "",
    product_name: product ? product.product_name : "",
    brand: product ? product.brand : "",
    category: product ? product.category : "",
    price: product ? product.price : 0,
    quantity: 1,
    option_type: optionType ? optionType : "",
    option_name: optionName ? optionName : ""
  });

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.option_type === product.option_type);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setProductToCartItem,
      totalItems,
      totalPrice,
      isLoaded
    }}>
      {isLoaded ? children : null}
    </CartContext.Provider>
  );
};

export const UseCartContext = () => {
  return useContext(CartContext);
};