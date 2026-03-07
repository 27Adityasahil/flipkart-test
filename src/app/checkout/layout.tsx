"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const steps = [
        { id: 1, name: 'Address', path: '/checkout/address' },
        { id: 2, name: 'Order Summary', path: '/checkout/summary' },
        { id: 3, name: 'Payment', path: '/checkout/payment' },
    ];

    const currentStepIndex = steps.findIndex(step => pathname.includes(step.path));

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-[#2874f0] px-4 py-3 flex items-center text-white shadow-sm sticky top-0 z-20">
                <button onClick={() => router.back()} className="mr-4">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-[16px] font-medium">Checkout</h1>
            </div>

            {/* Stepper */}
            <div className="bg-white px-6 py-4 border-b flex justify-between relative shadow-sm z-10">
                {/* Connecting Lines */}
                <div className="absolute top-[26%] left-[15%] right-[15%] h-0.5 bg-gray-300 z-0"></div>
                <div
                    className="absolute top-[26%] left-[15%] h-0.5 bg-[#2874f0] z-0 transition-all duration-300"
                    style={{ width: currentStepIndex > 0 ? (currentStepIndex === 1 ? '50%' : '85%') : '0%' }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isActive = index === currentStepIndex;

                    return (
                        <div key={step.id} className="flex flex-col items-center z-10 w-16">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-[#2874f0] text-white ring-4 ring-blue-100' :
                                    isCompleted ? 'bg-[#2874f0] text-white' :
                                        'bg-gray-300 text-gray-600'
                                    }`}
                            >
                                {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                            </div>
                            <span className={`text-[10px] mt-2 font-medium text-center ${isActive ? 'text-[#2874f0]' : isCompleted ? 'text-gray-800' : 'text-gray-700'
                                }`}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Content */}
            <div className="flex-1 pb-[80px]">
                {children}
            </div>
        </div>
    );
}
