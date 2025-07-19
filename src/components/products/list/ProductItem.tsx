'use client';
import React from 'react';

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react';

import { useState } from 'react';
import { Product } from '@/components/types/products/Product';
import { Category } from '@/components/types/products/Enums';

type ProductProps = {
    productInfo: Product;
    redirectToProductDetail: (productId: string) => void;
};
export default function ProductItem({ productInfo, redirectToProductDetail }: ProductProps) {
    const [cartColor, setCartColor] = useState('#08BB4F');

    return (
        <>
            <div className="w-[232px] text-[#667085] hover:bg-[#667085] transition-colors duration-300 hover:text-white border-[#F7F5F7] border-[1.54px] relative rounded-lg overflow-hidden cursor-pointer" onClick={() => redirectToProductDetail(productInfo.id)}>
                <div className="absolute top-2 right-2 z-10 cursor-pointer" onClick={e => e.stopPropagation()}>
                    <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 shadow">
                        <ShoppingBag color={cartColor} size={20} />
                    </div>
                </div>
                <div className="h-[245px] bg-gray-100 px-4 py-7 flex items-center justify-center">
                    <Image
                        src={productInfo?.category === Category.Shoes ? "/images/shoes.png" : "/images/t-shirt.png"}
                        alt="Product Image"
                        width={232}
                        height={245}
                        className="object-cover" />
                </div>
                <div className="pt-3 pb-1 pl-2 ">
                    <h2 className="font-bold">{productInfo?.product_name}</h2>
                </div>
                <div className="pb-3 pl-2 ">
                    <h3 className="text-xs font-normal">{productInfo?.brand}</h3>
                </div>
                <div className="py-3 px-2 text-center border-t-[#F7F5F7] border-t-[1px]">
                    ${productInfo?.price}
                </div>
            </div>
        </>

    )
}
