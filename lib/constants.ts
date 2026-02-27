/**
 * Global Constants
 */

// Animation timing (in milliseconds)
export const ANIMATION_TIMINGS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Stagger delay between items in animations
export const STAGGER_DELAY = 50; // milliseconds

// Search debounce delay
export const SEARCH_DEBOUNCE_DELAY = 150; // milliseconds

// Color values
export const COLORS = {
  amazon: "#FF9900",
  amazonDark: "#E67E22",
  primary: "#0f172a",
  primaryLight: "#1e293b",
  accent: "#06b6d4",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  neutral: "#6b7280",
} as const;

// Grid configurations
export const GRID_CONFIG = {
  desktop: 4, // 4 columns on desktop
  tablet: 2,  // 2 columns on tablet
  mobile: 2,  // 2x2 grid on mobile = 4 products visible
} as const;

// Responsive breakpoints (tailwind)
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Search configuration
export const SEARCH_CONFIG = {
  minChars: 1, // Minimum characters to trigger search
  maxResults: 50, // Maximum results to display
  placeholder: "Search products by name, brand, or category...",
} as const;

// Animation CSS classes
export const ANIMATION_CLASSES = {
  fadeIn: "animate-fade-in",
  slideInUp: "animate-slide-in-up",
  scaleIn: "animate-scale-in",
  pulse: "animate-pulse",
} as const;

// Empty state messages
export const EMPTY_STATES = {
  noProducts: "No products found",
  noSearchResults: "No products match your search",
  tryAdjusting: "Try adjusting your search or filters",
} as const;

// Category display names and colors
export const CATEGORY_STYLES = {
  tech: {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
    label: "Tech",
  },
  audio: {
    bgColor: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-800 dark:text-purple-200",
    label: "Audio",
  },
  accessories: {
    bgColor: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-800 dark:text-green-200",
    label: "Accessories",
  },
  laptops: {
    bgColor: "bg-indigo-100 dark:bg-indigo-900",
    textColor: "text-indigo-800 dark:text-indigo-200",
    label: "Laptops",
  },
  gaming: {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
    label: "Gaming",
  },
  cameras: {
    bgColor: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-800 dark:text-orange-200",
    label: "Cameras",
  },
} as const;

// Button styles
export const BUTTON_STYLES = {
  primary: "bg-amazon hover:bg-amazonDark active:scale-95",
  secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600",
} as const;
