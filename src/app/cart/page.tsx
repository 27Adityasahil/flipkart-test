"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Trash2, ShieldCheck } from 'lucide-react';

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
                    <div key={item.id} className={`p-4 ${index !== cart.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex gap-4">
                            <div className="w-24 flex-shrink-0 flex flex-col items-center">
                                <img src={item.image} alt={item.title} className="w-full h-auto object-contain mb-3" />
                                <div className="flex items-center border rounded shadow-sm">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 bg-gray-50 border-r"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <div className="w-10 h-8 flex items-center justify-center text-sm font-medium text-black">
                                        {item.quantity}
                                    </div>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 bg-gray-50 border-l"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm text-gray-900 font-medium line-clamp-2">{item.title}</h3>
                                <div className="text-xs text-gray-500 mt-1 mb-2">Seller: Flipkart Retail</div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500 line-through text-xs">₹{item.originalPrice.toLocaleString()}</span>
                                    <span className="font-bold text-lg text-gray-800">₹{item.currentPrice.toLocaleString()}</span>
                                    <span className="text-green-600 text-[10px] font-bold">{item.discount}% off</span>
                                </div>
                                {item.offers.length > 0 && (
                                    <div className="text-[10px] text-green-600 font-medium mt-1">
                                        {item.offers.length} offers applied
                                    </div>
                                )}
                                <div className="flex items-center mt-4">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="flex items-center text-gray-500 font-medium text-xs hover:text-[#2874f0] uppercase tracking-wider bg-gray-100 py-1.5 px-3 rounded"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Details */}
            <div className="bg-white p-4 mt-2 border-y">
                <h3 className="font-bold text-gray-500 text-sm uppercase mb-4 tracking-wider border-b pb-3">Price Details</h3>
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
                    <div className="flex justify-between font-bold text-lg border-t border-dashed pt-3 mt-3">
                        <span>Total Amount</span>
                        <span className="text-gray-900">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-green-600 font-bold text-xs pt-1">
                        You will save ₹{discountTotal.toLocaleString()} on this order
                    </div>
                </div>
            </div>

            {/* Safety Badge */}
            <div className="p-4 flex items-center text-gray-500 text-xs mb-[20px]">
                <ShieldCheck className="w-6 h-6 mr-2 text-gray-400" />
                Safe and Secure Payments. Easy returns. 100% Authentic products.
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
