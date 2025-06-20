# 🇮🇳 IndiaPincodeFinder
[![PyPI Downloads](https://static.pepy.tech/badge/indiapincodefinder)](https://pepy.tech/projects/indiapincodefinder)
![NPM Downloads](https://img.shields.io/npm/dt/india-pincode-finder?style=plastic&logo=npm)

**Pending Tasks**
1) Writing Development Docs/Guide
2) Pushing to PIP
3) Language Specefic Development

**IndiaPincodeFinder** is a versatile module available in both **Python** and **JavaScript (Node.js)** that helps you **find detailed Indian address information by using a valid 6-digit PIN code**. It's ideal for use in logistics, address validation, fintech onboarding (KYC), e-commerce, and mapping services.

---

## 📦 Features

- 🔎 Lookup addresses by PIN code (Postal Index Number)
- 🧾 Returns location metadata: state, district, taluka.
- ⚡ Fast lookup with offline JSON dataset (no API call needed)
- 🧩 Plug-and-play for both Python and Node.js applications

---

## Python Package

### 🚀 Installation (Python)

Install via `pip`:

```bash
pip install indiapincodefinder
```

### 📖 Usage (Python)

```python
import indiapincodefinder

# Get address by Pincode
address = indiapincodefinder.pin_to_address(pincode=400001)

# Get state by Pincode
state = indiapincodefinder.pin_to_state(pincode=400001)

# Get district by Pincode
district = indiapincodefinder.pin_to_district(pincode=400001)

# Get taluka by Pincode
taluka = indiapincodefinder.pin_to_taluka(pincode=400001)

```

---

## JavaScript Package (Node.js)

### 🚀 Installation (JavaScript)

Install via `npm`:

```bash
npm install india-pincode-finder
```

### 📖 Usage (JavaScript)

```javascript
// CommonJS
const { 
  pinToAddress, 
  pinToState, 
  pinToDistrict, 
  pinToTaluka,
  clearCache
} = require('india-pincode-finder');

// ES Modules
import { 
  pinToAddress, 
  pinToState, 
  pinToDistrict, 
  pinToTaluka,
  clearCache
} from 'india-pincode-finder';

// Get the full address details for a pincode
console.log(pinToAddress(411001));
// Output: { district: 'Pune', block: 'Pune City', state: 'Maharashtra' }

// Get the state for a pincode
console.log(pinToState(411001));
// Output: 'Maharashtra'

// Get the district for a pincode
console.log(pinToDistrict(411001));
// Output: 'Pune'

// Get the taluka/block for a pincode
console.log(pinToTaluka(411001));
// Output: 'Pune City'

// Clear the cache (useful if your application needs to refresh data)
clearCache();
```

### API (JavaScript)

### pinToAddress(pincode: number): object | null

Get full address details for a pincode.

- **pincode**: 6-digit PIN code (number)
- **Returns**: 
  - `object`: An object like `{ district: string; block: string; state: string; }` if found.
  - `null`: If no data is found for the given pincode.

### pinToState(pincode: number): string | null

Get state for a pincode.

- **pincode**: 6-digit PIN code (number)
- **Returns**: 
  - `string`: The name of the state if found.
  - `null`: If no data is found for the given pincode.

### pinToDistrict(pincode: number): string | null

Get district for a pincode.

- **pincode**: 6-digit PIN code (number)
- **Returns**: 
  - `string`: The name of the district if found.
  - `null`: If no data is found for the given pincode.

### pinToTaluka(pincode: number): string | null

Get taluka/block for a pincode.

- **pincode**: 6-digit PIN code (number)
- **Returns**: 
  - `string`: The name of the taluka/block if found.
  - `null`: If no data is found for the given pincode.

### clearCache(): void

Clears both the in-memory and disk cache.

- **Returns**: Nothing (void)
- **Use case**: Call this method if you want to force a fresh load of data from the source JSON file

### Caching Mechanism (JavaScript)

The package uses a two-level caching strategy for optimal performance:

1. **In-memory cache**: Provides the fastest access for frequently used data
2. **Disk cache**: Persists between application runs, improving startup performance

The cache is automatically invalidated when the source data file is modified.

## 📄 License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

For commercial use without GPL compliance, please contact the authors for licensing options.

## Copyright

[@IntegerAlex](https://github.com/IntegerAlex)
[@AniketDhumal](https://github.com/Aniket-Dhumal)

## 📄 Disclaimer

This project is for educational purposes only. The data is sourced from public databases.

## 📄 Contact

For any questions or feedback, please contact [@IntegerAlex](mailto:inquiry.akshatkotpalliwar@gmail.com) or [@AniketDhumal](mailto:anikethd1410@gmail.com).
