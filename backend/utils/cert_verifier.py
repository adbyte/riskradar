import requests
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz

# ---------------------
# Check if vendor is listed in Carbon Trust website
# ---------------------
def is_certified_by_carbon_trust(vendor_name: str) -> dict:
    url = "https://www.carbontrust.com/our-clients"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return {"status": "error", "reason": "Carbon Trust page unreachable"}

        soup = BeautifulSoup(response.content, "html.parser")

        # Extract all listed client names
        listed_clients = [tag.text.strip() for tag in soup.select("div.field__item > p") if tag.text.strip()]

        # Fuzzy match
        for client in listed_clients:
            similarity = fuzz.token_set_ratio(vendor_name.lower(), client.lower())
            if similarity >= 85:
                return {
                    "verified": True,
                    "match": client,
                    "similarity": similarity
                }

        return {
            "verified": False,
            "reason": "Vendor not found in Carbon Trust public list"
        }

    except Exception as e:
        return {"status": "error", "reason": str(e)}


def is_certified_by_green_e(vendor_name: str) -> dict:
    url = "https://www.green-e.org/certified-resources"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return {"status": "error", "reason": "Green e page unreachable"}

        soup = BeautifulSoup(response.content, "html.parser")

        # Extract all listed client names
        listed_clients = [tag.text.strip() for tag in soup.select("table tbody tr td a") if tag.text.strip()]

        # Fuzzy match
        for client in listed_clients:
            similarity = fuzz.token_set_ratio(vendor_name.lower(), client.lower())
            if similarity >= 85:
                return {
                    "verified": True,
                    "match": client,
                    "similarity": similarity
                }

        return {
            "verified": False,
            "reason": "Vendor not found in Green-e public list"
        }

    except Exception as e:
        return {"status": "error", "reason": str(e)}
    
def is_certified_by_sbti(vendor_name: str) -> dict:
    url = "https://sciencebasedtargets.org/api/v1/companies?&limit=5000"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return {"status": "error", "reason": "SBTi API unreachable"}

        companies = response.json().get("results", [])

        for company in companies:
            name = company.get("company_name", "").strip()
            similarity = fuzz.token_set_ratio(vendor_name.lower(), name.lower())
            if similarity >= 85:
                return {
                    "verified": True,
                    "match": name,
                    "similarity": similarity,
                    "status": company.get("target_status", "Unknown"),
                    "country": company.get("country", "N/A")
                }

        return {
            "verified": False,
            "reason": "Vendor not found in SBTi company list"
        }

    except Exception as e:
        return {"status": "error", "reason": str(e)}


def is_certified_by_true(vendor_name: str) -> dict:
    # Dummy lookup list or fuzzy match if you manually scrape their website
    known_certified = ["Google", "Patagonia", "Unilever", "Whole Foods"]

    for known in known_certified:
        similarity = fuzz.token_set_ratio(vendor_name.lower(), known.lower())
        if similarity >= 85:
            return {
                "verified": True,
                "match": known,
                "similarity": similarity
            }

    return {
        "verified": False,
        "reason": "Vendor not listed in TRUE Zero Waste registry"
    }
def is_certified_by_aws(vendor_name: str) -> dict:
    known_aws_certified = ["Nestlé", "Unilever", "Coca-Cola", "PepsiCo"]

    for org in known_aws_certified:
        similarity = fuzz.token_set_ratio(vendor_name.lower(), org.lower())
        if similarity >= 85:
            return {
                "verified": True,
                "match": org,
                "similarity": similarity
            }

    return {
        "verified": False,
        "reason": "Vendor not found in AWS registry"
    }

MOCK_CERTIFIED_VENDORS = {
    "FSC": ["Patagonia", "EcoGrow Inc.", "Nestlé"],
    "Fairtrade": ["Unilever", "EcoGrow Inc."],
    "Rainforest Alliance": ["Starbucks", "EcoGrow Inc."],
    "GOTS": ["Organic Threads Co.", "EcoGrow Inc."],
    "Organic": ["Organic Valley", "EcoGrow Inc."],
    "Alliance for Water Stewardship": ["AquaPure Solutions Ltd."]
}
def is_certified(cert_name: str, vendor_name: str) -> dict:
    cert_name = cert_name.strip()
    vendor_name = vendor_name.strip()

    # Route to dedicated verification function if exists
    if cert_name == "Green-e":
        return is_certified_by_green_e(vendor_name)
    elif cert_name == "Carbon Trust":
        return is_certified_by_carbon_trust(vendor_name)
    elif cert_name in ["SBTi", "Science Based Targets"]:
        return is_certified_by_sbti(vendor_name)
    elif cert_name == "Alliance for Water Stewardship":
        return {
            "verified": vendor_name in MOCK_CERTIFIED_VENDORS.get(cert_name, []),
            "match": vendor_name,
            "source": "Simulated AWS Registry"
        }

    # Default fallback to static list + fuzzy match
    approved_vendors = MOCK_CERTIFIED_VENDORS.get(cert_name, [])
    for approved in approved_vendors:
        similarity = fuzz.token_set_ratio(vendor_name.lower(), approved.lower())
        if similarity >= 85:
            return {
                "verified": True,
                "match": approved,
                "similarity": similarity
            }

    return {
        "verified": False,
        "reason": f"No match found for {vendor_name} under {cert_name}"
    }