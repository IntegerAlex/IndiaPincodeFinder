# 🇮🇳 IndiaPincodeFinder

[![PyPI Downloads](https://static.pepy.tech/badge/indiapincodefinder)](https://pepy.tech/projects/indiapincodefinder)
![NPM Downloads](https://img.shields.io/npm/dt/india-pincode-finder?style=plastic&logo=npm)

**IndiaPincodeFinder** is a versatile module available in both **Python** and **JavaScript (Node.js)** that helps you **find detailed Indian address information by using a valid 6-digit PIN code**. It's ideal for use in logistics, address validation, fintech onboarding (KYC), e-commerce, and mapping services.

Live demo: [india-pincode-finder.gossorg.in](https://india-pincode-finder.gossorg.in)

---

## 📦 Features

- 🔎 Lookup addresses by PIN code (Postal Index Number)
- 🔍 **Search pincodes** by district, block, or office name (v4.0.0)
- 🧾 Returns full metadata: state, district, block, circle, region, division
- ⚡ Fast lookup with offline dataset (no API call needed)
- 🧩 Plug-and-play for both Python and Node.js applications

---

## Python Package

### 🚀 Installation (Python)

```bash
pip install indiapincodefinder
```

### 📖 Usage (Python)

```python
from indiapincodefinder import (
    pin_to_address,
    pin_to_state,
    pin_to_district,
    pin_to_taluka,
    search_pincodes,
)

# Get full address details for a pincode
address = pin_to_address(411001)
# → {'state': 'Maharashtra', 'district': 'Pune', 'block': 'Pune City', ...}

# Get state for a pincode
state = pin_to_state(411001)
# → 'Maharashtra'

# Get district for a pincode
district = pin_to_district(411001)
# → 'Pune'

# Get taluka/block for a pincode
taluka = pin_to_taluka(411001)
# → 'Pune City'

# Search pincodes by district, block, or office name
results = search_pincodes("pune")
# → [{'pincode': 410301, 'district': 'Pune', ...}, ...]
```

---

## JavaScript Package (Node.js)

### 🚀 Installation (JavaScript)

```bash
npm install india-pincode-finder
```

### 📖 Usage (JavaScript)

```javascript
// ES Modules
import {
  pinToAddress,
  pinToState,
  pinToDistrict,
  pinToTaluka,
  searchPincodes,
} from "india-pincode-finder";

// CommonJS
const {
  pinToAddress,
  pinToState,
  pinToDistrict,
  pinToTaluka,
  searchPincodes,
} = require("india-pincode-finder");

// Get the full address details for a pincode
pinToAddress(411001);
// → { district: 'Pune', block: 'Pune City', state: 'Maharashtra', ... }

// Get the state for a pincode
pinToState(411001);
// → 'Maharashtra'

// Get the district for a pincode
pinToDistrict(411001);
// → 'Pune'

// Get the taluka/block for a pincode
pinToTaluka(411001);
// → 'Pune City'

// Search pincodes by district, block, or office name
searchPincodes("pune");
// → [{ pincode: 410301, district: 'Pune', ... }, ...]
```

---

## API Reference

### `pinToAddress(pincode): object | null`

Get full address details for a pincode.

- **pincode**: 6-digit PIN code (number)
- **Returns**: Object with `state`, `district`, `block`, `officename`, `circlename`, `regionname`, `divisionname`, or `null` if not found.
- **Throws**: `Error` if pincode is not a valid 6-digit number (JS only).

### `pinToState(pincode): string | null`

Get state for a pincode.

### `pinToDistrict(pincode): string | null`

Get district for a pincode.

### `pinToTaluka(pincode): string | null`

Get taluka/block for a pincode.

### `searchPincodes(query): PincodeSearchResult[]`

Search pincodes by district, block, or office name.

- **query**: Search string (case-insensitive, matches against `district`, `block`, `officename`)
- **Returns**: Array of matching pincode objects, sorted by pincode ascending.

### `clearCache(): void` (JS only)

Clears both the in-memory and disk cache. Useful to force a fresh load of data.

### `loadPincodeData(jsonPath?): object` (JS only)

Loads pincode data with caching. Auto-called on module import.

### `load_pincode_data()` (Python only)

Loads pincode data into cache. Auto-called on import.

---

## Caching Mechanism (JavaScript)

The package uses a two-level caching strategy:

1. **In-memory cache**: Fastest access for frequently used data
2. **Disk cache**: Persists between runs, improving startup performance

Cache is automatically invalidated when the source data file is modified.

---

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
