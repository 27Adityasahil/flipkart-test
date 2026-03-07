"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Check } from 'lucide-react';

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
        <div className="flex flex-col min-h-screen">
            {/* Address Header Summary */}
            <div className="bg-white p-4 border-b">
                <div className="flex items-center space-x-2 text-sm text-gray-800 font-medium mb-1">
                    <span>Deliver to:</span>
                    <span className="font-bold">{address.fullName}, {address.pincode}</span>
                    <div className="ml-auto bg-gray-100 text-[#2874f0] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm cursor-pointer" onClick={() => router.push('/checkout/address')}>
                        CHANGE
                    </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">
                    {address.houseNo}, {address.roadName}, {address.city}, {address.state}
                </p>
            </div>

            {/* Cart Items */}
            <div className="bg-white mt-2 border-y">
                {cart.map((item, index) => (
                    <div key={item.id} className={`p-4 ${index !== cart.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex gap-4">
                            <div className="w-16 flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-auto object-contain" />
                            </div>
                            <div className="flex-1 text-sm">
                                <h3 className="text-gray-900 font-medium line-clamp-1">{item.title}</h3>
                                <div className="text-xs text-gray-500 mt-1 mb-2">Seller: Flipkart Retail</div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500 line-through text-xs">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                                    <span className="font-bold text-[15px] text-gray-800">₹{(item.currentPrice * item.quantity).toLocaleString()}</span>
                                    <span className="text-green-600 text-[10px] font-bold">{item.discount}% off</span>
                                </div>
                                <div className="mt-2 text-xs font-medium text-gray-600 border px-2 py-1 rounded inline-block bg-gray-50">
                                    Qty : {item.quantity}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Email notification */}
            <div className="bg-white p-3 mt-2 border-y flex items-center justify-between text-sm shadow-sm">
                <div className="flex flex-col">
                    <span className="text-gray-800 font-medium">Order updates will be sent to</span>
                    <span className="text-gray-500 font-bold block mt-0.5 text-xs">{address.mobile}</span>
                </div>
                <Check className="w-5 h-5 text-green-500" />
            </div>

            {/* Price Details Summary */}
            <div className="bg-white p-4 mt-2 border-y mb-6">
                <h3 className="font-bold text-gray-500 text-sm uppercase mb-4 tracking-wider">Price Details</h3>
                <div className="space-y-3 text-sm text-gray-800">
                    <div className="flex justify-between">
                        <span>Price ({cartCount} items)</span>
                        <span>₹{(cartTotal + discountTotal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-600 font-medium">- ₹{discountTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-[16px] border-t border-dashed pt-3 mt-3">
                        <span>Total Payable</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t p-3 flex justify-between items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <div>
                    <div className="text-gray-500 text-xs line-through mb-0.5">₹{(cartTotal + discountTotal).toLocaleString()}</div>
                    <div className="font-bold text-[18px] text-gray-900">₹{cartTotal.toLocaleString()}</div>
                </div>
                <button
                    onClick={() => router.push('/checkout/payment')}
                    className="bg-[#fb641b] text-white font-bold py-3.5 px-8 rounded shadow text-[15px] hover:bg-[#e05a18]"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
