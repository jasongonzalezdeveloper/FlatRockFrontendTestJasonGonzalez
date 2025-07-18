'use client';
import React from 'react';

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react';

import { useState } from 'react';

export default function Product() {
    const [cartColor, setCartColor] = useState('#08BB4F');

    return (
        <div className="w-[232px] border-[#F7F5F7] border-[1.54px] relative rounded-lg overflow-hidden">
            <div className="absolute top-2 right-2 z-10 cursor-pointer">
                <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 shadow">
                    <ShoppingBag color={cartColor} size={20} />
                </div>
            </div>
            <div className="h-[245px] bg-gray-100 px-4 py-7 flex items-center justify-center">
                <Image
                    src="/images/shoes.png"
                    alt="Product Image"
                    width={232}
                    height={245}
                    className="object-cover" />
            </div>
            <div className="pt-3 pb-1 pl-2 text-[#667085]">
                <h2 className="text-sm font-medium">Product Name</h2>
            </div>
            <div className="pb-3 pl-2 text-[#98A2B3]">
                <h3 className="text-xs font-normal">Brand Name</h3>
            </div>
            <div className="py-3 px-2 text-center border-t border-t-[#F7F5F7] border-t-[1px]">
                $99.99
            </div>
        </div>
    )
}
