"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import slide1 from '@/assets/carousel-hero/1.png';
import slide2 from '@/assets/carousel-hero/2.png';

export default function Carousel() {
    const slides = [slide1, slide2];

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
                    <div key={i} className="relative w-full h-full flex-shrink-0">
                        <Image src={s} alt={`Banner ${i + 1}`} fill className="object-cover" priority={i === 0} />
                    </div>
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
