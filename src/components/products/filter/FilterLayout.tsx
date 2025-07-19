'use client';
import React from 'react';
import DropdownFilter from './DropdownFilter';
import CategoryFilter from './CategoryFilter';

type FilterLayoutProps = {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
  onSortByChange: (sortBy?: string) => void;
  onBrandChange: (brand?: string[]) => void;
  categories: string[];
  priceRange?: [number, number];
  getPriceRangeFilter: (prices: number[]) => void;
};

export default function FilterLayout({ 
  onCategoryChange, 
  currentCategory, onSortByChange, onBrandChange, categories, priceRange, getPriceRangeFilter 
}: FilterLayoutProps) {
  return (
    <div className="flex items-center justify-between w-full pb-4">
      <CategoryFilter onCategoryChange={onCategoryChange} currentCategory={currentCategory} categories={categories} />
      <DropdownFilter onSortByChange={onSortByChange} onBrandChange={onBrandChange} priceRange={priceRange} getPriceRangeFilter={getPriceRangeFilter} />
    </div>
  )
}
