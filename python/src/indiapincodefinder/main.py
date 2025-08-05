import json
import os
from diskcache import Cache

cache = Cache(directory=os.path.expanduser('~/.pincodeinfo_cache'))

def load_pincode_data(json_path=None):
    if json_path is None:
        # Load default bundled JSON
        json_path = os.path.join(os.path.dirname(__file__), 'data', 'pincode.json')

    with open(json_path, 'r') as f:
        data = json.load(f)
        
        # Handle normalized JSON structure
        if 'locations' in data and 'pincodes' in data:
            # New normalized format
            locations = data['locations']
            pincodes = data['pincodes']
            
            # Convert to original format for backward compatibility
            for pin, location_id in pincodes.items():
                location_info = locations[str(location_id)]
                cache[int(pin)] = location_info
        else:
            # Original format (fallback)
            for pin, address in data.items():
                cache[int(pin)] = address

# Call once when module is imported
if len(cache) == 0:
    load_pincode_data()

