export function getProductSchema(product: {
  title: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  affiliateLink: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/[^\d]/g, ''),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: product.affiliateLink,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AffiliateHub',
    url: 'https://affiliatehub.com',
    logo: 'https://affiliatehub.com/logo.png',
    description: 'Discover amazing tech gadgets, audio equipment, and accessories.',
    sameAs: [
      'https://twitter.com/affiliatehub',
      'https://facebook.com/affiliatehub',
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AffiliateHub',
    url: 'https://affiliatehub.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://affiliatehub.com?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
