def validate_emission_data(claim_scope1, claim_scope2, extracted):
    result = {"scope1_match": False, "scope2_match": False}

    if extracted["scope1"] and abs(extracted["scope1"] - claim_scope1) < 100:
        result["scope1_match"] = True
    if extracted["scope2"] and abs(extracted["scope2"] - claim_scope2) < 100:
        result["scope2_match"] = True

    return result
