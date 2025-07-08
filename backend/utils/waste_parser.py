import re

def extract_waste_data(text: str) -> dict:
    data = {
        "waste_diversion_rate": None,
        "total_waste_tons": None,
        "recycled_materials": {}
    }

    # Waste diversion rate e.g., 82% diversion
    diversion_match = re.search(
    r'(\d{1,3})\s*%[^.\n]{0,50}?(diversion rate|waste diversion)',
    text,
    re.IGNORECASE
)
    if not diversion_match:
        diversion_match=re.search(
            r'(diversion rate|waste diversion)[^.\n]{0,50}?(\d{1,3})\s*%',
            text,
            re.IGNORECASE
        )
    if diversion_match:
        data["waste_diversion_rate"] = float(diversion_match.group(2))

    # Total waste in tons
    total_waste_match = re.search(r'total waste.*?(\d{1,4}\.?\d*)\s*(tons|tonnes)', text, re.IGNORECASE)
    if not total_waste_match:
        total_waste_match = re.search(
        r'(\d{1,4}\.?\d*)\s*(tons|tonnes).*?total waste',
        text,
        re.IGNORECASE
    )

    if total_waste_match:
        data["total_waste_tons"] = float(total_waste_match.group(1))

    # Material-specific recycling (e.g., 15 tons plastic)
    materials = ['plastic', 'paper', 'metal', 'glass', 'cardboard', 'organic']
    for material in materials:
        match = re.search(r'(\d{1,4}\.?\d*)\s*(tons|tonnes)\s+of\s+' + material, text, re.IGNORECASE)
        if match:
            data["recycled_materials"][material] = float(match.group(1))

    return data
