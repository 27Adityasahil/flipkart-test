import React from 'react';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/context/CartContext';

export default function HomePage() {
  const products: Product[] = productsData as Product[];

  return (
    <div className="flex flex-col min-h-screen pb-6">
      <Header />
      <div className="flex-1 overflow-y-auto bg-gray-100 pb-20">
        <Carousel />

        {/* Deals of the Day */}
        <div className="mt-2 bg-white">
          <div className="px-3 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Deals of the Day</h2>
            <button className="bg-[#2874f0] text-white text-xs px-3 py-1.5 rounded-sm font-medium shadow-sm">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
