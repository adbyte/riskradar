# utils/renewable_validator.py

def validate_renewable_data(claimed_percent: float, extracted: dict) -> dict:
    validation = {
        "percent_match": False,
        "rec_detected": False,
        "solar_detected": False,
        "green_tariff_detected": False,
    }

    if extracted.get("percent_renewable") is not None:
        diff = abs(claimed_percent - extracted["percent_renewable"])
        validation["percent_match"] = diff <= 10  # Allow ±10% tolerance

    if extracted.get("rec_provider"):
        validation["rec_detected"] = True

    if extracted.get("solar_capacity_mwh"):
        validation["solar_detected"] = True

    if extracted.get("tariff_type") == "Green Tariff":
        validation["green_tariff_detected"] = True

    return validation
