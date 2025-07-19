'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/products/Product';

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string, option_type: string) => void;
  incrementItem: (productId: string, option_type: string) => void;
  decrementItem: (productId: string, option_type: string) => void;
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
    stock: product ? product.stock_quantity : 0,
    option_type: optionType ? optionType.toString() : "",
    option_name: optionName ? optionName : ""
  });

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const totalQuantityForId = prevCart
        .filter(item => item.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      if (totalQuantityForId >= product.stock) {
        return prevCart;
      }

      const existingItem = prevCart.find(item => item.id === product.id && item.option_type === product.option_type);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.option_type === product.option_type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, option_type: string) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === productId && item.option_type === option_type))
    );
  };

  const incrementItem = (productId: string, option_type: string) => {
    setCart(prevCart => {
      // Busca el stock del producto actual
      const itemToIncrement = prevCart.find(item => item.id === productId && item.option_type === option_type);
      if (!itemToIncrement) return prevCart;

      // Suma la cantidad total en el carrito para este id
      const totalQuantityForId = prevCart
        .filter(item => item.id === productId)
        .reduce((sum, item) => sum + item.quantity, 0);

      if (totalQuantityForId >= itemToIncrement.stock) {
        // No incrementar si ya se alcanzó el stock
        return prevCart;
      }

      return prevCart.map(item =>
        item.id === productId && item.option_type === option_type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const decrementItem = (productId: string, option_type: string) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === productId && item.option_type === option_type
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
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
      incrementItem,
      decrementItem,
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