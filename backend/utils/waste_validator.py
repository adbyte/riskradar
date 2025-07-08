def validate_waste_data(claimed_diversion: float, extracted: dict) -> dict:
    result = {
        "diversion_match": False,
        "recycled_data_detected": False,
        "total_waste_detected": False
    }

    if extracted.get("waste_diversion_rate") is not None:
        diff = abs(claimed_diversion - extracted["waste_diversion_rate"])
        result["diversion_match"] = diff <= 10  # ±10% tolerance

    if extracted.get("recycled_materials"):
        result["recycled_data_detected"] = True

    if extracted.get("total_waste_tons") is not None:
        result["total_waste_detected"] = True

    return result
