/**
 * Test script for India Pincode Finder
 */

// Import package functions
import { 
  pinToAddress,
  pinToState, 
  pinToDistrict, 
  pinToTaluka,
  searchPincodes
} from '../dist/index.mjs';

console.log('✓ Successfully imported all functions from india-pincode-finder');

// Test with some sample pincodes
const testPincodes = [411001, 110001, 400001, 560001, 600001];

console.log('\n' + '='.repeat(60));
console.log('TESTING INDIA-PINCODE-FINDER PACKAGE');
console.log('='.repeat(60));

for (const pincode of testPincodes) {
  console.log(`\nTesting pincode: ${pincode}`);
  console.log('-'.repeat(30));
  
  // Test full address
  const address = pinToAddress(pincode);
  if (address) {
    console.log(`✓ Full address: ${JSON.stringify(address)}`);
    
    // Test individual components
    const state = pinToState(pincode);
    const district = pinToDistrict(pincode);
    const taluka = pinToTaluka(pincode);
    
    console.log(`  - State: ${state}`);
    console.log(`  - District: ${district}`);
    console.log(`  - Taluka/Block: ${taluka}`);
  } else {
    console.log(`✗ No data found for pincode ${pincode}`);
  }
}

// Test with invalid pincode
console.log(`\nTesting invalid pincode: 999999`);
console.log('-'.repeat(30));
const invalidResult = pinToAddress(999999);
if (invalidResult === null) {
  console.log('✓ Correctly returns null for invalid pincode');
} else {
  console.log(`✗ Unexpected result for invalid pincode: ${JSON.stringify(invalidResult)}`);
}

console.log('\n' + '='.repeat(60));
console.log('TESTING SEARCH_PINCODES');
console.log('='.repeat(60));

const puneResults = searchPincodes('pune');
if (puneResults.length > 0) {
  console.log(`✓ searchPincodes('pune') returned ${puneResults.length} results`);
  const sample = puneResults.slice(0, 3);
  for (const address of sample) {
    const district = (address.district || '').toLowerCase();
    const block = (address.block || '').toLowerCase();
    const officename = (address.officename || '').toLowerCase();
    if (!district.includes('pune') && !block.includes('pune') && !officename.includes('pune')) {
      console.log(`✗ Pincode ${address.pincode} does not match query in district, block, or officename`);
      process.exit(1);
    }
    if (address.pincode === undefined || address.state === undefined) {
      console.log('✗ Search result missing full address fields');
      process.exit(1);
    }
  }
  console.log(`  - Sample results: ${JSON.stringify(sample)}`);
} else {
  console.log("✗ searchPincodes('pune') returned no results");
  process.exit(1);
}

if (JSON.stringify(searchPincodes('PUNE')) === JSON.stringify(puneResults)) {
  console.log("✓ searchPincodes('PUNE') matches case-insensitive results");
} else {
  console.log('✗ Case-insensitive search results differ');
  process.exit(1);
}

if (searchPincodes('999999xyz').length === 0) {
  console.log("✓ searchPincodes('999999xyz') returns empty list");
} else {
  console.log('✗ Unexpected results for non-matching query');
  process.exit(1);
}

if (searchPincodes('').length === 0 && searchPincodes('   ').length === 0) {
  console.log('✓ Empty and whitespace queries return empty list');
} else {
  console.log('✗ Empty or whitespace query did not return empty list');
  process.exit(1);
}

if (searchPincodes('pune h.o').some((result) => result.pincode === 411001)) {
  console.log("✓ searchPincodes('pune h.o') matches by officename");
} else {
  console.log("✗ searchPincodes('pune h.o') did not match expected officename");
  process.exit(1);
}

console.log('\n' + '='.repeat(60));
console.log('TESTING COMPLETE');
console.log('='.repeat(60)); 