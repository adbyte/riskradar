def validate_sourcing_data(extracted: dict) -> dict:
    return {
        "certifications_present": bool(extracted.get("certifications")),
        "chain_of_custody_present": extracted.get("chain_of_custody", False)
    }
