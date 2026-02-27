/**
 * Fuzzy Search Utility
 * Implements a fuzzy matching algorithm for typo-tolerant, partial-match search
 * Scores matches based on character positions and word boundaries
 */

export interface SearchResult<T> {
  item: T;
  score: number;
  matches: number[];
}

/**
 * Calculate the Levenshtein distance between two strings
 * Used to handle typos and misspellings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Find all character positions where query matches text
 */
function findMatchPositions(text: string, query: string): number[] {
  const positions: number[] = [];
  let searchStart = 0;

  for (let i = 0; i < query.length; i++) {
    const index = text.toLowerCase().indexOf(query[i].toLowerCase(), searchStart);
    if (index === -1) return [];
    positions.push(index);
    searchStart = index + 1;
  }

  return positions;
}

/**
 * Calculate match score based on various factors
 */
function calculateScore(
  text: string,
  query: string,
  matches: number[]
): number {
  if (matches.length === 0) return 0;

  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact match
  if (textLower === queryLower) return 10000;

  // Starts with query
  if (textLower.startsWith(queryLower)) return 5000;

  // Word boundary match (space before match)
  const hasWordBoundary = matches.some((pos) => pos === 0 || text[pos - 1] === " ");
  if (hasWordBoundary) return 4000;

  // Consecutive characters
  let consecutiveChars = 1;
  for (let i = 1; i < matches.length; i++) {
    if (matches[i] === matches[i - 1] + 1) {
      consecutiveChars++;
    }
  }
  const consecutiveScore = consecutiveChars * 100;

  // Distance penalty: closer matches score higher
  const totalDistance = matches[matches.length - 1] - matches[0];
  const distancePenalty = totalDistance * 10;

  // Levenshtein distance bonus for typo tolerance
  const distance = levenshteinDistance(textLower, queryLower);
  const typoPenalty = distance * 50;

  // Position bonus: earlier matches score higher
  const positionBonus = 100 - matches[0];

  return (
    consecutiveScore +
    positionBonus +
    2000 -
    distancePenalty -
    typoPenalty
  );
}

/**
 * Main fuzzy search function
 * @param items Array of items to search
 * @param query Search query string
 * @param searchFields Fields to search in each item
 * @returns Sorted array of results with scores
 */
export function fuzzySearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  searchFields: (keyof T)[]
): SearchResult<T>[] {
  if (!query.trim()) {
    return items.map((item) => ({
      item,
      score: 0,
      matches: [],
    }));
  }

  const queryTrimmed = query.trim().toLowerCase();
  const results: SearchResult<T>[] = [];

  for (const item of items) {
    let bestScore = 0;
    let bestMatches: number[] = [];

    for (const field of searchFields) {
      const fieldValue = String(item[field]).toLowerCase();
      const matches = findMatchPositions(fieldValue, queryTrimmed);

      if (matches.length > 0) {
        const score = calculateScore(fieldValue, queryTrimmed, matches);

        if (score > bestScore) {
          bestScore = score;
          bestMatches = matches;
        }
      }
    }

    if (bestScore > 0) {
      results.push({
        item,
        score: bestScore,
        matches: bestMatches,
      });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Simple substring search for quick matching
 * Used as a pre-filter before fuzzy search
 */
export function quickSearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] {
  const queryLower = query.toLowerCase().trim();
  if (!queryLower) return items;

  return items.filter((item) =>
    searchFields.some((field) =>
      String(item[field]).toLowerCase().includes(queryLower)
    )
  );
}

/**
 * Debounced search wrapper
 * Used to limit search calls while user is typing
 */
export function createDebouncedSearch<T extends Record<string, any>>(
  searchFn: (query: string) => SearchResult<T>[],
  delay: number = 150
) {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastQuery = "";

  return (query: string, callback: (results: SearchResult<T>[]) => void) => {
    lastQuery = query;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      const results = searchFn(lastQuery);
      callback(results);
    }, delay);
  };
}
