
def pin_to_address(pincode:int):
    data = cache.get(pincode, None)
    return data

def pin_to_state(pincode:int):
    
    data = cache.get(pincode, None)
    return data['state'] if data else None 

def pin_to_district(pincode:int):
    
    data = cache.get(pincode, None)
    return data['district'] if data else None

def pin_to_taluka(pincode:int):
    
    data = cache.get(pincode, None)
    return data['block'] if data else None



