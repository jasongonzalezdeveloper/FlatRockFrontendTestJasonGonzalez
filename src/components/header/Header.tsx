'use client';
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { UseCartContext } from '../hooks/CartContext';
import Cart from '../cart/Cart';

export default function Header() {
    const { totalItems } = UseCartContext();
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div>
            <header className="w-full h-[90px] flex items-center justify-between px-8 shadow">
                <h1 className="text-2xl font-bold italic text-[#0D3356]">Flat Rock Tech</h1>
                <div className="relative bg-[#F5F1EE] rounded-full flex items-center justify-center w-13 h-13 shadow cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
                    <span className="absolute -top-2 -left-2 bg-black text-white text-xs font-bold rounded-full px-2 py-1 shadow">
                        {totalItems}
                    </span>
                    <ShoppingBag />
                </div>
            </header>
            <Cart open={cartOpen} setCartOpen={setCartOpen} />
        </div>
    )
}