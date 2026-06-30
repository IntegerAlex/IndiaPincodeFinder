#!/usr/bin/env python3
"""Edge case tests for indiapincodefinder"""

from indiapincodefinder import pin_to_address, pin_to_state, pin_to_district, pin_to_taluka, search_pincodes

fail = 0

def check(cond, msg):
    global fail
    if cond:
        print(f"✓ {msg}")
    else:
        print(f"✗ FAIL: {msg}")
        fail += 1

print("=== PINCODE INPUT EDGE CASES ===")

# Non-6-digit numbers — Python returns None (no validation)
check(pin_to_address(123) is None, "3-digit pincode returns None")
check(pin_to_address(1234567) is None, "7-digit pincode returns None")
check(pin_to_address(11000) is None, "5-digit pincode returns None")

# Negative
check(pin_to_address(-110001) is None, "negative pincode returns None")

# Float
check(pin_to_address(411001.5) is None, "float pincode returns None")

# Zero
check(pin_to_address(0) is None, "zero pincode returns None")

# String instead of int
check(pin_to_address("411001") is None, "string pincode returns None")

# None
check(pin_to_address(None) is None, "None pincode returns None")

# Valid boundary pincodes
delhi = pin_to_address(110001)
check(delhi is not None, "Delhi 110001 returns data")
check(delhi.get("district") == "Central Delhi", "Delhi district correct")
check(delhi.get("state") == "Delhi", "Delhi state correct")
check(delhi.get("block") == "New Delhi", "Delhi block correct")

arunachal = pin_to_address(790001)
check(arunachal is not None, "Arunachal 790001 returns data")
check(arunachal.get("state") == "Arunachal Pradesh", "Arunachal state correct")

# Non-existent valid-format pincode
check(pin_to_address(999999) is None, "999999 returns None")
check(pin_to_address(123456) is None, "123456 returns None")

# pin_to_state / pin_to_district / pin_to_taluka None
check(pin_to_state(999999) is None, "pin_to_state(999999) returns None")
check(pin_to_district(999999) is None, "pin_to_district(999999) returns None")
check(pin_to_taluka(999999) is None, "pin_to_taluka(999999) returns None")

print("\n=== SEARCH EDGE CASES ===")

# Empty / whitespace
check(len(search_pincodes("")) == 0, "empty string returns []")
check(len(search_pincodes("   ")) == 0, "whitespace returns []")
check(len(search_pincodes("\t\n")) == 0, "tabs/newlines returns []")

# Single character
check(len(search_pincodes("a")) > 0, '"a" returns results')
check(len(search_pincodes("z")) > 0, '"z" returns results')

# Officename search
check(len(search_pincodes("pune h.o")) > 0, '"pune h.o" matches officename')
check(len(search_pincodes("New Delhi GPO")) > 0, '"New Delhi GPO" matches officename')

# Very long query
check(len(search_pincodes("pune district maharashtra india pincode office")) == 0, "overly long query returns []")

# Special characters
check(len(search_pincodes("₹")) == 0, "currency symbol returns []")
check(len(search_pincodes("<script>")) == 0, "HTML tag returns []")
check(len(search_pincodes("'; DROP TABLE--")) == 0, "SQL injection returns []")
check(len(search_pincodes("   ")) == 0, "spaces only returns []")

# Case variations
lower = search_pincodes("pune")
upper = search_pincodes("PUNE")
mixed = search_pincodes("PuNe")
check(len(lower) == len(upper), "case-insensitive: lower == upper")
check(len(lower) == len(mixed), "case-insensitive: lower == mixed")
check(len(lower) > 0, "pune returns results")

# Substring match
check(len(search_pincodes("pun")) > 0, '"pun" matches')
check(len(search_pincodes("p")) > 0, '"p" matches')
check(len(search_pincodes("mum")) > 0, '"mum" matches')

# Non-matching
check(len(search_pincodes("xyzzy12345")) == 0, "nonsense returns []")
check(len(search_pincodes("99999")) == 0, "all-9 query returns []")

print("\n=== SEARCH SORT ORDER ===")
results = search_pincodes("mumbai")
check(len(results) > 1, "sort test has enough results")
for i in range(1, len(results)):
    check(results[i-1]["pincode"] <= results[i]["pincode"],
          f"sorted: {results[i-1]['pincode']} <= {results[i]['pincode']}")

print("\n=== SEARCH RESULT STRUCTURE ===")
sample = search_pincodes("delhi")[0]
check(sample is not None, "search result exists")
check(isinstance(sample["pincode"], int), "pincode is int")
check(isinstance(sample["state"], str), "state is str")
check(isinstance(sample["district"], str), "district is str")
check(isinstance(sample["block"], str), "block is str")
check("officename" in sample, "officename present")
check("circlename" in sample, "circlename present")

print("\n=== SUMMARY ===")
if fail == 0:
    print("✓ ALL EDGE CASES PASSED")
else:
    print(f"✗ {fail} FAILURES")
    exit(1)
