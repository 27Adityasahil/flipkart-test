import React from 'react';
import Link from 'next/link';
import { Product } from '@/context/CartContext';
import { Star, Truck } from 'lucide-react';
import fAssuredImg from '@/assets/flipkart-assured.png';
import wowImg from '@/assets/wow.png';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/product/${product.slug}`} className="flex flex-col bg-white overflow-hidden h-full relative p-3 border-r border-b border-gray-100 transition-shadow">
            {/* Trending Tag */}
            {product.badge === 'Trending' && (
                <div className="absolute left-0 top-0 bg-[#f48a33] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm z-10 w-fit uppercase">
                    Trending
                </div>
            )}

            {/* Image Section */}
            <div className="w-full relative h-[150px] flex items-center justify-center mb-3 mt-2">
                <img src={product.image} alt={product.title} className="max-w-full max-h-[140px] object-contain flex-shrink-0" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col flex-1 px-1">
                <h3 className="text-[14px] text-[#212121] line-clamp-2 leading-snug mb-2 font-medium min-h-[40px]">{product.title}</h3>

                <div className="flex items-center space-x-1.5 text-[14px] mb-0.5 mt-2">
                    <span className="text-[#388e3c] font-bold">↓ {product.discount}% Off</span>
                    <span className="text-[#878787] line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                    <span className="font-bold text-[18px] text-[#212121]">₹{product.currentPrice.toLocaleString()}</span>
                    <img src={wowImg.src} alt="WOW badge" className="h-[20px] w-auto object-contain" />
                </div>

                {/* Rating & Reviews - notice the rating doesn't have a background block in the mockup */}
                <div className="flex items-center space-x-1.5 mb-2 mt-auto">
                    <div className="flex items-center space-x-0.5 text-[#388e3c] text-[13px] font-bold">
                        <span>{product.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-[#878787] text-[12px] font-medium">{product.reviewCount.toLocaleString()} Reviews</span>
                </div>

                {/* Delivery & Assured */}
                <div className="flex items-end justify-between mt-1 pt-1">
                    <div className="flex flex-col items-start text-[#878787]">
                        <div className="font-bold text-[12px] mb-0.5 flex items-center uppercase tracking-tight text-[#424242]">
                            <Truck className="w-4 h-4 mr-1 text-gray-600" />
                            EXPRESS
                        </div>
                        <span className="text-[#212121] text-[12px] font-medium mt-0.5">{product.deliveryText.replace('Free Delivery ', 'Delivery ')}</span>
                    </div>
                    <img src={fAssuredImg.src} alt="Assured badge" className="h-[21px] w-auto object-contain mb-1" />
                </div>
            </div>
        </Link>
    );
}
