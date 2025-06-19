#!/usr/bin/env python3
"""
Test script for IndiaPincodeFinder package
"""

try:
    from indiapincodefinder import pin_to_address, pin_to_state, pin_to_district, pin_to_taluka
    print("✓ Successfully imported all functions from indiapincodefinder")
except ImportError as e:
    print(f"✗ Import failed: {e}")
    exit(1)

# Test with a few sample pincodes
test_pincodes = [411001, 110001, 400001, 560001, 600001]

print("\n" + "="*60)
print("TESTING INDIAPINCODEFINDER PACKAGE")
print("="*60)

for pincode in test_pincodes:
    print(f"\nTesting pincode: {pincode}")
    print("-" * 30)
    
    # Test full address
    address = pin_to_address(pincode)
    if address:
        print(f"✓ Full address: {address}")
        
        # Test individual components
        state = pin_to_state(pincode)
        district = pin_to_district(pincode)
        taluka = pin_to_taluka(pincode)
        
        print(f"  - State: {state}")
        print(f"  - District: {district}")
        print(f"  - Taluka/Block: {taluka}")
    else:
        print(f"✗ No data found for pincode {pincode}")

# Test with invalid pincode
print(f"\nTesting invalid pincode: 999999")
print("-" * 30)
invalid_result = pin_to_address(999999)
if invalid_result is None:
    print("✓ Correctly returns None for invalid pincode")
else:
    print(f"✗ Unexpected result for invalid pincode: {invalid_result}")

print("\n" + "="*60)
print("TESTING COMPLETE")
print("="*60) 