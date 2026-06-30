# India Pincode Finder — Demo App

A simple Next.js demo for the [india-pincode-finder](https://www.npmjs.com/package/india-pincode-finder) library. Enter any 6-digit Indian pincode to get full address details.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Library Installation

### JavaScript / Node.js

```bash
npm install india-pincode-finder
# or
pnpm add india-pincode-finder
# or
yarn add india-pincode-finder
```

#### Usage

```js
import {
  pinToAddress,
  pinToState,
  pinToDistrict,
  pinToTaluka,
  searchPincodes,
} from "india-pincode-finder";

// Full address
pinToAddress(411001);
// → { state: "Maharashtra", district: "Pune", block: "Pune City",
//     officename: "Pune H.O", circlename: "...", ... }

// Individual fields
pinToState(411001);    // "Maharashtra"
pinToDistrict(411001); // "Pune"
pinToTaluka(411001);   // "Pune City"

// Search by district, block, or office name
searchPincodes("pune");
// → [{ pincode: 410301, state: "...", district: "Pune", ... }, ...]
```

### Python

```bash
pip install indiapincodefinder
```

#### Usage

```python
from indiapincodefinder import (
    pin_to_address,
    pin_to_state,
    pin_to_district,
    pin_to_taluka,
    search_pincodes,
)

# Full address
pin_to_address(411001)
# → {'state': 'Maharashtra', 'district': 'Pune', 'block': 'Pune City',
#    'officename': 'Pune H.O', 'circlename': '...', ...}

# Individual fields
pin_to_state(411001)     # 'Maharashtra'
pin_to_district(411001)  # 'Pune'
pin_to_taluka(411001)    # 'Pune City'

# Search by district, block, or office name
search_pincodes("pune")
# → [{'pincode': 410301, 'state': '...', 'district': 'Pune', ...}, ...]
```

---

## API Reference

| Function | Returns |
|----------|---------|
| `pinToAddress(pincode)` | Full address object or `null` |
| `pinToState(pincode)` | State name or `null` |
| `pinToDistrict(pincode)` | District name or `null` |
| `pinToTaluka(pincode)` | Block/taluka name or `null` |
| `searchPincodes(query)` | Array of matching address objects, sorted by pincode |

## Links

- [npm](https://www.npmjs.com/package/india-pincode-finder)
- [PyPI](https://pypi.org/project/indiapincodefinder/)
- [GitHub](https://github.com/IntegerAlex/IndiaPincodeFinder)
