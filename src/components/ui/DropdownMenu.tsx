'use client';
import React from 'react';

interface DropdownMenuProps {
    options: string[];
    selected: string | null;
    setSelected: (options: string) => void;
    setOpen: (open: boolean) => void;
}

export default function DropdownMenu({ options, selected, setSelected, setOpen }: DropdownMenuProps) {
    return (
        <div
            className="absolute left-auto right- mt-2 bg-white border border-gray-200 rounded shadow z-50 min-w-max max-w-[90vw]"
        >
            {options.map(option => (
                <div
                    key={option}
                    className={`px-6 py-2 cursor-pointer hover:bg-gray-100 ${selected === option ? 'text-[#EA2B2B] font-semibold' : ''}`}
                    onClick={() => { setSelected(option); setOpen(false); }}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}
