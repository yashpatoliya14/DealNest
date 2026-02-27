'use client';

import { useCallback, useState } from 'react';
import { Check } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClearFilter = useCallback(() => {
    onCategoryChange(null);
  }, [onCategoryChange]);

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(
      selectedCategory === categoryId ? null : categoryId
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-4 sm:pb-6 overflow-x-auto">
      {/* All Products Button */}
      <button
        onClick={handleClearFilter}
        onMouseEnter={() => setHoveredId('all')}
        onMouseLeave={() => setHoveredId(null)}
        className={`filter-btn relative rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ease-out transform whitespace-nowrap
          ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
              : 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400'
          }
          ${hoveredId === 'all' && selectedCategory === null ? 'shadow-xl' : ''}
        `}
      >
        <span className="flex items-center gap-1 sm:gap-2">
          {selectedCategory === null && <Check size={14} className="sm:w-4 sm:h-4" />}
          All
        </span>
      </button>

      {/* Category Buttons */}
      {categories.map((category, index) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          onMouseEnter={() => setHoveredId(category.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            transitionDelay: `${index * 30}ms`,
          }}
          className={`filter-btn relative rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ease-out transform whitespace-nowrap
            ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                : 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400'
            }
            ${hoveredId === category.id && selectedCategory === category.id ? 'shadow-xl' : ''}
            active:scale-95
          `}
          aria-pressed={selectedCategory === category.id}
        >
          <span className="flex items-center gap-1 sm:gap-2">
            {selectedCategory === category.id && <Check size={14} className="sm:w-4 sm:h-4" />}
            {category.name}
            {category.count !== undefined && (
              <span className={`hidden sm:inline text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}>
                {category.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
