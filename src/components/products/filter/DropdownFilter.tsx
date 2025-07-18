'use client';
import React from 'react'
import BrandDropdown from './dropdowns/BrandDropdown';
import PriceDropdown from './dropdowns/PriceDropdown';
import SortByDropdown from './dropdowns/SortByDropdown';

export default function DropdownFilter() {
  return (
    <div className='flex gap-2'>
        <BrandDropdown/>
        <PriceDropdown/>
        <SortByDropdown/>
    </div>
  )
}
