import re

# Define a list of common sustainability certifications and standards
KNOWN_CERTIFICATIONS = [
    "Carbon Trust",
    "ISO 14064",
    "CDP",
    "Science Based Targets",
    "SBTi",
    "Green-e",
    "SGS",
    "Bureau Veritas",
    "LEED",
    "RE100",
    "GHG Protocol",
    "Gold Standard",
    "TRUE Zero Waste"  # ✅ Add this for waste management
]
SOURCING_CERTIFICATIONS={
    "FSC": ["fsc", "forest stewardship council"],
    "Fairtrade": ["fairtrade", "fair trade"],
    "Organic": ["certified organic", "organic certificate"],
    "Rainforest Alliance": ["rainforest alliance", "rainforest certified"],
    "GOTS": ["gots", "global organic textile standard"]
}
def extract_certifications(text: str):
    found = []
    lower_text = text.lower()

    for cert in KNOWN_CERTIFICATIONS:
        if cert.lower() in lower_text:
            found.append(cert)

    # Add fuzzy/flexible match for TRUE Zero Waste (hyphens, spacing, etc.)
    if re.search(r'true[-\s]?zero[-\s]?waste', lower_text) and "TRUE Zero Waste" not in found:
        found.append("TRUE Zero Waste")

    # Optional: unify SBTi + Science Based Targets
    if "sbti" in lower_text or "science based targets" in lower_text:
        if "SBTi" not in found:
            found.append("SBTi")

    return list(set(found))  # Remove duplicates if any

def extract_sourcing_certifications(text:str) -> list:
    found=set()
    lower_text=text.lower()
    for cert_names ,aliases in SOURCING_CERTIFICATIONS.items():
        for alias in aliases:
            if alias in lower_text:
                found.add(cert_names)
                
                
    return list(found)
