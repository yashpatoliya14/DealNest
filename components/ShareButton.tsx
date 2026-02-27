'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Link2, Check, X, MessageCircle } from 'lucide-react';
import { FaWhatsapp, FaXTwitter, FaFacebookF, FaTelegram } from 'react-icons/fa6';

interface ShareButtonProps {
  productTitle: string;
  productUrl: string;
}

export function ShareButton({ productTitle, productUrl }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareText = `Check out ${productTitle} on DealNest!`;
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'hover:bg-green-500/10 hover:text-green-500 dark:hover:bg-green-500/20',
    },
    {
      name: 'Twitter',
      icon: <FaXTwitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:bg-slate-800/10 hover:text-slate-800 dark:hover:bg-white/20 dark:hover:text-white',
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600/10 hover:text-blue-600 dark:hover:bg-blue-500/20',
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'hover:bg-sky-500/10 hover:text-sky-500 dark:hover:bg-sky-500/20',
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: shareText,
          url: productUrl,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Share product"
        id="share-product-btn"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      {/* Share Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 animate-scale-in origin-top-right">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Share this product
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X size={14} className="text-slate-400" />
            </button>
          </div>

          {/* Copy Link */}
          <div className="mb-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2">
              <div className="flex-1 truncate text-xs text-slate-500 dark:text-slate-400 pl-1">
                {productUrl}
              </div>
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200'
                }`}
                id="copy-link-btn"
              >
                {copied ? (
                  <>
                    <Check size={12} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Link2 size={12} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-1.5 rounded-xl p-3 text-slate-500 dark:text-slate-400 transition-all duration-200 ${link.color}`}
                title={`Share on ${link.name}`}
                id={`share-${link.name.toLowerCase()}-btn`}
              >
                {link.icon}
                <span className="text-[10px] font-medium">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Native Share (Mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md shadow-orange-500/20"
              id="native-share-btn"
            >
              <MessageCircle size={16} />
              More sharing options
            </button>
          )}
        </div>
      )}
    </div>
  );
}
