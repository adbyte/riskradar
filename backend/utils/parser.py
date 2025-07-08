import re

def extract_emission_data(text):
    # Basic extraction using regex
    scope1 = re.search(r"Scope\s*1.*?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(tons|tCO2e)", text, re.IGNORECASE)
    scope2 = re.search(r"Scope\s*2.*?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(tons|tCO2e)", text, re.IGNORECASE)

    return {
        "scope1": float(scope1.group(1).replace(",", "")) if scope1 else None,
        "scope2": float(scope2.group(1).replace(",", "")) if scope2 else None,
    }
