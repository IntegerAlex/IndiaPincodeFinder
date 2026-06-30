#!/usr/bin/env python3
"""
Test script for IndiaPincodeFinder package
"""

try:
    from indiapincodefinder import pin_to_address, pin_to_state, pin_to_district, pin_to_taluka, search_pincodes
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
print("TESTING SEARCH_PINCODES")
print("="*60)

pune_results = search_pincodes("pune")
if pune_results:
    print(f"✓ search_pincodes('pune') returned {len(pune_results)} results")
    for address in pune_results:
        district = (address.get("district") or "").lower()
        block = (address.get("block") or "").lower()
        officename = (address.get("officename") or "").lower()
        if "pune" not in district and "pune" not in block and "pune" not in officename:
            print(f"✗ Pincode {address.get('pincode')} does not match query in district, block, or officename")
            exit(1)
        if "pincode" not in address or "state" not in address:
            print("✗ Search result missing full address fields")
            exit(1)
    if not all(pune_results[i]["pincode"] <= pune_results[i + 1]["pincode"] for i in range(len(pune_results) - 1)):
        print("✗ Search results not sorted by ascending pincode")
        exit(1)
    print(f"  - Sample results: {pune_results[:3]}")
else:
    print("✗ search_pincodes('pune') returned no results")
    exit(1)

if search_pincodes("PUNE") == pune_results:
    print("✓ search_pincodes('PUNE') matches case-insensitive results")
else:
    print("✗ Case-insensitive search results differ")
    exit(1)

if search_pincodes("999999xyz") == []:
    print("✓ search_pincodes('999999xyz') returns empty list")
else:
    print("✗ Unexpected results for non-matching query")
    exit(1)

if search_pincodes("") == [] and search_pincodes("   ") == []:
    print("✓ Empty and whitespace queries return empty list")
else:
    print("✗ Empty or whitespace query did not return empty list")
    exit(1)

office_results = search_pincodes("pune h.o")
if any(result.get("pincode") == 411001 for result in office_results):
    print("✓ search_pincodes('pune h.o') matches by officename")
else:
    print("✗ search_pincodes('pune h.o') did not match expected officename")
    exit(1)

print("\n" + "="*60)
print("TESTING COMPLETE")
print("="*60) 