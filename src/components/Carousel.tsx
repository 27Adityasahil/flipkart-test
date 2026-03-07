"use client";

import React, { useState, useEffect } from 'react';

const slides = [
    "https://dummyimage.com/600x250/333333/ffffff.png&text=Mega+Sale+On+Mobiles",
    "https://dummyimage.com/600x250/2874f0/ffffff.png&text=Up+to+50%25+Off+Electronics"
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-40 overflow-hidden bg-gray-200">
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((s, i) => (
                    <img key={i} src={s} alt="Banner" className="w-full h-full object-cover flex-shrink-0" />
                ))}
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
