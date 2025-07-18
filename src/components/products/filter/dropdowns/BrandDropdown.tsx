'use client';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const brands = [
    'Nike',
    'Adidas',
    'Puma',
    'Reebok'
];

export default function BrandDropdown() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const toggleBrand = (brand: string) => {
        setSelected(selected =>
            selected.includes(brand)
                ? selected.filter(b => b !== brand)
                : [...selected, brand]
        );
    };

    return (
        <div className="relative ">
            <button
                className="bg-[#EBEDEC] rounded-full px-4 py-2 text-left flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                Brand
                {open ? (
                    <ChevronUp />
                ) : (
                    <ChevronDown />
                )}
            </button>
            {open && (
                <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow z-50 min-w-max">
                    {brands.map(brand => (
                        <div
                            key={brand}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleBrand(brand)}
                        >
                            <span className="mr-2">
                                {selected.includes(brand) ? (
                                    <Check />) : (
                                    <span className="inline-block w-4 h-4 border border-gray-300 rounded"></span>
                                )}
                            </span>
                            {brand}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
