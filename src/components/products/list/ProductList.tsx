'use client';
import React from 'react';
import Product from './Product';
import FilterLayout from '../filter/FilterLayout';
import { useRouter } from "next/navigation";

export default function ProductList() {
    const router = useRouter();
    const redirectToProductDetail = (productId: string) => {
       router.push(`/product/detail/${productId}`);
    }

    return (
        <div className="px-8">
            <h1 className="py-8 text-2xl font-bold">Products</h1>
            <FilterLayout />
            <div className="gap-x-2 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                <Product redirectToProductDetail={redirectToProductDetail} />
                <Product redirectToProductDetail={redirectToProductDetail} />
                <Product redirectToProductDetail={redirectToProductDetail} />
                <Product redirectToProductDetail={redirectToProductDetail} />
                <Product redirectToProductDetail={redirectToProductDetail} />
                <Product redirectToProductDetail={redirectToProductDetail} />
            </div>
        </div>
    )
}
