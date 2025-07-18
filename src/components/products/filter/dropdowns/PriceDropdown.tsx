'use client';
import { ChevronDown } from 'lucide-react';
import React from 'react';

export default function PriceDropdown() {
    return (
        <div className="relative">
            <button
                className="bg-[#EBEDEC] rounded-full px-4 py-2 text-left flex justify-between items-center cursor-pointer"
            >
                Price

                <ChevronDown />
            </button>
        </div>
    )
}
