"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Trash2, ShieldCheck, Bookmark, Zap, Truck, ChevronDown, Star } from 'lucide-react';
import wowImg from '@/assets/wow.png';
import fAssuredImg from '@/assets/flipkart-assured.png';

export default function CartPage() {
    const router = useRouter();
    const { cart, updateQuantity, removeFromCart, cartTotal, discountTotal, cartCount } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <div className="bg-[#2874f0] px-4 py-3 flex items-center text-white shadow-sm sticky top-0 z-10">
                    <button onClick={() => router.back()} className="mr-4">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-[16px] font-medium">My Cart</h1>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <img src="https://dummyimage.com/200x200/ffffff/cccccc.png&text=Empty+Cart" alt="Empty Cart" className="w-40 mb-6" />
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty!</h2>
                    <p className="text-sm text-gray-500 mb-6">Explore our wide selection and find something you like</p>
                    <button onClick={() => router.push('/')} className="bg-[#2874f0] text-white font-bold py-3 px-12 rounded shadow text-sm">
                        Shop Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pb-[80px]">
            <div className="bg-[#2874f0] px-4 py-3 flex items-center text-white shadow-sm sticky top-0 z-10">
                <button onClick={() => router.back()} className="mr-4">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-[16px] font-medium">My Cart ({cartCount})</h1>
            </div>

            {/* Deliver to placeholder */}
            <div className="bg-white p-3 flex justify-between items-center text-sm border-b mt-2 shadow-sm">
                <div className="font-medium text-gray-800">Deliver to: <span className="font-bold">New Delhi - 110001</span></div>
                <button className="text-[#2874f0] font-bold border rounded px-3 py-1 shadow-sm text-xs">Change</button>
            </div>

            {/* Cart Items */}
            <div className="bg-white mt-2 border-y">
                {cart.map((item, index) => (
                    <div key={item.id} className="bg-white mt-2 border-b">
                        <div className="p-4">
                            <div className="flex gap-4">
                                <div className="w-24 flex-shrink-0 flex flex-col items-center">
                                    <img src={item.image} alt={item.title} className="w-full h-auto object-contain mb-3" />
                                    <div className="relative inline-block w-full">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-1 pl-2 pr-6 rounded shadow-sm text-sm focus:outline-none"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <option key={num} value={num}>Qty: {num}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm text-gray-900 font-medium line-clamp-2 leading-tight">{item.title}</h3>

                                    <div className="flex items-center space-x-1.5 mt-1.5 mb-2">
                                        <div className="flex items-center space-x-0.5 text-[#388e3c] text-xs font-bold">
                                            <Star className="w-3 h-3 fill-[#388e3c]" />
                                            <Star className="w-3 h-3 fill-[#388e3c]" />
                                            <Star className="w-3 h-3 fill-[#388e3c]" />
                                            <Star className="w-3 h-3 fill-[#388e3c]" />
                                            <Star className="w-3 h-3 fill-[#388e3c]" />
                                        </div>
                                        <span className="text-gray-400 text-xs">{item.rating} ({item.reviewCount.toLocaleString()})</span>
                                        <img src={wowImg.src} alt="WOW!" className="h-3 object-contain ml-1 grayscale opacity-60" />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className="text-[#388e3c] text-sm font-bold">↓ {item.discount}% Off</span>
                                        <span className="text-gray-500 line-through text-xs font-medium">₹{item.originalPrice.toLocaleString()}</span>
                                        <span className="font-bold text-lg text-black">₹{item.currentPrice.toLocaleString()}</span>
                                    </div>

                                    <div className="flex items-center text-xs mt-1 space-x-1">
                                        <img src={wowImg.src} alt="WOW!" className="h-3 object-contain grayscale opacity-60" />
                                        <span className="text-gray-800">Buy at <span className="font-bold">₹{item.currentPrice - 50}</span></span>
                                    </div>

                                </div>
                            </div>

                            <div className="mt-4 flex items-center text-[13px] text-gray-700">
                                <div className="flex items-center font-bold mr-1 text-[#2874f0]">
                                    <Truck className="w-4 h-4 mr-1 text-[#2874f0]" />
                                    EXPRESS
                                </div>
                                <span>{item.deliveryText.replace('Free Delivery ', 'Delivery ')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 border-t text-[13px] font-medium text-gray-700">
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex items-center justify-center py-3 hover:text-[#2874f0] hover:bg-gray-50 transition-colors"
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </button>
                            <button className="flex items-center justify-center py-3 border-l hover:text-[#2874f0] hover:bg-gray-50 transition-colors">
                                <Bookmark className="w-4 h-4 mr-2" /> Save for later
                            </button>
                            <button className="flex items-center justify-center py-3 border-l hover:text-[#2874f0] hover:bg-gray-50 transition-colors">
                                <Zap className="w-4 h-4 mr-2 fill-current" /> Buy this now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Details */}
            {/* Price Details */}
            <div className="bg-white p-4 mt-2">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="font-bold text-black text-[15px]">Price Details</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>

                <div className="space-y-4 text-[14px] text-gray-800">
                    <div className="flex justify-between">
                        <span>Price ({cartCount} items)</span>
                        <span>₹{(cartTotal + discountTotal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#388e3c]">Discount</span>
                        <span className="text-[#388e3c] font-medium">- ₹{discountTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between font-bold text-[16px] text-black border-t border-dashed pt-4 mt-2 border-b pb-4 mb-2">
                        <span>Total Amount</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-[#388e3c] font-bold text-[13px] pt-1">
                        You will save ₹{discountTotal.toLocaleString()} on this order
                    </div>
                </div>
            </div>

            {/* Safety Badge */}
            <div className="px-4 py-8 flex items-center text-gray-600 text-[13px]">
                <ShieldCheck className="w-8 h-8 mr-3 text-gray-400 flex-shrink-0" />
                <p>
                    <span className="font-bold text-black">Safe and secure payments.</span> Easy returns. 100% Authentic products.
                </p>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t p-3 flex justify-between items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <div>
                    <div className="text-sm text-gray-500 font-medium">Total Price</div>
                    <div className="font-bold text-xl text-gray-900">₹{cartTotal.toLocaleString()}</div>
                </div>
                <button
                    onClick={() => router.push('/checkout/address')}
                    className="bg-[#fb641b] text-white font-bold py-3 px-8 rounded shadow text-[15px] hover:bg-[#e05a18]"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}
