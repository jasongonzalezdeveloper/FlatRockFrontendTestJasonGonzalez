'use client';
import React from 'react';
import Product from './Product';
import FilterLayout from '../filter/FilterLayout';

export default function ProductList() {
    return (
        <div className="px-8">
            <h1 className="py-8 text-2xl font-bold">Products</h1>
            <FilterLayout />
            <div className="gap-x-2 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    )
}
