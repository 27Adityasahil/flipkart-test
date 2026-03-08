"use client";

import React from 'react';
import Link from 'next/link';
import { Star, Truck } from 'lucide-react';

const trendingProducts = [
    {
        id: "5",
        slug: "prestige-svachh",
        title: "Prestige 5 Litres Svachh Nakshatra Plus Induction Bas...",
        image: "https://dummyimage.com/400x500/eaeaea/5c5c5c.png&text=Prestige+Cooker",
        rating: "4.4",
        reviewCount: "28,706",
        currentPrice: "345",
        originalPrice: "4,155",
        discount: "93",
        badge: "Trending",
        deliveryText: "Delivery Tomorrow"
    },
    {
        id: "6",
        slug: "prestige-marvel",
        title: "Prestige Marvel Plus 3 Burner Glass Top, GTM 03, Black,...",
        image: "https://dummyimage.com/400x500/eaeaea/5c5c5c.png&text=Prestige+Stove",
        rating: "4.8",
        reviewCount: "52,899",
        currentPrice: "395",
        originalPrice: "5,999",
        discount: "98",
        badge: "Trending",
        deliveryText: "Delivery Tomorrow"
    },
    {
        id: "7",
        slug: "pigeon-cooker",
        title: "Pigeon by Stovekraft Hard Anodised Aluminium Pressur...",
        image: "https://dummyimage.com/400x500/eaeaea/5c5c5c.png&text=Pigeon+Cooker",
        rating: "4.5",
        reviewCount: "53,562",
        currentPrice: "395",
        originalPrice: "5,749",
        discount: "92",
        badge: "Trending",
        deliveryText: "Delivery Tomorrow"
    },
    {
        id: "8",
        slug: "hawkins-cooker",
        title: "Hawkins 3 Litre Contura Black Pressure Cooker, Hard...",
        image: "https://dummyimage.com/400x500/eaeaea/5c5c5c.png&text=Hawkins+Cooker",
        rating: "5.0",
        reviewCount: "41,503",
        currentPrice: "365",
        originalPrice: "3,499",
        discount: "95",
        badge: "Trending",
        deliveryText: "Delivery Tomorrow"
    }
];

export default function TrendingGrid() {
    return (
        <div className="grid grid-cols-2 bg-white">
            {trendingProducts.map((product, index) => (
                <Link
                    href={`/product/${product.slug}`}
                    key={product.id}
                    className={`relative flex flex-col p-2.5 ${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b' : ''} border-gray-200 hover:shadow-md transition-shadow bg-white pb-3 block`}
                >
                    {/* Badge */}
                    <div className="absolute top-0 left-0 bg-[#f7941d] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-br z-10">
                        {product.badge}
                    </div>

                    {/* Image */}
                    <div className="h-32 w-full flex items-center justify-center p-2 mb-2">
                        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                    </div>

                    {/* Title */}
                    <h3 className="text-[12px] font-semibold text-black leading-[1.3] line-clamp-2 mt-1">
                        {product.title}
                    </h3>

                    {/* Pricing Info */}
                    <div className="flex items-center space-x-1.5 mt-1.5">
                        <span className="text-green-600 text-[11px] font-semibold flex items-center">
                            <span className="text-[12px] mr-[1px]">↓</span> {product.discount}% Off
                        </span>
                        <span className="text-gray-400 text-[11px] line-through font-medium">₹{product.originalPrice}</span>
                    </div>

                    <div className="flex items-center mt-0.5 space-x-2">
                        <span className="text-black text-[16px] font-bold">₹{product.currentPrice}</span>
                        <span className="flex items-center border border-blue-200 border-2 rounded-full px-1.5 bg-blue-50 text-[10px] text-blue-800 font-extrabold italic tracking-wider shadow-sm transform -rotate-2">
                            WOW!
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-1">
                        <div className="flex items-center text-green-600 font-semibold text-[11px]">
                            {product.rating}
                            <Star className="w-3 h-3 fill-current ml-[2px]" />
                        </div>
                        <span className="text-gray-400 text-[11px] ml-1">
                            {product.reviewCount} Reviews
                        </span>
                    </div>

                    {/* Delivery & Assured */}
                    <div className="flex items-end justify-between mt-2 flex-grow">
                        <div className="flex flex-col">
                            <div className="flex items-center text-gray-700 font-bold text-[9px] tracking-wide uppercase">
                                <Truck className="w-3.5 h-3.5 mr-1" />
                                EXPRESS
                            </div>
                            <div className="text-gray-500 text-[10px] mt-[1px]">
                                {product.deliveryText}
                            </div>
                        </div>
                        {/* Assured Logo mock */}
                        <div className="flex items-center mb-[2px]">
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-[18px]" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
