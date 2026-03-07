import React from 'react';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-2xl relative overflow-x-hidden flex flex-col">
            {children}
        </div>
    );
}
