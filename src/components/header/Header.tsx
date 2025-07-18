'use client';
import React from 'react'
import { ShoppingBag } from 'lucide-react';

export default function Header() {
    return (
        <div>
            <header className="w-full h-[90px] flex items-center justify-between px-8 shadow">
                <h1 className="text-2xl font-bold">Flat Rock Tech</h1>
                <div>
                    <ShoppingBag />
                </div>
            </header>
        </div>
    )
}
