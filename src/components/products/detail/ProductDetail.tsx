'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { useParams, useRouter } from "next/navigation";
import { Product } from '@/components/types/products/Product';
import { Category } from '@/components/types/products/Enums';
import { UseCart } from '@/components/hooks/UseCart';
import toast from 'react-hot-toast';
import Loading from '@/components/ui/Loading';

export default function ProductDetail() {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product | undefined>();
    const [selected, setSelected] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, setProductToCartItem } = UseCart();

    const router = useRouter();
    const params = useParams();
    const returnToProducts = () => {
        router.push("/product/list");
    }


    useEffect(() => {
        const { id } = params;
        const getProductDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3010/products/${id}`);
                const data = await response.json();
                const updatedProduct = {
                    ...data,
                    stock_quantity: refreshQuantity(data)
                };
                setProduct(updatedProduct);
            } catch (err) {
                console.error(err instanceof Error ? err.message : 'Unknown error');
            }
        }
        getProductDetail();
    }, []);

    const refreshQuantity = (product: Product) => {
        const savedCart = localStorage.getItem('cart');
        const item = savedCart ? JSON.parse(savedCart).find((item: { id: string; }) => item.id === product.id) : null;
        return item ? item.quantity : product.stock_quantity;
    }

    const onClickAddToCart = () => {
        setError(null);
        if (product) {
            if (product?.stock_quantity === 0) {
                setError('This product is out of stock');
                return;
            }

            if (product && product?.selectible_option && product?.selectible_option?.option?.length > 0 && !selected) {
                setError('Please select an option before adding to cart');
                return;
            }

            product.stock_quantity -= 1;
            addToCart(setProductToCartItem(product!, selected ?? ""));
            toast.success("Product added to cart!");
        }
    };

    const onSelectOption = (option: string) => {
        setError(null);
        setSelected(option);
    }

    if (!product) return <Loading />;

    return (
        <>
            <div className="mb-8 px-8 pt-8 flex items-center gap-2 cursor-pointer w-fit" onClick={returnToProducts}>
                <ArrowLeft className="w-6 h-6" />
                <span className="text-2xl font-semibold">Go back</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 px-16 ">
                <div className="flex items-center justify-center">
                    <div className="w-[625px] h-[613px] flex items-center justify-center">
                        <Image
                            src={product?.category === Category.Shoes ? "/images/shoes.png" : "/images/t-shirt.png"}
                            width={625}
                            height={613}
                            alt="Product Image"
                            className="object-cover rounded-lg w-[625px] h-[613px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <div className="text-4xl font-bold mb-2">
                        {product?.product_name}
                    </div>
                    <div className="text-2xl text-[#828282] mb-4">
                        {product?.brand}
                    </div>
                    <div className="text-2xl font-semibold mb-4">
                        ${product?.price}
                    </div>
                    <span className="text-[#828282] mb-6 block">
                        {product?.description}
                    </span>
                    <div className="mb-6">
                        {product && product?.selectible_option && product?.selectible_option?.option?.length > 0 ? (
                            <div className="relative w-[290px]">
                                <button
                                    className={`border-b-2 px-0 py-2 text-left flex justify-between items-center cursor-pointer bg-white w-[290px] rounded-none ${error ? "border-[#EA2B2B]" : "border-black"}`}
                                    onClick={() => setOpen(!open)}
                                >
                                    <span>Select {product?.selectible_option.option_name}: {selected}</span>
                                    {open ? <ChevronUp /> : <ChevronDown />}
                                </button>
                                {open && (
                                    <DropdownMenu options={product?.selectible_option?.option} selected={selected} setSelected={onSelectOption} setOpen={setOpen} />
                                )}
                            </div>
                        ) : ''}
                    </div>
                    <div className="mb-6">
                        <button
                            className="bg-black text-white w-full py-5 rounded-lg font-semibold shadow hover:bg-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                            onClick={onClickAddToCart}
                            disabled={product?.stock_quantity === 0}>
                            Add to cart
                        </button>
                    </div>
                    <div>
                        {
                            product?.stock_quantity == 0 ? (
                                <div className="text-[#EE5F81] font-semibold">
                                    Out of stock
                                </div>
                            ) : (
                                <div className=" font-semibold">
                                    <span className="text-[#828282]">Available Quantity:</span>
                                    <span className="text-[#02C10A] pl-2">{product?.stock_quantity}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>

    )
}
