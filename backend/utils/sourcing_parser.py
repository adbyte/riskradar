import re

def extract_sourcing_data(text: str) -> dict:
    data = {
        "certifications": [],
        "chain_of_custody": False
    }

    # Detect chain of custody keywords
    if re.search(r'chain[-\s]?of[-\s]?custody', text, re.IGNORECASE):
        data["chain_of_custody"] = True

    # Simple keyword-based cert detection (can be improved later)
    cert_keywords = ["fsc", "fairtrade", "organic", "gots", "rainforest alliance"]
    found = []

    for keyword in cert_keywords:
        if re.search(re.escape(keyword), text.lower()):
            found.append(keyword.upper() if keyword != "organic" else "Organic")

    data["certifications"] = found

    return data
