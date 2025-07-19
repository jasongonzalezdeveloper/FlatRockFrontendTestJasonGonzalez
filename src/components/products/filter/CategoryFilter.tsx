'use client';
import { Category } from '@/components/types/products/Category';
import React from 'react'

type CategoryFilterProps = {
    onCategoryChange: (category: string) => void;
    currentCategory?: string;
    categories?: Category[]; 
};
export default function CategoryFilter({ onCategoryChange, currentCategory, categories }: CategoryFilterProps) {
  return (
    <div className="bg-[#EBEDEC] w-auto px-2 py-1 rounded-sm cursor-pointer">
      <div className="flex gap-2">
        <div
          className={`rounded-sm w-auto px-3 py-1 ${currentCategory === 'All' ? 'bg-white' : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </div>
        {categories?.map(category => (
          <div
            key={category.id}
            className={`rounded-sm w-auto px-3 py-1 ${currentCategory === category.name ? 'bg-white' : ''}`}
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}
