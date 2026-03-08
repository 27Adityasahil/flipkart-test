"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full aspect-[4/3] bg-white pt-4 pb-8 overflow-hidden group">
            {/* Image Container */}
            <div
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center p-4">
                        <img
                            src={img}
                            alt={`Product View ${idx + 1}`}
                            className="max-w-full max-h-full object-contain drop-shadow-sm"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/80 shadow-md border flex items-center justify-center rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700 font-bold" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/80 shadow-md border flex items-center justify-center rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700 font-bold" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-black w-4' : 'bg-gray-300 w-1.5'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
