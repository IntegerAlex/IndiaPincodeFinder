# IndiaPincodeFinder

IndiaPincodeFinder is a Python module that helps you find detailed Indian address information by using a valid 6-digit PIN code. It's ideal for use in logistics, address validation, fintech onboarding (KYC), e-commerce, and mapping services.

## Installation

```bash
pip install indiapincodefinder
```

## Usage

```python
from indiapincodefinder import pin_to_address, pin_to_state, pin_to_district, pin_to_taluka

# Get the full address details for a pincode
print(pin_to_address(411001))

# Get the state for a pincode
print(pin_to_state(411001))

# Get the district for a pincode
print(pin_to_district(411001))

# Get the taluka/block for a pincode
print(pin_to_taluka(411001))
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

For commercial use without GPL compliance, please contact the authors for licensing options. 