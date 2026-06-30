import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type definitions
export interface PincodeData {
  district: string;
  block: string;
  state: string;
  officename?: string;
  circlename?: string;
  regionname?: string;
  divisionname?: string;
}

export interface PincodeSearchResult extends PincodeData {
  pincode: number;
}

const SEARCH_FIELDS = ['district', 'block', 'officename'] as const;

function matchesSearchQuery(data: PincodeData, query: string): boolean {
  return SEARCH_FIELDS.some((field) => {
    const value = (data[field] || '').toLowerCase();
    return value.includes(query);
  });
}

// In-memory cache for frequently accessed data
let pincodeCache: { [key: string]: PincodeData } = {};
let cacheLoaded = false;

/**
 * Loads pincode data with in-memory caching
 * @param jsonPath Optional path to a custom JSON file
 */
export function loadPincodeData(jsonPath?: string): { [key: string]: PincodeData } {
  // Return in-memory cache if available
  if (cacheLoaded && Object.keys(pincodeCache).length > 0) {
    return pincodeCache;
  }

  const dataPath = jsonPath || path.join(__dirname, '..', 'data', 'pincode.json');
  
  try {
    // Load and parse fresh data
    const rawData = fs.readFileSync(dataPath, 'utf8');
    pincodeCache = JSON.parse(rawData);
    cacheLoaded = true;

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
  pincodeCache = {};
  cacheLoaded = false;
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

/**
 * Search district, block, and officename for a case-insensitive substring match.
 * @param name Search query
 * @returns Matching address objects with pincode included, sorted ascending by pincode
 */
export function searchPincodes(name: string): PincodeSearchResult[] {
  const query = name.trim().toLowerCase();
  if (!query) {
    return [];
  }

  const data = loadPincodeData();
  const results: PincodeSearchResult[] = [];

  for (const pincode of Object.keys(data)) {
    if (matchesSearchQuery(data[pincode], query)) {
      results.push({ pincode: Number(pincode), ...data[pincode] });
    }
  }

  return results.sort((a, b) => a.pincode - b.pincode);
}

// Auto-load pincode data when module is imported
loadPincodeData();