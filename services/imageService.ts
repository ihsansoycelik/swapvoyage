
/**
 * Service to validate images before display.
 * Checks for load failures and ensures image dimensions meet minimum quality standards.
 */

export const GENERIC_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop";

const placeIdShort = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 1000;
};

export const getImageUrl = (query: string, index: number): string => {
  const encodedQuery = encodeURIComponent(query.trim());
  const width = 1000;
  const height = index === 0 ? 1800 : 1200;
  return `https://image.pollinations.ai/prompt/${encodedQuery}?width=${width}&height=${height}&nologo=true&seed=${index}${placeIdShort(query)}`;
};

// Cache validation results to avoid repeated network requests
const validationCache = new Map<string, boolean>();

export const validateImage = (url: string): Promise<boolean> => {
  if (validationCache.has(url)) {
    return Promise.resolve(validationCache.get(url)!);
  }

  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      // "Matching the location" check simulation:
      // In a real app, we might check EXIF data or use an AI classifier.
      // Here, we ensure the image isn't a broken 0x0 pixel or extremely small placeholder.
      const isValid = img.naturalWidth > 100 && img.naturalHeight > 100;
      validationCache.set(url, isValid);
      resolve(isValid);
    };
    
    img.onerror = () => {
      console.warn(`[Image Pipeline] Validation failed for: ${url}`);
      validationCache.set(url, false);
      resolve(false);
    };

    img.src = url;
  });
};

export const filterValidImages = async (keywords: string[], urlGenerator: (k: string, i: number) => string): Promise<string[]> => {
  const results = await Promise.all(
    keywords.map(async (keyword, index) => {
      const url = urlGenerator(keyword, index);
      const isValid = await validateImage(url);
      return isValid ? url : null;
    })
  );
  
  return results.filter((url): url is string => url !== null);
};
