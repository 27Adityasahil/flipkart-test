"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function PaymentPage() {
    const router = useRouter();
    const { cartTotal, paymentMethod, setPaymentMethod, clearCart } = useCart();
    const [success, setSuccess] = useState(false);

    const handlePay = () => {
        // Dummy successful checkout
        setSuccess(true);
        setTimeout(() => {
            clearCart();
            router.push('/');
        }, 3000);
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 bg-white mx-4 mt-10 rounded shadow-md border">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl text-green-500">✓</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                <p className="text-sm text-gray-500">Thank you for shopping with Flipkart.</p>
                <div className="text-sm mt-4 p-3 bg-gray-50 border rounded w-full">
                    Paid via <span className="font-bold">{paymentMethod}</span>
                </div>
                <p className="text-xs text-gray-400 mt-6">Redirecting to home...</p>
            </div>
        );
    }

    const upiOptions = [
        { id: 'phonepe', name: 'PhonePe', icon: '📱' },
        { id: 'gpay', name: 'Google Pay', icon: 'G' },
        { id: 'paytm', name: 'Paytm', icon: '₽' },
        { id: 'other', name: 'Other UPI ID', icon: '↗' },
    ];

    return (
        <div className="flex flex-col">
            <div className="bg-[#2874f0] p-3 text-white text-sm font-medium sticky top-[48px] z-10">
                Step 3 of 3: Payment
            </div>

            <div className="bg-white p-4">
                {/* UPI Section */}
                <div className="border border-blue-500 rounded p-4 bg-blue-50/30 mb-4 shadow-sm relative">
                    <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-bl rounded-tr border-l border-b border-blue-200">
                        RECOMMENDED
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            checked={paymentMethod.includes('UPI') || paymentMethod === 'phonepe' || paymentMethod === 'gpay'}
                            onChange={() => setPaymentMethod('UPI')}
                            className="w-4 h-4 text-[#2874f0]"
                            readOnly
                        />
                        <label className="ml-3 font-bold text-gray-800">UPI</label>
                    </div>

                    <div className="ml-7 space-y-3">
                        {upiOptions.map(opt => (
                            <label key={opt.id} className="flex items-center border p-3 rounded bg-white shadow-sm cursor-pointer">
                                <input
                                    type="radio"
                                    name="upiOpt"
                                    checked={paymentMethod === opt.name}
                                    onChange={() => setPaymentMethod(opt.name)}
                                    className="w-4 h-4 text-[#2874f0]"
                                />
                                <div className="ml-3 flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center bg-gray-100 text-xs rounded mr-2 font-bold">{opt.icon}</span>
                                    <span className="text-sm font-medium">{opt.name}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Disabled Other Options */}
                <div className="space-y-4">
                    {['Credit / Debit / ATM Card', 'Net Banking', 'Cash on Delivery (COD)'].map(opt => (
                        <div key={opt} className="border rounded p-4 flex items-center opacity-50 cursor-not-allowed bg-gray-50">
                            <input type="radio" disabled className="w-4 h-4" />
                            <label className="ml-3 font-medium text-gray-600 text-sm">{opt}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t p-3 flex justify-between items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <div>
                    <div className="font-bold text-[18px] text-gray-900">₹{cartTotal.toLocaleString()}</div>
                    <a href="#" className="text-[#2874f0] text-xs font-bold hover:underline">View Price Details</a>
                </div>
                <button
                    onClick={handlePay}
                    className="bg-[#fb641b] text-white font-bold py-3.5 px-10 rounded shadow text-[15px] hover:bg-[#e05a18]"
                >
                    Pay
                </button>
            </div>
        </div>
    );
}
