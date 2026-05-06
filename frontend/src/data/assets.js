export const renewableAssets = [
  {
    id: "pavagada",
    name: "Pavagada Solar Park",
    type: "solar",
    district: "Tumakuru",
    capacityMW: 2050,
    lat: 14.0994,
    lon: 77.2800,
    operator: "KSPDCL",
    description: "One of India's largest solar parks with high solar irradiation potential.",
    weatherDrivers: ["cloud_cover", "solar_irradiation", "temperature"],
    generationLogic: { primarySource: "solar", factors: ["solar_irradiation", "cloud_cover", "temperature"] }
  },
  {
    id: "koppal_solar",
    name: "Karnataka I Solar Plant",
    type: "solar",
    district: "Koppal",
    capacityMW: 400,
    lat: 15.3500,
    lon: 76.1667,
    operator: "CleanMax",
    description: "Utility scale solar generation serving industrial corridors.",
    weatherDrivers: ["cloud_cover", "solar_irradiation"],
    generationLogic: { primarySource: "solar", factors: ["solar_irradiation", "cloud_cover"] }
  },
  {
    id: "chitradurga_wind",
    name: "Chitradurga Wind Farm",
    type: "wind",
    district: "Chitradurga",
    capacityMW: 850,
    lat: 14.2274,
    lon: 76.3980,
    operator: "Multiple IPPs",
    description: "High altitude wind corridor leveraging monsoon wind streams.",
    weatherDrivers: ["wind_speed", "temperature"],
    generationLogic: { primarySource: "wind", factors: ["wind_speed"] }
  },
  {
    id: "gadag_wind",
    name: "Gadag Wind Energy Park",
    type: "wind",
    district: "Gadag",
    capacityMW: 600,
    lat: 15.4286,
    lon: 75.6324,
    operator: "Suzlon / ReNew",
    description: "Major wind installation in the northern dry zone.",
    weatherDrivers: ["wind_speed", "temperature"],
    generationLogic: { primarySource: "wind", factors: ["wind_speed"] }
  },
  {
    id: "vijayanagara_hybrid",
    name: "Vijayanagara Renewable Zone",
    type: "hybrid",
    district: "Vijayanagara",
    capacityMW: 1200,
    lat: 15.2750,
    lon: 76.3900,
    operator: "JSW Energy",
    description: "Co-located wind and solar maximizing grid infrastructure utilization.",
    weatherDrivers: ["cloud_cover", "solar_irradiation", "wind_speed", "temperature"],
    generationLogic: { primarySource: "hybrid", factors: ["solar_irradiation", "cloud_cover", "wind_speed", "temperature"] }
  }
];
