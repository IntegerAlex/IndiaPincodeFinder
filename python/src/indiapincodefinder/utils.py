from .main import cache

def pin_to_address(pincode: int):
    return cache.get(pincode, None)

def pin_to_state(pincode: int):
    data = cache.get(pincode, None)
    return data.get('state') if data else None

def pin_to_district(pincode: int):
    data = cache.get(pincode, None)
    return data.get('district') if data else None

def pin_to_taluka(pincode: int):
    data = cache.get(pincode, None)
    return data.get('block') if data else None

