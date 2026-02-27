'use client';

import { Search, X } from 'lucide-react';
import { useCallback, useRef, useEffect, useState } from 'react';
import { ANIMATION_TIMINGS } from '@/lib/constants';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search to improve performance while typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearchChange(value);
    }, ANIMATION_TIMINGS.fast);
  };

  const handleClear = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full transform transition-all duration-300 ease-out">
      <Search 
        className={`absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
          isFocused ? 'text-blue-500 scale-110' : 'text-slate-400'
        }`} 
      />
      <input
        type="text"
        placeholder="Search by product name, brand, or features..."
        defaultValue={searchQuery}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-lg border-2 px-3 py-3 sm:px-4 sm:py-3.5 pl-9 sm:pl-11 pr-10 sm:pr-11 text-sm sm:text-base font-medium transition-all duration-300 ease-out
          bg-white dark:bg-slate-900
          border-slate-200 dark:border-slate-700
          text-slate-900 dark:text-slate-100
          placeholder-slate-500 dark:placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:shadow-xl
          ${isFocused 
            ? 'shadow-xl border-blue-500 bg-blue-50/30 dark:bg-blue-950/20' 
            : 'shadow-md hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600'
          }
        `}
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className={`absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 
            transition-all duration-200 ease-out active:scale-75
            ${searchQuery ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          aria-label="Clear search"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
}
