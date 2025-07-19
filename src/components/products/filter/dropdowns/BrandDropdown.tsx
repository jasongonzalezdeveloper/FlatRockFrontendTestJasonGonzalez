'use client';
import { Brand } from '@/components/types/products/Brand';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

type BrandDropdownProps = {
    onBrandChange: (brandNames: string[]) => void;
}

export default function BrandDropdown({ onBrandChange }: BrandDropdownProps) {
    const [open, setOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [brandsOptions, setBrandsOptions] = useState<Brand[]>([]);


    useEffect(() => {
        onBrandChange(selectedBrands);
    }, [selectedBrands, onBrandChange]);

    const toggleBrand = (brandName: string) => {
        setSelectedBrands(prev => 
            prev.includes(brandName)
                ? prev.filter(b => b !== brandName)
                : [...prev, brandName]
        );
    };

    const getBrands = async () => {
        try {
            const response = await fetch('http://localhost:3010/brands');
            const data = await response.json();
            setBrandsOptions(data);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Unknown error');
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <div className="relative">
            <button
                className="bg-[#EBEDEC] rounded-full px-4 py-2 text-left flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                Brands
                {open ? <ChevronUp /> : <ChevronDown />}
            </button>
            {open && (
                <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow z-50 min-w-max max-h-60 overflow-y-auto">
                    {brandsOptions.map(brand => (
                        <div
                            key={brand.id}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleBrand(brand.name)}
                        >
                            <span className="mr-2">
                                {selectedBrands.includes(brand.name) ? (
                                    <Check className="text-green-500" size={16} />
                                ) : (
                                    <span className="inline-block w-4 h-4 border border-gray-300 rounded" />
                                )}
                            </span>
                            {brand.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}