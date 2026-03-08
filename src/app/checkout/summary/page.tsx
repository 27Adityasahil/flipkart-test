"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Check, Star } from 'lucide-react';
import safeSecureImg from '@/assets/safe-n-secure.png';

export default function SummaryPage() {
    const router = useRouter();
    const { cart, cartTotal, discountTotal, cartCount, address } = useCart();

    if (!address || cart.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">Please add items and address first.</p>
                <button
                    onClick={() => router.push('/cart')}
                    className="text-[#2874f0] font-bold"
                >
                    Go back to Cart
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="px-4 py-3 flex items-center bg-white border-b">
                <button onClick={() => router.back()} className="mr-3">
                    <ArrowLeft className="w-5 h-5 text-black" />
                </button>
                <h1 className="text-[16px] font-bold text-black">Order Summary</h1>
            </div>

            {/* Progress Stepper */}
            <div className="px-4 py-6 bg-white border-b">
                <div className="flex items-center justify-between relative max-w-[300px] mx-auto">
                    {/* Connecting Lines */}
                    <div className="absolute top-3 left-6 right-6 h-[1px] bg-gray-300 z-0 flex">
                        <div className="w-1/2 h-full bg-[#2874f0]"></div>
                    </div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center z-10 relative bg-white px-2">
                        <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center mb-2 shadow-sm">
                            <Check className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-black">Address</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center z-10 relative bg-white px-2">
                        <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-xs font-bold mb-2 shadow-sm">2</div>
                        <span className="text-xs text-black">Order Summary</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center z-10 relative bg-white px-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold mb-2">3</div>
                        <span className="text-xs text-gray-400">Payment</span>
                    </div>
                </div>
            </div>

            {/* Address Header Summary */}
            <div className="bg-white p-4 border-b text-[15px] leading-relaxed">
                <div className="text-black mb-1 text-[16px]">Delivered To:</div>
                <div className="text-black">
                    {address.fullName}<br />
                    {address.mobile}<br />
                    {address.houseNo}, {address.roadName}, {address.city}, {address.state} - {address.pincode}
                </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white border-b">
                {cart.map((item, index) => (
                    <div key={item.id} className="p-4 bg-white mt-2">
                        <div className="flex gap-4">
                            <div className="w-16 flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-auto object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[15px] text-gray-900 line-clamp-2 leading-tight">{item.title}</h3>

                                <div className="flex items-center space-x-1.5 mt-1.5 mb-2">
                                    <div className="flex items-center space-x-0.5 text-[#388e3c] text-xs font-bold">
                                        <Star className="w-3 h-3 fill-[#388e3c]" />
                                        <Star className="w-3 h-3 fill-[#388e3c]" />
                                        <Star className="w-3 h-3 fill-[#388e3c]" />
                                        <Star className="w-3 h-3 fill-[#388e3c]" />
                                        <Star className="w-3 h-3 fill-[#388e3c]" />
                                    </div>
                                    <span className="text-gray-500 text-xs">{item.rating} | {item.reviewCount.toLocaleString()} Ratings</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-[#388e3c] text-sm font-bold">↓ {item.discount}% Off</span>
                                    <span className="text-gray-500 line-through text-xs font-medium">₹{(item.originalPrice).toLocaleString()}</span>
                                    <span className="font-bold text-[16px] text-black">₹{(item.currentPrice).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Details */}
            <div className="bg-white p-4">
                <h3 className="font-bold text-black text-[16px] mb-4">Price Details</h3>

                <div className="space-y-4 text-[15px] text-gray-800">
                    <div className="flex justify-between">
                        <span>Price ({cartCount} items)</span>
                        <span>₹{(cartTotal + discountTotal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-[#388e3c] font-medium">-₹{discountTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-[#388e3c]">FREE Delivery</span>
                    </div>
                    <div className="flex justify-between font-bold text-[16px] text-black border-t border-b border-gray-100 py-4 my-2">
                        <span>Total Amount</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-[#388e3c] text-[14px] pt-1">
                        You will save ₹{discountTotal.toLocaleString()} on this order
                    </div>
                </div>
            </div>

            {/* Safe and Secure Tag */}
            <div className="bg-white pb-6 pt-2 px-4 flex justify-center">
                <img src={safeSecureImg.src} alt="Safe and Secure Payments" className="h-10 w-auto object-contain" />
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white p-3 px-4 flex justify-between items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200">
                <div className="flex flex-col">
                    <div className="text-gray-500 text-[13px] line-through font-medium leading-none mb-1">₹{(cartTotal + discountTotal).toLocaleString()}</div>
                    <div className="font-bold text-[18px] text-black leading-none">₹{cartTotal.toLocaleString()}</div>
                </div>
                <button
                    onClick={() => router.push('/checkout/payment')}
                    className="bg-[#ffc200] text-black font-bold py-3.5 px-10 rounded-sm shadow hover:bg-[#e0ab00]"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
