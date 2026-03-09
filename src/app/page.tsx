import React from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Carousel from '@/components/Carousel';
import categoriesImg from '@/assets/categories-strip.png';
import productsData from '@/data/products.json';
import { Product } from '@/context/CartContext';
import { Clock } from 'lucide-react';
import LiveTimer from '@/components/LiveTimer';

export default function HomePage() {
  const products: Product[] = productsData as Product[];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 overflow-y-auto bg-gray-100 pb-20">
        {/* Categories Bar */}
        <div className="bg-white px-2 py-3 overflow-x-auto hide-scrollbar shadow-sm">
          <img src={categoriesImg.src} alt="Categories" className="h-[72px] w-auto max-w-none flex-shrink-0" />
        </div>

        {/* Banner Carousel */}
        <div className="mt-2 bg-white p-2 border-y border-gray-200">
          <div className="rounded-md overflow-hidden shadow-sm">
            <Carousel />
          </div>
        </div>

        {/* Deals of the Day Header */}
        <div className="mt-2 bg-white flex flex-col pt-4">
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex flex-col">
              <h2 className="text-[18px] font-bold text-[#2874f0]">Deals of the Day</h2>
              <div className="flex items-center text-[#2874f0] space-x-1.5 mt-0.5">
                <Clock className="w-4 h-4" />
                <span className="text-lg font-medium tracking-wider">
                  <LiveTimer type="sale" initialMinutes={11} initialSeconds={22} />
                </span>
              </div>
            </div>
            <button className="border border-gray-200 text-red-500 font-bold px-4 py-2 rounded shadow-sm text-sm bg-white">
              SALE IS LIVE
            </button>
          </div>

          <div className="grid grid-cols-2 border-t border-gray-200 bg-gray-100 gap-[1px]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
