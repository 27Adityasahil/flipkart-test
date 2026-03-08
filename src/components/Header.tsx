"use client";

import React from 'react';
import { Search, ShoppingCart, Menu, ChevronDown, Bell } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const { cartCount } = useCart();

    return (
        <header className="bg-[#2874f0] text-white">
            {/* Top Main Nav */}
            <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Menu className="w-6 h-6" />
                    <Link href="/" className="flex flex-col">
                        <span className="font-bold text-lg italic tracking-tighter">Flipkart</span>
                        <span className="text-[10px] text-gray-200 flex items-center italic hover:underline">
                            Explore <span className="text-yellow-400 font-bold ml-1">Plus</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Bell className="w-5 h-5" />
                    <Link href="/cart" className="relative group flex items-center">
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#2874f0]">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <span className="text-sm font-medium">Login</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-3 pb-3">
                <div className="bg-white rounded flex items-center px-2 py-1.5 shadow-sm text-gray-500">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className="w-full outline-none text-sm text-black"
                        readOnly
                    />
                </div>
            </div>

        </header>
    );
}
