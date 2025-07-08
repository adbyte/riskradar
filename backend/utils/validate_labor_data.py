# utils/validate_labor_data.py

def summarize_labor_validation(records: list) -> dict:
    total = len(records)
    underage = sum(1 for r in records if r["underage"])
    unfair_wages = sum(1 for r in records if r["wage_fair"] is False)

    return {
        "total_workers": total,
        "underage_workers": underage,
        "unfair_wages": unfair_wages,
        "all_fair": underage == 0 and unfair_wages == 0
    }
