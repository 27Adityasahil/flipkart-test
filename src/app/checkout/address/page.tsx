"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
        <div>
            <div className="bg-white p-4">
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Add Delivery Address</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name (Required)"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border rounded p-3 text-sm text-black placeholder-gray-500 focus:outline-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Phone number (Required)"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full border rounded p-3 text-sm text-black placeholder-gray-500 focus:outline-blue-500 focus:border-blue-500"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-1/2 border rounded p-3 text-sm text-black placeholder-gray-500 flex-1 focus:outline-blue-500 focus:border-blue-500"
                        />
                        <button className="w-1/2 bg-[#2874f0] text-white rounded font-medium text-sm flex-1 shadow-sm">
                            Use my location
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className="border rounded p-3 text-sm text-black placeholder-gray-500 flex-1 focus:outline-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="border rounded p-3 text-sm text-black placeholder-gray-500 flex-1 focus:outline-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <input
                        type="text"
                        name="houseNo"
                        placeholder="House No., Building Name (Required)"
                        value={formData.houseNo}
                        onChange={handleChange}
                        className="w-full border rounded p-3 text-sm text-black placeholder-gray-500 focus:outline-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="roadName"
                        placeholder="Road name, Area, Colony (Required)"
                        value={formData.roadName}
                        onChange={handleChange}
                        className="w-full border rounded p-3 text-sm text-black placeholder-gray-500 focus:outline-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-20">
                <button
                    onClick={handleSave}
                    disabled={!isFormValid}
                    className={`w-full font-bold py-3.5 px-4 rounded shadow-sm text-[15px] ${isFormValid ? 'bg-[#fb641b] text-white hover:bg-[#e05a18]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Save and Deliver Here
                </button>
            </div>
        </div>
    );
}
