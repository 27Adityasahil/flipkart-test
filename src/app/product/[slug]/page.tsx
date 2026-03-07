"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, Product } from '@/context/CartContext';
import productsData from '@/data/products.json';
import { ArrowLeft, Share2, ShoppingCart, Star } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);
    const { addToCart, cartCount } = useCart();

    const product: Product | undefined = (productsData as Product[]).find((p) => p.slug === slug);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p>Product not found</p>
                <button onClick={() => router.push('/')} className="mt-4 text-blue-500">Go Home</button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        router.push('/cart');
    };

    const handleBuyNow = () => {
        addToCart(product);
        router.push('/checkout/address');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pb-[60px]">
            {/* Top action bar */}
            <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
                <button onClick={() => router.back()} className="text-gray-800">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-4">
                    <Share2 className="w-5 h-5 text-gray-800" />
                    <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
                        <ShoppingCart className="w-5 h-5 text-gray-800" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Main image */}
            <div className="bg-white p-6 border-b flex justify-center">
                <img src={product.image} alt={product.title} className="w-64 h-auto object-contain" />
            </div>

            {/* Details */}
            <div className="bg-white p-4 mt-2">
                <h1 className="text-[16px] font-medium text-gray-900 leading-snug">{product.title}</h1>

                <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1 bg-green-600 px-1.5 py-0.5 rounded text-white text-[11px] font-bold">
                        <span>{product.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-gray-500 text-xs font-medium">
                        {product.reviewCount.toLocaleString()} ratings
                    </span>
                </div>

                <div className="mt-4 flex items-end space-x-2">
                    <span className="font-semibold text-2xl text-gray-900">₹{product.currentPrice.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-sm mb-1">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-green-600 text-sm font-bold mb-1">{product.discount}% off</span>
                </div>
            </div>

            {/* Offers */}
            <div className="bg-white p-4 mt-2">
                <h3 className="font-bold text-sm mb-3 text-gray-800">Available offers</h3>
                <ul className="space-y-3">
                    {product.offers.map((offer, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-700">
                            <span className="text-green-600 mr-2 mt-0.5">🏷️</span>
                            {offer}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Delivery */}
            <div className="bg-white p-4 mt-2">
                <div className="text-sm">
                    <span className="font-bold text-gray-800">Delivery</span>
                    <p className="font-medium text-gray-800 mt-1">{product.deliveryText}</p>
                </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-4 mt-2">
                <h3 className="font-bold text-sm mb-3 text-gray-800">Highlights</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    {product.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                    ))}
                </ul>
            </div>

            {/* Related Products */}
            <div className="bg-white p-4 mt-2 mb-4">
                <h3 className="font-bold text-sm mb-3 text-gray-800">Similar Products</h3>
                <div className="flex overflow-x-auto space-x-4 pb-2 hide-scrollbar">
                    {(productsData as Product[]).filter(p => p.id !== product.id).map(p => (
                        <div key={p.id} className="w-32 flex-shrink-0 border rounded p-2" onClick={() => router.push(`/product/${p.slug}`)}>
                            <img src={p.image} alt={p.title} className="w-full h-24 object-contain bg-gray-50 mb-2" />
                            <h4 className="text-xs font-medium text-gray-800 line-clamp-2">{p.title}</h4>
                            <div className="mt-1 font-bold text-sm text-gray-900">₹{p.currentPrice.toLocaleString()}</div>
                            <div className="text-green-600 text-[10px] font-bold">{p.discount}% off</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t flex z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-white text-gray-800 font-bold border-r text-center hover:bg-gray-50"
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-[#fb641b] text-white font-bold text-center hover:bg-[#e05a18]"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}
