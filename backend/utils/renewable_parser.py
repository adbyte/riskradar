# utils/renewable_parser.py

import re

def extract_renewable_data(text: str) -> dict:
    data = {
        "percent_renewable": None,
        "rec_provider": None,
        "solar_capacity_mwh": None,
        "tariff_type": None,
        "utility_name": None,
    }

    # Match % renewable energy
    percent_match = re.search(
        r'(\d{1,3})\s*%[^.\n]{0,50}(renewable|renewables|renewable energy|energy usage|total energy)', text, re.IGNORECASE)
    if percent_match:
        data["percent_renewable"] = float(percent_match.group(1))

    # Match RECs
    if "REC" in text.upper() or "Renewable Energy Certificate" in text:
        rec_provider_match = re.search(r'certified by ([A-Za-z\- ]+)', text, re.IGNORECASE)
        if rec_provider_match:
            data["rec_provider"] = rec_provider_match.group(1).strip()

    # Match solar generation (e.g., 210 MWh)
    solar_match = re.search(r'generated\s+(\d{2,5})\s*(MWh|megawatt[-\s]?hours)', text, re.IGNORECASE)
    if not solar_match:
        solar_match = re.search(r'solar.*?(\d{2,5})\s*(MWh|megawatt[-\s]?hours)', text, re.IGNORECASE)

    if solar_match:
        data["solar_capacity_mwh"] = float(solar_match.group(1))

    # Match green tariff claim
    tariff_match = re.search(r'green tariff from ([A-Za-z&.\s]+)', text, re.IGNORECASE)
    if tariff_match:
        data["tariff_type"] = "Green Tariff"
        data["utility_name"] = tariff_match.group(1).strip()

    return data
