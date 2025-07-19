'use client';
import React from 'react'

type CategoryFilterProps = {
    onCategoryChange: (category: string) => void;
    currentCategory?: string;
};
export default function CategoryFilter({ onCategoryChange, currentCategory }: CategoryFilterProps) {
  return (
    <div className="bg-[#EBEDEC] w-auto px-2 py-1 rounded-sm cursor-pointer">
      <div className="flex gap-2">
        <div className={`rounded-sm w-auto px-3 py-1 ${currentCategory === 'All' ? 'bg-white' : ''}`} onClick={() => onCategoryChange('All')}>All</div>
        <div className={`rounded-sm w-auto px-3 py-1 ${currentCategory === 'Shoes' ? 'bg-white' : ''}`} onClick={() => onCategoryChange('Shoes')}>Shoes</div>
        <div className={`rounded-sm w-auto px-3 py-1 ${currentCategory === 'Shirts' ? 'bg-white' : ''}`} onClick={() => onCategoryChange('Shirts')}>Shirts</div>
      </div>
    </div>
  )
}
