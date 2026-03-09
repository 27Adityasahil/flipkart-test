'use client';

import React, { useState, useEffect } from 'react';

interface Props {
    initialMinutes?: number;
    initialSeconds?: number;
    type?: 'offer' | 'sale';
}

export default function LiveTimer({ initialMinutes = 11, initialSeconds = 22, type = 'offer' }: Props) {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const defaultTime = initialMinutes * 60 + initialSeconds;
        const savedTime = localStorage.getItem('flipkart_timer');
        const savedTimestamp = localStorage.getItem('flipkart_timer_timestamp');

        let initialTimeLeft = defaultTime;

        if (savedTime && savedTimestamp) {
            const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
            const remaining = parseInt(savedTime, 10) - elapsedSeconds;
            if (remaining > 0) {
                initialTimeLeft = remaining;
            }
        }

        setTimeLeft(initialTimeLeft);

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === null) return null;
                if (prev <= 1) {
                    // Reset when hits 0
                    localStorage.setItem('flipkart_timer', defaultTime.toString());
                    localStorage.setItem('flipkart_timer_timestamp', Date.now().toString());
                    return defaultTime;
                }
                const newTime = prev - 1;
                // Save state persistently
                localStorage.setItem('flipkart_timer', newTime.toString());
                localStorage.setItem('flipkart_timer_timestamp', Date.now().toString());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [initialMinutes, initialSeconds]);

    if (timeLeft === null) {
        if (type === 'offer') return <span>Offer ends in --min --sec</span>;
        return <span>--:--</span>;
    }

    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;

    if (type === 'sale') {
        if (h > 0) {
            return <span>{h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}</span>;
        }
        return <span>{m.toString().padStart(2, '0')}m {s.toString().padStart(2, '0')}s</span>;
    }

    return <span>Offer ends in {m}min {s}sec</span>;
}
