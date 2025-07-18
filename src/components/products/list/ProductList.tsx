'use client';
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import FilterLayout from '../filter/FilterLayout';
import { useRouter } from "next/navigation";
import { Product } from '@/components/types/products/Product';
import Loading from '@/components/ui/Loading';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const redirectToProductDetail = (productId: string) => {
        router.push(`/product/detail/${productId}`);
    }

    useEffect(() => {
        const getProductsList = async () => {
            try {
                const response = await fetch('http://localhost:3010/products');
                setProducts(await response.json());
            } catch (err) {
                throw new Error('Error loading products', { cause: err });
            } finally {
                setIsLoading(false);
            }
        };

        getProductsList();
    }, []);


    if (isLoading) return <Loading />;

    return (
        <div className="px-8">
            <h1 className="py-8 text-2xl font-bold">Products</h1>
            <FilterLayout />
            <div className="gap-x-2 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {products.map(product => (
                    <ProductItem key={product.id} productId={product.id} redirectToProductDetail={redirectToProductDetail} />
                ))}
            </div>
        </div>
    )
}
