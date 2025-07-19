'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ProductItem from './ProductItem';
import FilterLayout from '../filter/FilterLayout';
import { useRouter } from "next/navigation";
import { Product } from '@/components/types/products/Product';
import Loading from '@/components/ui/Loading';
import { Category, optionsByDropdownValues } from '@/components/types/products/Enums';
import { Pagination, PaginationItem, Stack } from '@mui/material';


export default function ProductList() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('All');
    const [selectedBrandNames, setSelectedBrandNames] = useState<string[]>([]); // Cambiado a string[]
    const [sortByValue, setSortByValue] = useState<string>();
    const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const productsPerPage = 12;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('http://localhost:3010/products'),
                    fetch('http://localhost:3010/categories')
                ]);

                const products = await productsRes.json();
                const categories = await categoriesRes.json();

                setAllProducts(products);
                setCategoryList(categories);
            } catch (err) {
                console.error(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        getPriceRange(allProducts);
    }, [allProducts]);

    const getPriceRange = (products: Product[]) => {
        if (products.length > 0) {
            const prices = products.map((p: Product) => p.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange([minPrice, maxPrice]);
        } else {
            setPriceRange([0, 0]);
        }
    }

    const getPriceRangeFilter = (prices: number[]) => {
        setSelectedPriceRange(prices);
    }

    const sortProducts = (products: Product[], sortBy?: string) => {
        if (!sortBy) return products;

        const sorted = [...products];
        switch (sortBy) {
            case optionsByDropdownValues.dateAsc:
                return sorted.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
            case optionsByDropdownValues.dateDesc:
                return sorted.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
            case optionsByDropdownValues.priceAsc:
                return sorted.sort((a, b) => a.price - b.price);
            case optionsByDropdownValues.priceDesc:
                return sorted.sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };

    const filteredProducts = useMemo(() => {
        let result = allProducts;

        // Apply category filter
        if (categoryFilter !== 'All') {
            result = result.filter(product => product.category === categoryFilter);
        }

        // Apply brand filter
        if (selectedBrandNames.length > 0) {
            result = result.filter(product => selectedBrandNames.includes(product.brand));
        }

        // Apply price filter
        if (selectedPriceRange) {
            result = result.filter(product =>
                product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
            );
        }

        return sortProducts(result, sortByValue);
    }, [allProducts, categoryFilter, selectedBrandNames, sortByValue, selectedPriceRange]);

    const paginatedProducts = useMemo(() => {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const redirectToProductDetail = (productId: string) => {
        router.push(`/product/detail/${productId}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="px-8">
            <h1 className="py-8 text-2xl font-bold">Products</h1>
            <FilterLayout
                onCategoryChange={setCategoryFilter}
                currentCategory={categoryFilter}
                categories={categoryList}
                priceRange={priceRange}
                getPriceRangeFilter={getPriceRangeFilter}
                onSortByChange={setSortByValue}
                onBrandChange={setSelectedBrandNames}
                availableBrands={Array.from(new Set(allProducts.map(p => p.brand)))} // Pasar solo los nombres
            />
            <div className="gap-x-2 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {paginatedProducts.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        {selectedBrandNames.length > 0 || categoryFilter !== 'All'
                            ? "No products match your filters"
                            : "No products available"}
                    </div>
                ) : (
                    paginatedProducts.map(product => (
                        <ProductItem
                            key={product.id}
                            productInfo={product}
                            redirectToProductDetail={redirectToProductDetail}
                        />
                    ))
                )}
            </div>
            <div className="flex justify-end py-6">
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(filteredProducts.length / productsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem {...item} />
                        )}
                    />
                </Stack>
            </div>
        </div>
    );
}