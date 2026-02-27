export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="space-y-4 sm:space-y-6">
          {/* Disclaimer */}
          <div className="rounded-lg bg-orange-50 p-3 sm:p-4 dark:bg-orange-900/20">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Affiliate Disclosure:</span> As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 justify-center sm:justify-start">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-200 pt-3 sm:pt-4 text-center text-xs sm:text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            <p>© {currentYear} DealNest</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
