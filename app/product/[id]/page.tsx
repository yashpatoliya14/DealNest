'use client';

import { use, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ExternalLink, ArrowLeft, Shield, Truck, Award, ChevronRight } from 'lucide-react';
import { FaAmazon } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShareButton } from '@/components/ShareButton';

interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    rating: number;
    affiliateLink: string;
    isFeatured?: boolean;
    category?: string;
    categoryId?: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    products: Product[];
}

interface ProductsData {
    categories: Category[];
}

function ProductImageGallery({ image, title }: { image: string; title: string }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="relative group">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                {/* Shimmer */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer" />
                )}
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    priority
                    quality={90}
                    onLoad={() => setImageLoaded(true)}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
        </div>
    );
}

function RatingStars({ rating, size = 18 }: { rating: number; size?: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.3;

    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={size}
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
            <span className="ml-1.5 text-base font-bold text-slate-700 dark:text-slate-300">
                {rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">/5</span>
        </div>
    );
}

function FeatureBadge({ icon: Icon, label, description }: { icon: React.ElementType; label: string; description: string }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20 flex-shrink-0">
                <Icon size={18} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </div>
    );
}

function RelatedProductCard({ product }: { product: Product }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer" />
                    )}
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        loading="lazy"
                        quality={75}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <div className="p-3">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {product.title}
                    </h4>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{product.price}</span>
                        <div className="flex items-center gap-0.5">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium text-slate-500">{product.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [data, setData] = useState<ProductsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products.json');
                const jsonData: ProductsData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const { product, categoryName, relatedProducts } = useMemo(() => {
        if (!data) return { product: null, categoryName: '', relatedProducts: [] };

        let foundProduct: Product | null = null;
        let foundCategoryName = '';
        let foundCategoryProducts: Product[] = [];

        for (const category of data.categories) {
            const found = category.products.find((p) => p.id === id);
            if (found) {
                foundProduct = { ...found, categoryId: category.id, category: category.name };
                foundCategoryName = category.name;
                foundCategoryProducts = category.products.filter((p) => p.id !== id);
                break;
            }
        }

        // If not enough related products in same category, add from others
        let related = [...foundCategoryProducts];
        if (related.length < 4) {
            const otherProducts = data.categories
                .flatMap((cat) => cat.products)
                .filter((p) => p.id !== id && !related.some((r) => r.id === p.id));
            related = [...related, ...otherProducts].slice(0, 4);
        } else {
            related = related.slice(0, 4);
        }

        return {
            product: foundProduct,
            categoryName: foundCategoryName,
            relatedProducts: related,
        };
    }, [data, id]);

    // Generate the shareable URL
    const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${id}` : '';

    if (isLoading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-white dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="animate-pulse space-y-8">
                            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                                <div className="space-y-4">
                                    <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                                    <div className="h-10 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                                    <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                                    <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-white dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="text-center py-20">
                            <div className="text-6xl mb-6">🔍</div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Product Not Found
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                The product you&apos;re looking for doesn&apos;t exist or has been removed.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md shadow-orange-500/20"
                            >
                                <ArrowLeft size={16} />
                                Back to Products
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6 animate-fade-in overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
                        <Link
                            href="/"
                            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 flex-shrink-0"
                        >
                            <ArrowLeft size={14} />
                            Home
                        </Link>
                        <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
                        <span className="text-slate-400 dark:text-slate-500 flex-shrink-0">{categoryName}</span>
                        <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
                        <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{product.title}</span>
                    </nav>

                    {/* Product Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-12 sm:mb-16">
                        {/* Left — Image */}
                        <div className="animate-fade-in">
                            <ProductImageGallery image={product.image} title={product.title} />
                        </div>

                        {/* Right — Details */}
                        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                            {/* Category + Featured badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                    {categoryName}
                                </span>
                                {product.isFeatured && (
                                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Best Pick
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4" id="product-title">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            <div className="mb-4">
                                <RatingStars rating={product.rating} />
                            </div>

                            {/* Price */}
                            <div className="mb-5">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                        {product.price}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Inclusive of all taxes. Price may vary on Amazon.
                                </p>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
                                    About this product
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Feature Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                                <FeatureBadge
                                    icon={Shield}
                                    label="Verified Deal"
                                    description="Price checked daily"
                                />
                                <FeatureBadge
                                    icon={Truck}
                                    label="Amazon Delivery"
                                    description="Fast & reliable shipping"
                                />
                                <FeatureBadge
                                    icon={Award}
                                    label="Top Rated"
                                    description={`${product.rating.toFixed(1)} out of 5 stars`}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Buy on Amazon */}
                                <a
                                    href={product.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="buy-on-amazon-btn group/btn relative flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-[#FF9900] hover:bg-[#e88b00] active:bg-[#cc7a00] px-6 py-3.5 text-center font-bold text-base text-slate-900 transition-all duration-250 ease-out shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                                    id="buy-on-amazon-btn"
                                >
                                    <FaAmazon className="w-5 h-5 flex-shrink-0" />
                                    <span className="tracking-wide">Buy on Amazon</span>
                                    <ExternalLink size={14} className="opacity-60 group-hover/btn:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                                </a>

                                {/* Share Button */}
                                <ShareButton productTitle={product.title} productUrl={productUrl} />
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                                    You may also like
                                </h2>
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors flex items-center gap-1"
                                >
                                    View all
                                    <ChevronRight size={14} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                                {relatedProducts.map((relProduct) => (
                                    <RelatedProductCard key={relProduct.id} product={relProduct} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
