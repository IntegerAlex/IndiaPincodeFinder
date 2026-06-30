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

SEARCH_FIELDS = ("district", "block", "officename")


def _matches_search_query(data: dict, query: str) -> bool:
    for field in SEARCH_FIELDS:
        value = (data.get(field) or "").lower()
        if query in value:
            return True
    return False


def search_pincodes(name: str) -> list[dict]:
    """
    Search district, block, and officename fields for a case-insensitive substring match.
    Returns matching address objects with pincode included, sorted ascending by pincode.
    """
    query = name.strip().lower()
    if not query:
        return []

    results = []
    for pincode, data in cache.items():
        if _matches_search_query(data, query):
            results.append({"pincode": pincode, **data})

    return sorted(results, key=lambda item: item["pincode"])

