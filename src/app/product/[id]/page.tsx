import React from "react";
import { ArrowLeft, Search, ShoppingCart, Heart, Share2, Star, CheckCircle2, AlertCircle, RotateCcw, Banknote, ShieldCheck, Clock, Flame, PackageCheck } from "lucide-react";
import Link from "next/link";
import fAssuredImg from "@/assets/flipkart-assured.png";
import wowImg from "@/assets/wow.png";
import products from "@/data/products.json";
import ProductCarousel from "./ProductCarousel";
import ProductActions from "./ProductActions";
import LiveTimer from "@/components/LiveTimer";

// Reviews and Similar Products are now loaded dynamically from products.json

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Support lookup by either id or slug to fix routing issues from different components
    const product: any = products.find((p) => p.id === id || p.slug === id);

    if (!product) {
        return <div className="p-10 text-center font-bold text-red-500">Product not found</div>;
    }

    return (
        <div className="bg-[#f1f3f6] min-h-screen pb-[60px] font-sans">
            {/* Header */}
            <div className="bg-[#2874f0] text-white px-4 py-3 sticky top-0 z-50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    <Search className="w-[22px] h-[22px]" strokeWidth={2.5} />
                    <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={2.5} />
                </div>
            </div>

            {/* Product Images (Carousel) */}
            <div className="bg-white relative border-b border-gray-100 pb-4">
                <ProductCarousel images={product.images ? product.images : [product.image]} />
                <div className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm">
                    <Heart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="absolute top-14 right-4 z-10 p-2 bg-white rounded-full shadow-sm mt-3">
                    <Share2 className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Sold Count + Stock Banner */}
            {(product.soldCount || product.stockLeft) && (
                <div className="flex items-stretch">
                    {product.soldCount && (
                        <div className="flex-1 bg-[#388e3c] text-white text-[11px] font-bold px-3 py-2 flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 fill-white" />
                            <span>{product.soldCount} Sold In Last 7 Days</span>
                        </div>
                    )}
                    {product.stockLeft && (
                        <div className="bg-[#d32f2f] text-white text-[11px] font-bold px-3 py-2 flex items-center gap-1.5">
                            <PackageCheck className="w-3.5 h-3.5" />
                            <span>Only {product.stockLeft} Left</span>
                        </div>
                    )}
                </div>
            )}

            {/* Title & Badges */}
            <div className="bg-white px-4 pt-3 pb-2 shadow-sm">
                <h1 className="text-[15px] text-[#212121] leading-[1.3] mb-2 font-medium">
                    {product.title}
                </h1>

                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#f3993e] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm tracking-wide">Trending</span>
                    <img src={fAssuredImg.src} className="h-[14px] object-contain ml-1" alt="Plus F-Assured" />
                </div>

                {/* Pricing & Offers */}
                <div className="mt-1 mb-2">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-[#388e3c] text-[13px] font-bold">{product.discount}% off</span>
                        {product.originalPrice && <span className="text-[#878787] text-[13px] line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[#212121] text-[26px] font-bold leading-none tracking-tight">₹{product.currentPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 bg-red-50 text-[#d32f2f] border border-red-100 px-2 py-1 rounded w-fit font-bold text-[11px] tracking-wide">
                        <Clock className="w-3.5 h-3.5" strokeWidth={3} /> <LiveTimer type="offer" initialMinutes={12} initialSeconds={30} />
                    </div>
                </div>

                {/* Features Bar */}
                <div className="flex justify-between items-start text-center py-4 mt-4 border-t border-gray-100">
                    <div className="flex flex-col items-center flex-1">
                        <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center mb-1 bg-white shadow-sm">
                            <span className="text-[#2874f0] font-bold text-[14px]">7</span>
                        </div>
                        <span className="text-[11px] text-[#212121] font-medium leading-tight text-[#2874f0]">7 days<br />Replacement</span>
                    </div>

                    <div className="w-[1px] bg-gray-200 h-10 self-center"></div>
                    <div className="flex flex-col items-center flex-1">
                        <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center mb-1 bg-white shadow-sm">
                            <ShieldCheck className="w-5 h-5 text-[#f3993e]" />
                        </div>
                        <span className="text-[11px] text-[#212121] font-medium leading-tight text-[#f3993e]">Plus<br />(F-Assured)</span>
                    </div>
                </div>

                {/* Warranty */}
                {product.warranty && (
                    <div className="flex items-center gap-2 border-t border-gray-100 pt-3 mt-1 pb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#388e3c] flex-shrink-0" />
                        <span className="text-[12px] text-[#212121] font-medium">{product.warranty}</span>
                    </div>
                )}
            </div>

            {/* Product Details Bullet List */}
            {product.details && product.details.length > 0 && (
                <div className="bg-white mt-1.5 shadow-sm">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <h2 className="text-[15px] font-bold text-[#212121]">Product Detail</h2>
                    </div>
                    <ul className="px-4 py-3 space-y-2">
                        {product.details.map((detail: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-[#212121] leading-[1.4]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2874f0] flex-shrink-0 mt-[6px]" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Ratings & Reviews Breakdown */}
            {product.reviews && (
                <div className="bg-white mt-1.5 shadow-sm">
                    <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100">
                        <div className="text-[15px] font-bold text-[#212121]">Ratings & Reviews</div>
                    </div>

                    <div className="p-4 flex gap-5 pb-6">
                        {/* Overall Rating Circular visualizer */}
                        <div className="flex flex-col items-center justify-center min-w-[90px]">
                            <div className="text-[36px] text-[#212121] font-bold flex items-center leading-none mb-1">
                                {product.rating} <Star className="w-5 h-5 fill-[#212121] text-[#212121] ml-1.5" />
                            </div>
                            <div className="text-[#878787] text-[12px] font-medium -mt-1">{product.reviewCount.toLocaleString()}</div>
                            <div className="text-[#878787] text-[12px] font-medium">Ratings &</div>
                            <div className="text-[#878787] text-[12px] font-medium">{product.reviews?.list?.length || 0} Reviews</div>
                        </div>

                        {/* Bars */}
                        <div className="flex-1 space-y-1.5 mt-1 border-l border-gray-100 pl-4 py-1">
                            {(product.reviews?.breakdown || []).map((bar: any) => (
                                <div key={bar.s} className="flex items-center text-[11px] gap-2">
                                    <span className="w-2 font-medium text-[#212121]">{bar.s}</span>
                                    <Star className="w-2 h-2 fill-gray-400 text-gray-400 -mt-[1px]" />
                                    <div className="h-[5px] flex-1 bg-gray-100 rounded-full overflow-hidden ml-1">
                                        <div className={`h-full ${bar.c} ${bar.w} rounded-full`}></div>
                                    </div>
                                    <span className="text-[#878787] text-[10px] w-8 text-right font-medium">{bar.v.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-2 bg-[#f1f3f6]"></div>

                    {/* Dynamic Review Cards */}
                    {(product.reviews?.list || []).map((review: any, i: number) => (
                        <div key={i} className="px-4 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-[2px] rounded border border-gray-100 shadow-sm flex items-center gap-1">
                                    {review.rating} <Star className="w-2.5 h-2.5 fill-white" />
                                </span>
                                <span className="text-[13px] font-bold text-[#212121]">{review.title}</span>
                            </div>
                            <p className="text-[13px] text-[#212121] leading-[1.4] mb-3 pr-4">{review.text}</p>
                            <div className="w-[45px] h-[45px] border border-gray-200 rounded-[3px] overflow-hidden mb-3">
                                <img src={product.image} className="w-full h-full object-cover Mix-Blend-Multiply bg-[#f1f3f6]" alt="User Image" />
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-[#878787] font-medium flex items-center">
                                        {review.author}
                                        <span className="w-[10px] h-[10px] bg-gray-400 text-white rounded-full flex items-center justify-center text-[6px] ml-2 mr-1">✓</span>
                                        <span className="text-[10px] font-normal">Verified Purchase, {review.location}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-[#878787]">
                                    <span className="text-[11px]">{review.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Similar Products Grid */}
            {product.similarProducts && product.similarProducts.length > 0 && (
                <div className="bg-[#f1f3f6] mt-1.5 pb-4">
                    <div className="px-4 py-3 bg-white mb-[1px]">
                        <h2 className="text-[16px] font-medium text-[#212121]">Similar Products</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-[1px] bg-gray-200 w-full">
                        {product.similarProducts.map((item: any) => (
                            <Link href={`/product/${item.id}`} key={item.id} className="bg-white p-3 flex flex-col relative">
                                <div className="absolute top-2 right-2 p-1.5 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                                    <Heart className="w-[14px] h-[14px] text-gray-400" />
                                </div>

                                <div className="h-[140px] w-full flex items-center justify-center mb-3">
                                    <img src={item.image} className="max-h-[140px] max-w-[140px] object-contain Mix-Blend-Multiply" alt={item.title} />
                                </div>

                                <h3 className="text-[13px] text-[#212121] leading-[1.3] line-clamp-2 mb-1.5 min-h-[34px] font-normal">{item.title}</h3>

                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <span className="text-[#388e3c] text-[12px] font-bold">{item.rating}%</span>
                                    <img src={fAssuredImg.src} className="h-[14px] object-contain ml-0.5" alt="Plus F-Assured" />
                                </div>

                                <div className="flex items-baseline gap-1 mt-auto">
                                    <span className="text-[16px] font-bold text-[#212121]">₹{item.price.toLocaleString()}</span>
                                </div>
                                <div className="text-[11px] text-[#878787] line-through mb-1.5">₹{(item.price + 1500).toLocaleString()}</div>
                                <div className="text-[#212121] text-[11px] mb-2 font-medium">₹{item.emi}/mth EMI</div>

                                <div className="mt-1 pt-2 border-t border-gray-100 flex items-center gap-1.5">
                                    <img src={wowImg.src} className="h-[14px] grayscale" alt="wow" />
                                    <span className="text-[9px] bg-red-100 text-[#d32f2f] px-[3px] py-[1px] rounded-[2px] font-bold uppercase tracking-wider scale-90 origin-left">Sale</span>
                                </div>
                                <div className="text-[11px] font-bold text-[#388e3c] mt-1.5 uppercase tracking-wide">
                                    EXPRESS <span className="font-medium text-[#212121] normal-case tracking-normal">Delivery Tomorrow</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="h-[20px] bg-[#f1f3f6]"></div> {/* Spacing at bottom */}

            {/* Bottom Actions Fixed */}
            <ProductActions product={product as any} />
        </div>
    );
}
