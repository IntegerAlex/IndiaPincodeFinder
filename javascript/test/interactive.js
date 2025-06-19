/**
 * Interactive test for India Pincode Finder
 */

import readline from 'readline';
import { 
  pinToAddress,
  pinToState, 
  pinToDistrict, 
  pinToTaluka 
} from '../dist/index.mjs';

function interactiveTest() {
  console.log('🔍 India Pincode Finder Interactive Tester');
  console.log('='.repeat(40));
  console.log('Enter pincodes to test (or "quit" to exit)');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function promptUser() {
    rl.question('\nEnter pincode: ', (input) => {
      const trimmedInput = input.trim().toLowerCase();
      
      if (['quit', 'exit', 'q'].includes(trimmedInput)) {
        console.log('Goodbye! 👋');
        rl.close();
        return;
      }
      
      const pincode = parseInt(trimmedInput, 10);
      
      if (isNaN(pincode)) {
        console.log('❌ Please enter a valid number');
        promptUser();
        return;
      }
      
      console.log(`\n📍 Results for pincode ${pincode}:`);
      console.log('-'.repeat(30));
      
      const address = pinToAddress(pincode);
      if (address) {
        console.log(`✓ Full address: ${JSON.stringify(address)}`);
        console.log(`  🏛️  State: ${pinToState(pincode)}`);
        console.log(`  🏘️  District: ${pinToDistrict(pincode)}`);
        console.log(`  🏢 Taluka/Block: ${pinToTaluka(pincode)}`);
      } else {
        console.log('❌ No data found for this pincode');
      }
      
      promptUser();
    });
  }
  
  promptUser();
}

interactiveTest(); 