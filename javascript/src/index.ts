import * as fs from 'fs';
import * as path from 'path';
// Using require for flat-cache due to its CommonJS format
// eslint-disable-next-line @typescript-eslint/no-var-requires
const flatCache = require('flat-cache');

// Type definitions
export interface PincodeData {
  district: string;
  block: string;
  state: string;
  [key: string]: string;
}

interface CachedPincodeData {
  data: {[key: string]: PincodeData};
  mtime: number;
}

// Create cache instance
const cache = flatCache.create('pincode-cache', path.join(__dirname, '..', 'data'));

// In-memory cache for frequently accessed data
let pincodeCache: { [key: string]: PincodeData } = {};

/**
 * Loads pincode data with automatic disk caching
 * @param jsonPath Optional path to a custom JSON file
 */
export function loadPincodeData(jsonPath?: string): { [key: string]: PincodeData } {
  // Return in-memory cache if available
  if (Object.keys(pincodeCache).length > 0) {
    return pincodeCache;
  }

  const dataPath = jsonPath || path.join(__dirname, '..', 'data', 'pincode.json');
  const cacheKey = 'pincode-data';
  
  try {
    // Get file stats for cache invalidation
    const fileStats = fs.statSync(dataPath);
    const cachedData = cache.getKey(cacheKey) as CachedPincodeData | undefined;
    
    // Check if cache is valid (file hasn't changed)
    if (cachedData && cachedData.mtime === fileStats.mtime.getTime()) {
      pincodeCache = cachedData.data;
      return pincodeCache;
    }

    // Load and parse fresh data
    const rawData = fs.readFileSync(dataPath, 'utf8');
    pincodeCache = JSON.parse(rawData);

    // Cache the data with file modification time
    cache.setKey(cacheKey, {
      data: pincodeCache,
      mtime: fileStats.mtime.getTime(),
    });
    cache.save(); // Persist to disk

    return pincodeCache;
  } catch (error) {
    console.error(`Error loading pincode data: ${error}`);
    return {};
  }
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  cache.removeCacheFile();
  pincodeCache = {};
}

/**
 * Get full address details for a pincode
 * @param pincode 6-digit PIN code
 * @returns Address object or null if not found
 * @throws Error if the pincode is not a valid 6-digit number.
 */
export function pinToAddress(pincode: number): PincodeData | null {
  if (typeof pincode !== 'number' || !/^[0-9]{6}$/.test(pincode.toString())) {
    throw new Error('Pincode must be a 6-digit number.');
  }
  const data = loadPincodeData();
  return data[pincode.toString()] || null;
}

/**
 * Get state for a pincode
 * @param pincode 6-digit PIN code
 * @returns State name or null if not found
 * @throws Error if the pincode is not a valid 6-digit number.
 */
export function pinToState(pincode: number): string | null {
  if (typeof pincode !== 'number' || !/^[0-9]{6}$/.test(pincode.toString())) {
    throw new Error('Pincode must be a 6-digit number.');
  }
  const data = pinToAddress(pincode);
  return data?.state || null;
}

/**
 * Get district for a pincode
 * @param pincode 6-digit PIN code
 * @returns District name or null if not found
 * @throws Error if the pincode is not a valid 6-digit number.
 */
export function pinToDistrict(pincode: number): string | null {
  if (typeof pincode !== 'number' || !/^[0-9]{6}$/.test(pincode.toString())) {
    throw new Error('Pincode must be a 6-digit number.');
  }
  const data = pinToAddress(pincode);
  return data?.district || null;
}

/**
 * Get taluka/block for a pincode
 * @param pincode 6-digit PIN code
 * @returns Taluka/Block name or null if not found
 * @throws Error if the pincode is not a valid 6-digit number.
 */
export function pinToTaluka(pincode: number): string | null {
  if (typeof pincode !== 'number' || !/^[0-9]{6}$/.test(pincode.toString())) {
    throw new Error('Pincode must be a 6-digit number.');
  }
  const data = pinToAddress(pincode);
  return data?.block || null;
}

// Auto-load pincode data when module is imported
loadPincodeData();