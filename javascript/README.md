# India Pincode Finder

A Node.js module that helps you find detailed Indian address information by using a valid 6-digit PIN code. It's ideal for use in logistics, address validation, fintech onboarding (KYC), e-commerce, and mapping services.

## Installation

```bash
npm install india-pincode-finder
```

## Usage

```javascript
// CommonJS
const { 
  pinToAddress, 
  pinToState, 
  pinToDistrict, 
  pinToTaluka 
} = require('india-pincode-finder');

// ES Modules
import { 
  pinToAddress, 
  pinToState, 
  pinToDistrict, 
  pinToTaluka 
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
```

## API

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

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](../LICENSE) file for details.

For commercial use without GPL compliance, please contact the authors for licensing options. 