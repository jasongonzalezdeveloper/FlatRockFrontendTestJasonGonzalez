import { UseCartContext } from "@/components/hooks/CartContext";
import { CartItem } from "@/components/types/CartItem";
import { Product } from "@/components/types/products/Product";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';


type QuickAddModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productInfo: Product;
    onOptionSelected: (selectedValue: string) => void;
};

export default function QuickAddModal({
    isOpen,
    onClose,
    productInfo,
    onOptionSelected
}: QuickAddModalProps) {
    const [selectedValue, setSelectedValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [availableStock, setAvailableStock] = useState<number>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { cart, addToCart, setProductToCartItem } = UseCartContext();
 
    useEffect(() => {
        if (productInfo) {
            const quantityInCart = cart
                .filter((item: CartItem) => item.id === productInfo.id && item.option_type === (selectedValue ?? ""))
                .reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

            setAvailableStock(productInfo.stock_quantity - quantityInCart);
        }
    }, [cart, productInfo, selectedValue]);

    const handleSubmit = () => {
        if (!selectedValue) {
            setError("Please select an option");
            return;
        } else {
            setError(null);
        }
        setSelectedValue(selectedValue);
        onClickAddToCart();
        onClose();
    }

    const onClickAddToCart = () => {
        if (productInfo) {
            if (availableStock === 0) {
                toast.error("Product is out of stock!");
                return;
            }

            addToCart(setProductToCartItem(productInfo, selectedValue ?? "", productInfo?.selectible_option?.option_name ?? ""));
            toast.success("Product added to cart!");
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {(productInfo && productInfo.selectible_option) ? (
                <div ref={dropdownRef} className="bg-white p-6 rounded-lg w-80">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Select {productInfo?.selectible_option?.option_name || ""}</h3>
                        <button onClick={onClose}>
                            <X className="text-gray-500 cursor-pointer" size={20} />
                        </button>
                    </div>
                    <select
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        className={`w-full p-2 border-b-2 rounded mb-4 ${error ? "border-[#EA2B2B]" : "border-black"}`}
                    >
                        <option value="">-- Select an option --</option>
                        {productInfo?.selectible_option?.option.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                        className="w-full bg-black text-white hover:bg-gray-400 py-3 rounded-lg font-semibold shadow transition-colors cursor-pointer"
                    >
                        Add to cart
                    </button>
                </div>
            ) : ("")}

        </div>
    );
}