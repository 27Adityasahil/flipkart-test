"use client";

import React from 'react';
import Link from 'next/link';
import { Product } from '@/context/CartContext';
import { Star } from 'lucide-react';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/product/${product.slug}`} className="block bg-white p-3 border-b flex items-start gap-4">
            {/* Image Section */}
            <div className="w-32 flex-shrink-0 relative">
                <img src={product.image} alt={product.title} className="w-full h-auto object-contain bg-gray-100 p-2 rounded" />
                <div className="absolute top-1 left-1 bg-white text-[10px] font-bold px-1 rounded shadow-sm border text-gray-800">
                    {product.badge}
                </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-center min-h-[120px]">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{product.title}</h3>

                <div className="flex items-center space-x-1 mt-1">
                    <div className="flex items-center space-x-1 bg-green-600 px-1.5 py-0.5 rounded text-white text-[10px] font-bold">
                        <span>{product.rating}</span>
                        <Star className="w-2.5 h-2.5 fill-current" />
                    </div>
                    <span className="text-gray-500 text-xs">({product.reviewCount.toLocaleString()})</span>
                </div>

                <div className="mt-2 flex items-center space-x-2">
                    <span className="font-semibold text-lg text-gray-900">₹{product.currentPrice.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-green-600 text-xs font-bold">{product.discount}% off</span>
                </div>

                <div className="text-[10px] text-gray-500 mt-1">{product.deliveryText}</div>
            </div>
        </Link>
    );
}
