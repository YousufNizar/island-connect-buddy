/**
 * Map Cache Utility
 * Caches Google Maps instances to optimize performance and reduce API calls
 */

// Cache map instances to avoid re-creating them
export const mapCache = new Map<string, google.maps.Map>();

/**
 * Get or create a cached map instance
 * @param key - Unique identifier for the map instance
 * @param creator - Function to create the map if not cached
 * @returns The cached or newly created map instance
 */
export const getCachedMap = (
  key: string,
  creator: () => google.maps.Map
): google.maps.Map => {
  if (!mapCache.has(key)) {
    mapCache.set(key, creator());
  }
  return mapCache.get(key)!;
};

/**
 * Clear a specific cached map instance
 * @param key - Unique identifier for the map instance
 */
export const clearCachedMap = (key: string): void => {
  mapCache.delete(key);
};

/**
 * Clear all cached map instances
 */
export const clearAllCachedMaps = (): void => {
  mapCache.clear();
};

/**
 * Get the number of cached map instances
 */
export const getCachedMapCount = (): number => {
  return mapCache.size;
};
