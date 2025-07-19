"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Trash, Plus, Minus } from 'lucide-react';

import { UseCartContext } from '../hooks/CartContext';
import { CartItem } from '../types/CartItem';
import { Category } from '../types/products/Enums';
import toast from 'react-hot-toast';

type CartProps = {
    open: boolean;
    setCartOpen: (open: boolean) => void;
}
export default function Cart({ open, setCartOpen }: CartProps) {
    const { cart, incrementItem, decrementItem, removeFromCart, clearCart } = UseCartContext();
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const addOneMoreToCart =(productId: string, option_type: string) => {
        incrementItem(productId, option_type);
    }

    const removeOneMoreFromCart =(productId: string, option_type: string) => {
        decrementItem(productId, option_type);
    }

    const removeProductInCart = (productId: string, option_type: string) => {
        removeFromCart(productId, option_type);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setCartOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);


    const fetchCheckout = async () => {
        if( cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        try {
            const response = await fetch("http://localhost:3010/checkout", {
                method: "POST",
                body: JSON.stringify(cart),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.text();
            if (data == "success") {
                toast.success("Checkout successful!");
                clearCart();
                setCartOpen(false);
            } else{
                toast.error("Checkout failed, please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("An error occurred during checkout.");
        }
    }

    return (
        <div ref={dropdownRef} className={`absolute right-0 top-[90px] w-[400px] bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 ${open ? "block" : "hidden"}`}>
            <div className="p-4 h-[420px] overflow-y-auto">
                {cart?.length === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    cart?.map((item: CartItem) => (
                        <div key={item.id+item.option_name+item.option_type} className="grid grid-cols-3 gap-4 items-center mb-3">
                            <div>
                                <Image
                                    src={item?.category === Category.Shoes ? "/images/shoes.png" : "/images/t-shirt.png"}
                                    width={100}
                                    height={100}
                                    alt="Product Image"
                                    className="object-cover rounded-lg w-[100px] h-[100px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-md font-semibold">{item.brand}</div>
                                <div className="text-sm text-[#828282]">{item.product_name}</div>
                                <div className="text-sm text-[#828282]">{item.option_name} {item.option_type}</div>
                                <div className="flex items-center gap-2 mt-2">
                                    <button className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => removeOneMoreFromCart(item.id, item.option_type)}>
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => addOneMoreToCart(item.id, item.option_type)}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-start">
                                <div className="font-bold mb-0">${(item.price * item.quantity).toFixed(2)}</div>
                                <button className="mt-2 p-2 rounded-full hover:bg-gray-200" onClick={() => removeProductInCart(item.id, item.option_type)}>
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div>
                <button className="bg-[#2D9C07] text-white w-full py-3 rounded-b-lg font-semibold shadow hover:bg-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none" onClick={fetchCheckout}>
                    Continue To Checkout
                </button>
            </div>
        </div>
    )
}