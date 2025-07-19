'use client';
import React from 'react';
import DropdownFilter from './DropdownFilter';
import CategoryFilter from './CategoryFilter';

type FilterLayoutProps = {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
  onSortByChange: (sortBy?: string) => void;
  onBrandChange: (brand?: string[]) => void;
};

export default function FilterLayout({ onCategoryChange, currentCategory, onSortByChange, onBrandChange }: FilterLayoutProps) {
  return (
    <div className="flex items-center justify-between w-full pb-4">
      <CategoryFilter onCategoryChange={onCategoryChange} currentCategory={currentCategory} />
      <DropdownFilter onSortByChange={onSortByChange} onBrandChange={onBrandChange}/>
    </div>
  )
}
