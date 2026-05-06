RENEWABLE_ASSETS = [
    {
        "id": "pavagada",
        "name": "Pavagada Solar Park",
        "type": "solar",
        "capacityMW": 2050,
        "lat": 14.0994,
        "lon": 77.2800
    },
    {
        "id": "koppal_solar",
        "name": "Karnataka I Solar Plant",
        "type": "solar",
        "capacityMW": 400,
        "lat": 15.3500,
        "lon": 76.1667
    },
    {
        "id": "chitradurga_wind",
        "name": "Chitradurga Wind Farm",
        "type": "wind",
        "capacityMW": 850,
        "lat": 14.2274,
        "lon": 76.3980
    },
    {
        "id": "gadag_wind",
        "name": "Gadag Wind Energy Park",
        "type": "wind",
        "capacityMW": 600,
        "lat": 15.4286,
        "lon": 75.6324
    },
    {
        "id": "vijayanagara_hybrid",
        "name": "Vijayanagara Renewable Zone",
        "type": "hybrid",
        "capacityMW": 1200,
        "lat": 15.2750,
        "lon": 76.3900
    }
]

def get_asset_by_id(asset_id: str):
    for asset in RENEWABLE_ASSETS:
        if asset["id"] == asset_id:
            return asset
    return None
