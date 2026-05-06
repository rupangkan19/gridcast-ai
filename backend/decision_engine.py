def simulate_decision(forecast, backup_pct: float, renewable_pct: float, load_adj: float):
    """
    Decision Engine
    Inputs:
    - backup_pct: 0-100% backup generation used
    - renewable_pct: 0-100% renewable dependency
    - load_adj: Load adjustment (-100 to 100 MW)
    """
    
    # Calculate grid health based on P10 (worst case) to be safe
    total_p10 = forecast["total"]["p10"]
    total_p50 = forecast["total"]["p50"]
    
    # Assume base demand of 150MW
    demand = 150 + load_adj
    
    # Effective supply
    effective_renewable = total_p10 * (renewable_pct / 100.0)
    backup_supply = 100 * (backup_pct / 100.0) # Assume max backup is 100MW
    
    total_supply = effective_renewable + backup_supply
    
    shortfall = demand - total_supply
    
    # Calculate Health Score (0-100)
    if shortfall <= 0:
        health_score = 100 - (abs(shortfall) / demand) * 20 # minor penalty for oversupply
        health_score = min(100, health_score)
        stability = "High"
    elif shortfall < 20:
        health_score = 70 - shortfall
        stability = "Medium"
    else:
        health_score = max(0, 50 - shortfall)
        stability = "Low"
        
    recommendations = []
    if health_score < 50:
        recommendations.append("Critical: Increase backup generation immediately.")
    elif health_score < 80:
        if backup_pct < 50:
            recommendations.append("Consider increasing backup generation to cover potential P10 shortfalls.")
        else:
            recommendations.append("Reduce load to improve grid stability.")
    else:
        recommendations.append("Grid is stable under current parameters.")
        
    return {
        "health_score": round(health_score, 1),
        "stability": stability,
        "recommendation": recommendations[0] if recommendations else "Maintain current operations."
    }
