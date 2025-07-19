'use client';
import React from 'react'
import BrandDropdown from './dropdowns/BrandDropdown';
import PriceDropdown from './dropdowns/PriceDropdown';
import SortByDropdown from './dropdowns/SortByDropdown';

type DropdownFilterProps = {
  onSortByChange: (sortBy?: string) => void;
  onBrandChange: (brand?: string[]) => void;
  priceRange?: [number, number];
  getPriceRangeFilter: (prices: number[]) => void;
};

export default function DropdownFilter({ onSortByChange, onBrandChange, priceRange, getPriceRangeFilter }: DropdownFilterProps) {
  return (
    <div className='flex gap-2'>
        <BrandDropdown onBrandChange={onBrandChange}/>
        <PriceDropdown priceRange={priceRange} getPriceRangeFilter={getPriceRangeFilter} />
        <SortByDropdown onSortByChange={onSortByChange} />
    </div>
  )
}
