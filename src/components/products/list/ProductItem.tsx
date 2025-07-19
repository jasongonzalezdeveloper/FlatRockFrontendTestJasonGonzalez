'use client';
import React, { useEffect } from 'react';

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react';

import { useState } from 'react';
import { Product } from '@/components/types/products/Product';
import { Category } from '@/components/types/products/Enums';
import { UseCartContext } from '@/components/hooks/CartContext';
import toast from 'react-hot-toast';
import { CartItem } from '@/components/types/CartItem';
import QuickAddModal from './ProductModal';


type ProductProps = {
    productInfo: Product;
    redirectToProductDetail: (productId: string) => void;
};
export default function ProductItem({ productInfo, redirectToProductDetail }: ProductProps) {
    const [cartColor, setCartColor] = useState('black');
    const [selected, setSelected] = useState<string | null>(null);
    const [availableStock, setAvailableStock] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cart, addToCart, setProductToCartItem } = UseCartContext();

    useEffect(() => {
        if (productInfo) {
            const quantityInCart = cart
                .filter((item: CartItem) => item.id === productInfo.id && item.option_type === (selected ?? ""))
                .reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

            setAvailableStock(productInfo.stock_quantity - quantityInCart);
        }
    }, [cart, productInfo, selected]);

    useEffect(() => {
        const existsInCart = cart.some((item: CartItem) => item.id === productInfo.id);
        setCartColor(existsInCart ? '#08BB4F' : 'black');
    }, [cart, productInfo.id]);

    const onClickAddToCart = () => {
        if (productInfo) {
            if (availableStock === 0) {
                toast.error("Product is out of stock!");
                return;
            }

            if (productInfo.selectible_option && productInfo.selectible_option.option.length > 0) {
                setIsModalOpen(true);
                toast.error('Please select an option before adding to cart');
                return;
            }

            setCartColor('#08BB4F');
            addToCart(setProductToCartItem(productInfo, selected ?? "", productInfo?.selectible_option?.option_name ?? ""));
            toast.success("Product added to cart!");
            setSelected(null);
        }
    };

    const handleOptionSelected = (option: string) => {
        setSelected(option);
    }

    return (
        <>
            <div className="w-full text-[#667085] hover:bg-[#667085] transition-colors duration-300 hover:text-white border-[#F7F5F7] border-[1.54px] relative rounded-lg overflow-hidden cursor-pointer" onClick={() => redirectToProductDetail(productInfo.id)}>
                <div className="absolute top-2 right-2 z-10 cursor-pointer" onClick={e => { e.stopPropagation(); onClickAddToCart(); }}>
                    <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 shadow">
                        <ShoppingBag color={cartColor} size={20} />
                    </div>
                </div>
                <div className="h-[245px] bg-gray-100 px-4 py-10 flex items-center justify-center">
                    <Image
                        src={productInfo?.category === Category.Shoes ? "/images/shoes.png" : "/images/t-shirt.png"}
                        alt="Product Image"
                        width={232}
                        height={200}
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
            <QuickAddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productInfo={productInfo}
            />
        </>

    )
}
