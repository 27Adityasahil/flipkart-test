"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/context/CartContext";

interface Props {
    product: Product;
}

export default function ProductActions({ product }: Props) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleBuyNow = () => {
        addToCart(product);
        router.push("/cart");
    };

    return (
        <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t flex z-50">
            <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-[#212121] font-medium py-3.5 text-[15px] flex items-center justify-center gap-2 active:bg-gray-50"
            >
                <ShoppingCart className="w-[18px] h-[18px]" />
                Add to Cart
            </button>
            <div className="w-[1px] bg-gray-200"></div>
            <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#fb641b] text-white font-bold py-3.5 text-[15px] flex items-center justify-center active:opacity-90"
            >
                Buy Now
            </button>
        </div>
    );
}
