# utils/fair_wage_checker.py

MIN_WAGE_DATA = {
    "sewing operator": 8500,
    "helper": 6000,
    "packer": 7000,
    "loader": 7200
}

def is_wage_fair(job_title: str, claimed_wage: int) -> bool | None:
    min_wage = MIN_WAGE_DATA.get(job_title.lower())
    if min_wage is None:
        return None
    return claimed_wage >= min_wage
