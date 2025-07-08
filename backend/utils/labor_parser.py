# utils/labor_parser.py

from utils.extract_age_from_id import extract_age_from_id
from utils.fair_wage_checker import is_wage_fair

def extract_labor_records(labor_data: list) -> list:
    results = []

    for worker in labor_data:
        name = worker["name"]
        job = worker["job"]
        wage = worker["monthly_wage"]
        id_image_path = worker["id_image_path"]

        # Extract age from ID using OCR
        age = extract_age_from_id(id_image_path)

        record = {
            "name": name,
            "job": job,
            "monthly_wage": wage,
            "age": age,
            "underage": age < 18 if age != -1 else None,
            "wage_fair": is_wage_fair(job, wage)
        }
        results.append(record)

    return results
