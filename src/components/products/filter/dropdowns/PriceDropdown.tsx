'use client';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value: number) {
  return `$${value}`;
}

type PriceDropdownProps = {
  priceRange?: [number, number];
  getPriceRangeFilter: (prices: number[]) => void;
}
export default function PriceDropdown({ priceRange, getPriceRangeFilter }: PriceDropdownProps) {
    const [value, setValue] = useState<number[]>([0, 50]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (priceRange) {
            setValue(priceRange);
        }
    }, [priceRange]);

    const handleChange = (event: Event, newValue: number[]) => {
        setValue(newValue);
        getPriceRangeFilter(newValue);
    };

    return (
        <div className="relative w-fit z-20">
            <button
                className="bg-[#EBEDEC] rounded-full px-4 py-2 text-left flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                Price
                <ChevronDown />
            </button>
            {open && (
                <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow z-50 p-4 w-[320px]">
                    <div className="flex flex-col gap-2 mb-4">
                        <Box sx={{ width: 280 }}>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={value}
                                min={priceRange ? priceRange[0] : 0}
                                max={priceRange ? priceRange[1] : 100}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            />
                        </Box>
                    </div>
                    <div className="flex gap-4 mb-4">
                       <div className="flex flex-col relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">$</span>
                            <input
                                type="number"
                                min={priceRange ? priceRange[0] : 0}
                                max={value[1]}
                                value={value[0]}
                                onChange={e => setValue([Number(e.target.value), value[1]])}
                                className="border border-[#8B8B8B] rounded-full px-6 py-1 w-30"
                                style={{ paddingLeft: '1.25rem' }} 
                            />
                        </div>
                        -
                        <div className="flex flex-col relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">$</span>
                            <input
                                type="number"
                                min={value[0]}
                                max={priceRange ? priceRange[1] : 100}
                                value={value[1]}
                                onChange={e => setValue([value[0], Number(e.target.value)])}
                                className="border border-[#8B8B8B] rounded-full px-6 py-1 w-30"
                                style={{ paddingLeft: '1.25rem' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
