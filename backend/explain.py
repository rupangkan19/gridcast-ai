def generate_explanations(forecasts):
    """
    Generate human-readable explanations and detect critical moments.
    """
    explanations = []
    critical_moments = []
    
    for i, f in enumerate(forecasts):
        hour = f["hour"]
        risk = f["risk"]
        w = f["weather"]
        
        reasons = []
        if risk == "High":
            if w["cloud_cover"] > 0.6:
                reasons.append("High cloud cover causing solar uncertainty.")
            if w["wind_speed"] > 10 and w["wind_speed"] < 15:
                reasons.append("Wind variability in high-production zone.")
            if not reasons:
                reasons.append("Combined weather variability.")
        elif risk == "Medium":
            reasons.append("Moderate generation spread expected.")
        else:
            reasons.append("Stable weather patterns.")
            
        explanations.append({
            "hour": hour,
            "story": " ".join(reasons)
        })
        
        # Detect critical moments (e.g. sudden drop)
        if i > 0:
            prev_f = forecasts[i-1]
            drop = prev_f["total"]["p50"] - f["total"]["p50"]
            if drop > 30: # arbitrary threshold
                critical_moments.append({
                    "hour": hour,
                    "type": "Sudden Drop",
                    "description": f"Expected drop of {round(drop, 1)} MW in generation."
                })
                
    return explanations, critical_moments
