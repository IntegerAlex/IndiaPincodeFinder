/**
 * Test script for India Pincode Finder
 */

// Import package functions
const { 
  pinToAddress,
  pinToState, 
  pinToDistrict, 
  pinToTaluka 
} = require('../dist');

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
console.log('TESTING COMPLETE');
console.log('='.repeat(60)); 