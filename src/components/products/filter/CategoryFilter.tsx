'use client';
import React from 'react'

export default function CategoryFilter() {
  return (
    <div className="bg-[#F7F7F7] w-auto px-2 py-1 rounded-sm">
      <div className="flex gap-2">
        <div className="bg-white rounded-sm w-auto px-3 py-1">All</div>
        <div className="w-auto p-1">Shoes</div>
        <div className="w-auto p-1">Shirts</div>
      </div>
    </div>
  )
}
