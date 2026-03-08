"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}
