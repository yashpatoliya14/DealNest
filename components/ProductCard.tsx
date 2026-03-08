'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  affiliateLink: string;
  category?: string;
  isFeatured?: boolean;
}

export function ProductCard({
  id,
  title,
  description,
  image,
  price,
  originalPrice,
  rating,
  affiliateLink,
  isFeatured = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    setImgSrc(image);
    setImageLoaded(false);
  }, [image]);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.3;

  return (
    <div className="stagger-item group h-full">
      <Link href={`/product/${id}`} className="block h-full">
        <div
          className={`relative h-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/50 transition-all duration-300 ease-out cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 ${isFeatured
            ? 'ring-1 ring-amber-400/40 dark:ring-amber-500/30'
            : ''
            }`}
        >
          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-md shadow-amber-500/25 uppercase tracking-wider">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Best Pick
              </span>
            </div>
          )}

          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800/50 dark:via-slate-900 dark:to-slate-800/50 p-4 sm:p-6">
            {/* Shimmer Loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer" />
            )}

            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-contain transition-transform duration-500 ease-out group-hover:scale-110 p-3 sm:p-4 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              loading="lazy"
              quality={85}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                if (imgSrc !== '/placeholder.jpg') {
                  setImgSrc('/placeholder.jpg');
                }
                setImageLoaded(true);
              }}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-3.5 sm:p-4 lg:p-5">
            {/* Title */}
            <h3 className="text-sm sm:text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
              {title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Rating Row */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-px">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < fullStars
                        ? 'fill-amber-400 text-amber-400'
                        : i === fullStars && hasHalfStar
                          ? 'fill-amber-400/50 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                    }
                  />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                {rating.toFixed(1)}
              </span>
            </div>

            {/* Price + CTA Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {price}
                </span>
                {originalPrice && (
                  <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 line-through">
                    {originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 group-hover:gap-2.5 transition-all duration-200">
                <ShoppingBag size={14} className="flex-shrink-0" />
                <span className="hidden sm:inline">View Deal</span>
                <ArrowRight size={12} className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
