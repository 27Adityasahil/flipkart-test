import React from 'react';
import Link from 'next/link';
import { Product } from '@/context/CartContext';
import { Star, Truck } from 'lucide-react';
import wowImg from '@/assets/wow.png';
import fAssuredImg from '@/assets/flipkart-assured.png';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/product/${product.slug}`} className="flex flex-col bg-white overflow-hidden h-full relative pb-3 pt-8 px-3 hover:shadow-md transition-shadow duration-200">
            {/* Trending Tag */}
            <div className={`absolute top-0 left-0 text-white text-[10px] font-medium px-2 py-0.5 rounded-br-md ${product.badge === 'Trending' ? 'bg-[#f48a33]' : 'bg-transparent'}`}>
                {product.badge === 'Trending' ? 'Trending' : ''}
            </div>

            {/* Image Section */}
            <div className="w-full relative h-[140px] flex items-center justify-center mb-4">
                <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col flex-1">
                <h3 className="text-sm font-bold text-black line-clamp-2 leading-tight">{product.title}</h3>

                <div className="mt-2 flex items-center space-x-1.5">
                    <span className="text-[#388e3c] text-sm font-bold">↓ {product.discount}% Off</span>
                    <span className="text-gray-500 line-through text-xs font-semibold">₹{product.originalPrice.toLocaleString()}</span>
                </div>

                <div className="mt-1 flex items-center space-x-2">
                    <span className="font-bold text-lg text-black">₹{product.currentPrice.toLocaleString()}</span>
                    <img src={wowImg.src} alt="WOW!" className="h-[18px] object-contain ml-1" />
                </div>

                <div className="flex items-center space-x-1.5 mt-2">
                    <div className="flex items-center space-x-0.5 text-[#388e3c] text-xs font-bold">
                        <span>{product.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-gray-400 text-xs">{product.reviewCount.toLocaleString()} Reviews</span>
                </div>

                <div className="mt-3 flex items-start justify-between">
                    <div className="text-[10px] text-gray-700 font-medium flex flex-col">
                        <div className="flex items-center space-x-1 font-bold">
                            <Truck className="w-3.5 h-3.5 text-gray-600" />
                            <span>EXPRESS</span>
                        </div>
                        <span className="mt-0.5">{product.deliveryText.replace('Free Delivery ', 'Delivery ')}</span>
                    </div>
                    <div className="flex-shrink-0 self-end mb-0.5">
                        <img src={fAssuredImg.src} alt="Flipkart Assured" className="h-[18px] object-contain" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
