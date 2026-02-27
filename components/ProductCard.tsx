'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ExternalLink } from 'lucide-react';
import { FaAmazon } from 'react-icons/fa';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
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
  rating,
  affiliateLink,
  isFeatured = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.3;

  return (
    <div className="stagger-item group h-full">
      <Link href={`/product/${id}`} className="block h-full">
        <div
          className={`product-card relative h-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl transition-shadow duration-400 ease-out cursor-pointer ${isFeatured
            ? 'ring-1 ring-amber-400/50 dark:ring-amber-500/40'
            : ''
            }`}
        >
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
            {/* Shimmer Loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer" />
            )}

            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              loading="lazy"
              quality={80}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Top Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-5">
            {/* Price + Best Pick */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {price}
              </span>
              {isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-amber-700 dark:text-amber-400 leading-none">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Best Pick
                </span>
              )}
            </div>

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
            <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
              <div className="flex gap-px">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
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
              <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 ml-0.5">
                {rating.toFixed(1)}
              </span>
            </div>

            {/* Buy on Amazon Button */}
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="buy-on-amazon-btn group/btn relative flex items-center justify-center gap-2 w-full rounded-xl bg-[#FF9900] hover:bg-[#e88b00] active:bg-[#cc7a00] px-4 py-2.5 sm:py-3 text-center font-bold text-xs sm:text-sm text-slate-900 transition-all duration-250 ease-out shadow-md shadow-orange-500/15 hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <FaAmazon className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
              <span className="tracking-wide">Buy on Amazon</span>
              <ExternalLink size={12} className="opacity-50 group-hover/btn:opacity-100 transition-opacity duration-200 flex-shrink-0" />
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}
