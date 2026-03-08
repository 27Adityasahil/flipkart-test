"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShieldCheck, ChevronUp, ChevronDown, CreditCard, Landmark, Banknote, HelpCircle, Smile } from 'lucide-react';
import phonepeImg from '@/assets/phonepe.png';
import gpayImg from '@/assets/gpay.png';
import paytmImg from '@/assets/paytm.png';
import otherUpiImg from '@/assets/other-upi.png';

export default function PaymentPage() {
    const router = useRouter();
    const { cartTotal, paymentMethod, setPaymentMethod, clearCart, cartCount } = useCart();
    const [success, setSuccess] = useState(false);

    const handlePay = () => {
        window.location.href = `upi://pay?pa=paytm.s1x1vd6@pty&pn=Anil%20Kumar&am=499&cu=INR&tn=ORDER1023`;
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
        { id: 'phonepe', name: 'PhonePe', icon: phonepeImg },
        { id: 'paytm', name: 'Paytm', icon: paytmImg },
        { id: 'gpay', name: 'Google Pay', icon: gpayImg },
        { id: 'other', name: 'Other UPI', icon: otherUpiImg },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f1f3f6] pb-10">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between bg-white border-b shadow-sm sticky top-0 z-20">
                <div className="flex items-center">
                    <button onClick={() => router.back()} className="mr-4">
                        <ArrowLeft className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-gray-500 font-medium">Step 3 of 3</span>
                        <h1 className="text-[18px] font-bold text-black leading-tight">Payments</h1>
                    </div>
                </div>
                <div className="flex items-center bg-gray-100 border border-gray-200 px-2 py-1 rounded text-[11px] font-medium text-gray-600">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" strokeWidth={2} />
                    100% Secure
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#f5f7fa] px-4 py-4 border-b border-gray-200 relative overflow-hidden">
                {/* Simulated background stripes (a bit tricky to do exactly, keeping it clean solid for now) */}
                <div className="flex justify-between items-center text-[15px] text-gray-700 mb-2">
                    <span>Price ({cartCount} items)</span>
                    <span className="font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[15px] text-gray-700 mb-4">
                    <span>Protect Promise Fee</span>
                    <span className="font-medium text-gray-900">₹0</span>
                </div>

                <div className="border-t border-dashed border-gray-300 my-3"></div>

                <div className="flex justify-between items-center bg-[#f5f7fa]">
                    <div className="flex items-center text-[#2874f0] font-medium text-[16px]">
                        Total Amount <ChevronUp className="w-4 h-4 ml-1" strokeWidth={2.5} />
                    </div>
                    <span className="font-medium text-[#2874f0] text-[16px]">₹{cartTotal.toLocaleString()}</span>
                </div>
            </div>

            {/* Cashback Banner */}
            <div className="bg-[#eff8f1] px-4 py-3 border-b flex justify-between items-center relative overflow-hidden">
                <div className="flex flex-col z-10 w-full relative">
                    <span className="text-[#388e3c] font-bold text-[14px]">5% Cashback</span>
                    <span className="text-[#388e3c] text-[12px]">Claim now with payment offers</span>
                </div>
                {/* Fake Bank Logos Placeholder to match visual structure */}
                <div className="flex absolute right-4 top-1/2 -translate-y-1/2 space-x-[-10px] z-0">
                    <div className="w-8 h-8 rounded-full bg-red-800 border-2 border-white shadow-sm flex items-center justify-center font-serif text-white text-[10px] italic">A</div>
                    <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-white shadow-sm flex items-center justify-center font-bold text-white text-[10px]">SBI</div>
                </div>
            </div>

            {/* UPI Section */}
            <div className="bg-white mt-3 border-t border-b">
                <div className="px-4 py-4 flex justify-between items-start border-b">
                    <div>
                        <div className="flex items-center">
                            <span className="font-bold text-[15px] text-black">UPI</span>
                        </div>
                        <div className="text-gray-500 text-[13px] mt-0.5">Pay by any UPI app</div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col">
                    {upiOptions.map((opt, index) => (
                        <label
                            key={opt.id}
                            onClick={() => setPaymentMethod(opt.name)}
                            className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="flex items-center justify-center mr-4">
                                    <img src={opt.icon.src} alt={opt.name} className="w-[32px] h-[32px] object-contain" />
                                </div>
                                <span className={`text-[15px] ${paymentMethod === opt.name ? 'text-black font-medium' : 'text-gray-800'}`}>{opt.name}</span>
                            </div>

                            <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center ${paymentMethod === opt.name ? 'border-[#2874f0]' : 'border-gray-400'}`}>
                                {paymentMethod === opt.name && <div className="w-2.5 h-2.5 bg-[#2874f0] rounded-full"></div>}
                            </div>
                        </label>
                    ))}

                    {/* Inline Pay Button positioned immediately inside the UPI section as requested in screenshot */}
                    <div className="p-4 bg-white border-t">
                        <button
                            onClick={handlePay}
                            className="w-full bg-[#fb641b] text-black bg-gradient-to-b from-[#ffcf40] to-[#ffc200] font-bold py-3.5 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-[16px]"
                        >
                            PAY ₹{cartTotal.toLocaleString()}
                        </button>
                    </div>
                </div>
            </div>

            {/* Disabled Sections */}
            <div className="bg-[#f1f3f6] mt-3 border-t">
                {/* Credit Card */}
                <div className="bg-[#fafafa] px-4 py-4 border-b flex items-start justify-between">
                    <div className="flex flex-col opacity-60">
                        <div className="flex items-center">
                            <CreditCard className="w-6 h-6 text-gray-500 mr-3" strokeWidth={2} />
                            <span className="font-bold text-[15px] text-black">Credit/Debit/ATM Card</span>
                        </div>
                        <div className="text-gray-500 text-[12px] mt-1 ml-9">Add and secure cards as per RBI<br />guidelines</div>
                        <div className="text-[#388e3c] text-[12px] mt-1 ml-9 font-medium">Get upto 5% cashback* • 2 offers available</div>
                    </div>
                    <div className="flex items-center text-gray-500 text-[13px]">
                        Unavailable
                        <HelpCircle className="w-3.5 h-3.5 ml-1" />
                    </div>
                </div>

                {/* Net Banking */}
                <div className="bg-[#fafafa] px-4 py-4 border-b flex justify-between items-center opacity-70">
                    <div className="flex items-center">
                        <Landmark className="w-6 h-6 text-gray-500 mr-3" strokeWidth={2} />
                        <span className="font-bold text-[15px] text-black">Net Banking</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-[13px]">
                        Unavailable
                        <HelpCircle className="w-3.5 h-3.5 ml-1" />
                    </div>
                </div>

                {/* Cash on Delivery */}
                <div className="bg-[#fafafa] px-4 py-4 border-b flex justify-between items-center opacity-70">
                    <div className="flex items-center">
                        <Banknote className="w-6 h-6 text-gray-500 mr-3" strokeWidth={2} />
                        <span className="font-bold text-[15px] text-black">Cash on Delivery</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-[13px]">
                        Unavailable
                        <HelpCircle className="w-3.5 h-3.5 ml-1" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-8 pb-4 flex flex-col items-center justify-center text-gray-500">
                <p className="text-[13px] font-bold mb-3">35 Crore happy customers and counting!</p>
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300">
                    <Smile className="w-5 h-5" strokeWidth={2.5} />
                </div>
            </div>

        </div>
    );
}
