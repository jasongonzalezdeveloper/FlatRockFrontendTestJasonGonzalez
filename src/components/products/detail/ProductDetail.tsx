'use client';
import React, { useState } from 'react';

import Image from 'next/image'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { useRouter } from "next/navigation";


const options = [
    'black',
    'white',
    'red'
];


export default function ProductDetail() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const router = useRouter();
    const returnToProducts = () => {
        router.push("/product/list");
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
                            src="/images/image-test.jpg"
                            width={625}
                            height={613}
                            alt="Product Image"
                            className="object-cover rounded-lg w-[625px] h-[613px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <div className="text-4xl font-bold mb-2">
                        Product Name
                    </div>
                    <div className="text-2xl text-[#828282] mb-4">
                        Brand
                    </div>
                    <div className="text-2xl font-semibold mb-4">
                        $99.99
                    </div>
                    <span className="text-[#828282] mb-6 block">
                        Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.<br /><br />
                        Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.<br /><br />
                        Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
                    </span>
                    <div className="mb-6">
                        <div className="relative  w-[290px]">
                            <button
                                className="border-b-2 border-black px-0 py-2 text-left flex justify-between items-center cursor-pointer bg-white w-[290px] rounded-none"
                                onClick={() => setOpen(!open)}
                            >
                                <span>Select Option: {selected}</span>
                                {open ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            {open && (
                                <DropdownMenu options={options} selected={selected} setSelected={setSelected} setOpen={setOpen} />
                            )}
                        </div>
                    </div>
                    <div className="mb-6">
                        <button className="bg-black text-white w-full py-5 rounded-lg font-semibold shadow hover:bg-gray-400 transition-colors cursor-pointer">
                            Add to cart
                        </button>
                    </div>
                    <div>
                        <div className=" font-semibold">
                            <span className="text-[#828282]">Available Quantity:</span>
                            <span className="text-[#02C10A]">Stock_quantity</span>
                        </div>
                        <div className="text-[#EE5F81] font-semibold">
                            Out of stock
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
