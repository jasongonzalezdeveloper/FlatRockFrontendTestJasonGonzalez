'use client';
import React from 'react'
import BrandDropdown from './dropdowns/BrandDropdown';
import PriceDropdown from './dropdowns/PriceDropdown';
import SortByDropdown from './dropdowns/SortByDropdown';

type DropdownFilterProps = {
  onSortByChange: (sortBy?: string) => void;
  onBrandChange: (brand?: string[]) => void;
};

export default function DropdownFilter({ onSortByChange, onBrandChange }: DropdownFilterProps) {
  return (
    <div className='flex gap-2'>
        <BrandDropdown onBrandChange={onBrandChange}/>
        <PriceDropdown/>
        <SortByDropdown onSortByChange={onSortByChange} />
    </div>
  )
}
