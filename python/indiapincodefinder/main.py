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
        for pin, address in data.items():
            cache[int(pin)] = address

# Call once when module is imported
if len(cache) == 0:
    load_pincode_data()

