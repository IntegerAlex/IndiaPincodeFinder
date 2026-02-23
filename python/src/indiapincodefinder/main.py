import json
import os
from cachetools import Cache

cache = Cache(maxsize=1_000_000)

def load_pincode_data(json_path=None):
    """
    Load pincode data from a JSON file and populate the persistent cache.
    
    If no path is provided, loads from the default bundled JSON file. Supports both a normalized format (with 'locations' and 'pincodes' keys) and the original flat mapping format. Each pincode is stored as an integer key in the cache with its associated location or address information.
    
    Parameters:
        json_path (str, optional): Path to the JSON file containing pincode data. If not provided, uses the default bundled file.
    """
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

