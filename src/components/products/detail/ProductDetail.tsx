'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { useParams, useRouter } from "next/navigation";
import { Product } from '@/components/types/products/Product';
import { Category } from '@/components/types/products/Enums';


const options = [
    'black',
    'white',
    'red'
];

export default function ProductDetail() {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [selected, setSelected] = useState<string | null>(null);

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
                setProduct(data);
            } catch (err) {
                console.error(err instanceof Error ? err.message : 'Unknown error');
            }
        }

        getProductDetail();
    }, []);

    const addToCart = () => {

    }

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
                        {product?.price}
                    </div>
                    <span className="text-[#828282] mb-6 block">
                        {product?.description}
                    </span>
                    <div className="mb-6">
                        {product && product?.selectible_option && product?.selectible_option?.option?.length > 0 ? (
                            <div className="relative w-[290px]">
                                <button
                                    className="border-b-2 border-black px-0 py-2 text-left flex justify-between items-center cursor-pointer bg-white w-[290px] rounded-none"
                                    onClick={() => setOpen(!open)}
                                >
                                    <span>Select Option: {selected}</span>
                                    {open ? <ChevronUp /> : <ChevronDown />}
                                </button>
                                {open && (
                                    <DropdownMenu options={product?.selectible_option?.option} selected={selected} setSelected={setSelected} setOpen={setOpen} />
                                )}
                            </div>
                        ) : ''}
                    </div>
                    <div className="mb-6">
                        <button className="bg-black text-white w-full py-5 rounded-lg font-semibold shadow hover:bg-gray-400 transition-colors cursor-pointer" onClick={addToCart}>
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
