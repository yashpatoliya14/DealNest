'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { fuzzySearch } from '@/lib/fuzzySearch';

interface Product {
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

interface Category {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

interface ProductsData {
  categories: Category[];
}

export default function Home() {
  const [data, setData] = useState<ProductsData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products data
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

  // Filter products based on category and search with fuzzy matching
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    let products: Product[] = [];

    if (selectedCategory) {
      const category = data.categories.find((cat) => cat.id === selectedCategory);
      products = category?.products || [];
    } else {
      // Flatten all products from all categories
      products = data.categories.flatMap((cat) =>
        cat.products.map(p => ({
          ...p,
          category: cat.name
        }))
      );
    }

    // Apply advanced fuzzy search filter
    if (searchQuery.trim()) {
      const searchResults = fuzzySearch(
        products,
        searchQuery,
        ['title', 'description', 'category'] as (keyof Product)[]
      );
      // Return items that have a score (matches found)
      products = searchResults.map(result => result.item);
    }

    // Sort featured products first, then by rating
    return products.sort((a, b) => {
      if ((b.isFeatured ? 1 : 0) !== (a.isFeatured ? 1 : 0)) {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [data, selectedCategory, searchQuery]);

  const handleCategoryChange = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400">Loading products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400">Failed to load products.</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Add product count to categories
  const categories = data.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    count: cat.products.length,
  }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-slate-950">

        {/* Sticky Search Section */}
        <div className="sticky top-16 z-40 bg-linear-to-b from-white via-white to-white/95 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950/95 backdrop-blur-md shadow-md transition-all duration-300">
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
            {/* Search Bar - Always Visible */}
            <div className="animate-fade-in">
              <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            </div>
          </div>
        </div>

        {/* Main Content - Responsive padding */}
        <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Category Filter */}
          <div className="mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              Filter by Category
            </h3>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Results Count & Info */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredProducts.length}</span>{' '}
              product{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && <span className="ml-2 text-blue-600 dark:text-blue-400">matching "{searchQuery}"</span>}
            </p>
          </div>

          {/* Products Grid - 2x2 on mobile (4 products), 2 cols on tablet, 4 cols on desktop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <ProductCard
                    {...product}
                    category={product.category}
                    isFeatured={product.isFeatured}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                No products found
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {searchQuery
                  ? `No results for "${searchQuery}". Try different keywords!`
                  : 'Try adjusting your search or category filters'
                }
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
