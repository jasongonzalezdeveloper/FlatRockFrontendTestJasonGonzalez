'use client';
import React from 'react';
import DropdownFilter from './DropdownFilter';
import CategoryFilter from './CategoryFilter';

export default function FilterLayout() {
  return (
    <div className="flex items-center justify-between w-full pb-4">
      <CategoryFilter />
      <DropdownFilter />
    </div>
  )
}
