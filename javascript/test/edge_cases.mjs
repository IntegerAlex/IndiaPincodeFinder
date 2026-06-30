import { pinToAddress, pinToState, pinToDistrict, pinToTaluka, searchPincodes, clearCache } from '../dist/index.mjs';

let fail = 0;
const assert = (cond, msg) => { if (!cond) { console.error(`✗ FAIL: ${msg}`); fail++; } else { console.log(`✓ ${msg}`); } };

console.log('=== PINCODE INPUT EDGE CASES ===');

// Non-6-digit numbers — JS throws
try { pinToAddress(123); assert(false, '3-digit should throw'); } catch (e) { assert(e.message.includes('6-digit'), '3-digit throws 6-digit error'); }
try { pinToAddress(1234567); assert(false, '7-digit should throw'); } catch (e) { assert(e.message.includes('6-digit'), '7-digit throws 6-digit error'); }
try { pinToAddress(11000); assert(false, '5-digit should throw'); } catch (e) { assert(e.message.includes('6-digit'), '5-digit throws 6-digit error'); }

// Negative
try { pinToAddress(-110001); assert(false, 'negative should throw'); } catch (e) { assert(true, 'negative throws'); }

// Float
try { pinToAddress(411001.5); assert(false, 'float should throw'); } catch (e) { assert(true, 'float throws'); }

// String
try { pinToAddress("411001"); assert(false, 'string should throw'); } catch (e) { assert(true, 'string throws'); }

// null / undefined
try { pinToAddress(null); assert(false, 'null should throw'); } catch (e) { assert(true, 'null throws'); }
try { pinToAddress(undefined); assert(false, 'undefined should throw'); } catch (e) { assert(true, 'undefined throws'); }

// Valid boundary pincodes
const delhi = pinToAddress(110001);
assert(delhi !== null, 'Delhi 110001 returns data');
assert(delhi.district === 'Central Delhi', 'Delhi district correct');
assert(delhi.state === 'Delhi', 'Delhi state correct');
assert(delhi.block === 'New Delhi', 'Delhi block correct');

const arunachal = pinToAddress(790001);
assert(arunachal !== null, 'Arunachal 790001 returns data');
assert(arunachal.state === 'Arunachal Pradesh', 'Arunachal state correct');

// Non-existent valid-format pincode
assert(pinToAddress(999999) === null, '999999 returns null');
assert(pinToAddress(123456) === null, '123456 returns null');

// pinToState / pinToDistrict / pinToTaluka null
assert(pinToState(999999) === null, 'pinToState(999999) returns null');
assert(pinToDistrict(999999) === null, 'pinToDistrict(999999) returns null');
assert(pinToTaluka(999999) === null, 'pinToTaluka(999999) returns null');

console.log('\n=== SEARCH EDGE CASES ===');

// Empty / whitespace
assert(searchPincodes('').length === 0, 'empty string returns []');
assert(searchPincodes('   ').length === 0, 'whitespace returns []');
assert(searchPincodes('\t\n').length === 0, 'tabs/newlines returns []');

// Single character
assert(searchPincodes('a').length > 0, '"a" returns results');
assert(searchPincodes('z').length > 0, '"z" returns results');

// Officename search
assert(searchPincodes('pune h.o').length > 0, '"pune h.o" matches officename');
assert(searchPincodes('New Delhi GPO').length > 0, '"New Delhi GPO" matches officename');

// Very long query
assert(searchPincodes('pune district maharashtra india pincode office').length === 0, 'overly long query returns []');

// Unicode / special chars
assert(searchPincodes('₹').length === 0, 'currency symbol returns []');
assert(searchPincodes('<script>').length === 0, 'HTML tag returns []');
assert(searchPincodes("'; DROP TABLE--").length === 0, 'SQL injection returns []');
assert(searchPincodes('   ').length === 0, 'spaces only returns []');

// Case variations
const lower = searchPincodes('pune');
const upper = searchPincodes('PUNE');
const mixed = searchPincodes('PuNe');
assert(lower.length === upper.length, 'case-insensitive: lower == upper');
assert(lower.length === mixed.length, 'case-insensitive: lower == mixed');
assert(lower.length > 0, 'pune returns results');

// Substring match
assert(searchPincodes('pun').length > 0, '"pun" matches');
assert(searchPincodes('p').length > 0, '"p" matches');
assert(searchPincodes('mum').length > 0, '"mum" matches');

// Non-matching
assert(searchPincodes('xyzzy12345').length === 0, 'nonsense returns []');
assert(searchPincodes('99999').length === 0, 'all-9 query returns []');

console.log('\n=== SEARCH SORT ORDER ===');
const results = searchPincodes('mumbai');
assert(results.length > 1, 'sort test has enough results');
for (let i = 1; i < results.length; i++) {
  assert(results[i-1].pincode <= results[i].pincode, `sorted: ${results[i-1].pincode} <= ${results[i].pincode}`);
}

console.log('\n=== SEARCH RESULT STRUCTURE ===');
const sample = searchPincodes('delhi')[0];
assert(sample !== undefined, 'search result exists');
assert(typeof sample.pincode === 'number', 'pincode is number');
assert(typeof sample.state === 'string', 'state is string');
assert(typeof sample.district === 'string', 'district is string');
assert(typeof sample.block === 'string', 'block is string');
assert(sample.officename !== undefined, 'officename present');
assert(sample.circlename !== undefined, 'circlename present');

console.log('\n=== CACHE BEHAVIOR ===');
clearCache();
assert(pinToAddress(411001) !== null, 'data reloads after clearCache()');
assert(pinToAddress(411001).district === 'Pune', 'reloaded data is correct');

console.log('\n=== SUMMARY ===');
console.log(fail === 0 ? '✓ ALL EDGE CASES PASSED' : `✗ ${fail} FAILURES`);
if (fail > 0) process.exit(1);
