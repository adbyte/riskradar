import re

def extract_water_data(text: str) -> dict:
    data = {
        "total_water_usage_mg": None,  # million gallons
        "percent_reduction": None,
        "wastewater_treated": False
    }

    # Match total water usage (e.g. 2.1 million gallons)
    usage_match = re.search(
    r'consumed\s+(approximately\s+)?(\d{1,4}\.?\d*)\s*(million)?\s*(gallons|liters)',
    text,
    re.IGNORECASE
)   
    if not usage_match:
        usage_match=re.search(r'(\d{1,4}\.?\d*)\s*(million)?\s*(gallons|liters).*?(water|consumed)'
,text,re.IGNORECASE)
    if usage_match:
        amount = float(usage_match.group(1))
        if usage_match.group(3):  # "million" mentioned
            data["total_water_usage_mg"] = amount
        else:
            data["total_water_usage_mg"] = round(amount / 1_000_000, 3)  # convert to million gallons

    # Match % reduction
    reduction_match = re.search(r'reduced water (usage|consumption) by (\d{1,3})\s*%', text, re.IGNORECASE)
    if reduction_match:
        data["percent_reduction"] = int(reduction_match.group(2))

    # Wastewater treatment claim
    if re.search(r'(wastewater|effluent).*?(treated|reused|recycled)', text, re.IGNORECASE):
        data["wastewater_treated"] = True

    return data
