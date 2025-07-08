def validate_water_data(claimed_usage_mg: float, extracted: dict) -> dict:
    result = {
        "usage_match": False,
        "reduction_detected": False,
        "wastewater_treated": extracted.get("wastewater_treated", False)
    }

    if extracted.get("total_water_usage_mg") is not None:
        diff = abs(claimed_usage_mg - extracted["total_water_usage_mg"])
        result["usage_match"] = diff <= 0.5  # allow ±0.5 MG tolerance

    if extracted.get("percent_reduction") is not None:
        result["reduction_detected"] = True

    return result
