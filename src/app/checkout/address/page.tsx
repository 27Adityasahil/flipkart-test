"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCart, Address } from '@/context/CartContext';

export default function AddressPage() {
    const router = useRouter();
    const { address, setAddress } = useCart();

    const [formData, setFormData] = useState<Address>({
        fullName: '',
        mobile: '',
        pincode: '',
        city: '',
        state: '',
        houseNo: '',
        roadName: '',
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        }
    }, [address]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setAddress(formData);
        router.push('/checkout/summary');
    };

    const isFormValid = formData.fullName && formData.mobile && formData.pincode && formData.city && formData.state && formData.houseNo && formData.roadName;

    return (
        <div className="flex flex-col min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="px-4 py-3 flex items-center bg-white border-b">
                <button onClick={() => router.back()} className="mr-3">
                    <ArrowLeft className="w-5 h-5 text-black" />
                </button>
                <h1 className="text-[16px] font-bold text-black">Add delivery address</h1>
            </div>

            {/* Progress Stepper */}
            <div className="px-4 py-6 bg-white border-b">
                <div className="flex items-center justify-between relative max-w-[300px] mx-auto">
                    {/* Connecting Lines */}
                    <div className="absolute top-3 left-6 right-6 h-[1px] bg-gray-300 z-0 flex"></div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center z-10 relative bg-white px-2">
                        <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-xs font-bold mb-2">1</div>
                        <span className="text-xs text-black">Address</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center z-10 relative bg-white px-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold mb-2">2</div>
                        <span className="text-xs text-gray-400">Order Summary</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center z-10 relative bg-white px-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold mb-2">3</div>
                        <span className="text-xs text-gray-400">Payment</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="p-4 bg-white">
                <div className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name (Required)*"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                    />
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number (Required)*"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode (Required)*"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                    />

                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="city"
                            placeholder="City (Required)*"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State (Required)*"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                        />
                    </div>

                    <input
                        type="text"
                        name="houseNo"
                        placeholder="House No., Building Name (Required)*"
                        value={formData.houseNo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                    />
                    <input
                        type="text"
                        name="roadName"
                        placeholder="Road name, Area, Colony (Required)*"
                        value={formData.roadName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm p-3.5 text-sm text-black placeholder-gray-500 focus:outline-blue-500"
                    />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white p-4 z-20">
                <button
                    onClick={handleSave}
                    disabled={!isFormValid}
                    className={`w-full font-bold py-3.5 px-4 rounded-sm shadow text-[15px] ${isFormValid ? 'bg-[#ffc200] text-black hover:bg-[#e0ab00]' : 'bg-[#facc15] bg-opacity-60 text-black text-opacity-70 cursor-not-allowed'
                        }`}
                >
                    Save Address
                </button>
            </div>
        </div>
    );
}
