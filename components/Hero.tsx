export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="animate-fade-in space-y-3 sm:space-y-4">
          <h2 className="text-balance text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white lg:text-5xl">
            Discover Amazing Products
          </h2>
          <p className="text-balance text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">
            Curated selection of top-rated tech gadgets, audio equipment, and accessories.
          </p>
        </div>
      </div>
    </div>
  );
}
