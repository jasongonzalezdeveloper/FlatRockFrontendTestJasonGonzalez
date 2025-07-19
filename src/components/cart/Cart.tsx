"use client";
import React from 'react';
import Image from 'next/image';
import { Trash, Plus, Minus } from 'lucide-react';

import { UseCartContext } from '../hooks/CartContext';
import { CartItem } from '../types/CartItem';
import { Category } from '../types/products/Enums';

interface CartProps {
    open: boolean;
}
export default function Cart({ open }: CartProps) {
    const { cart } = UseCartContext();

    return (
        <div className={`absolute right-0 top-[90px] w-[400px] h-[500px] bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 ${open ? "block" : "hidden"}`}>
            <div className="p-4 h-[420px] overflow-y-auto">
                {cart?.length === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    cart?.map((item: CartItem) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 items-center mb-3">
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
                                    <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-start">
                                <div className="font-bold mb-0">${(item.price * item.quantity).toFixed(2)}</div>
                                <button className="mt-2 p-2 rounded-full hover:bg-gray-200">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div>
                <button className="bg-[#2D9C07] text-white w-full py-3 rounded-b-lg font-semibold shadow hover:bg-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                    Continue To Checkout
                </button>
            </div>
        </div>
    )
}