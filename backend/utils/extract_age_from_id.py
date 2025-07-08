# extract_age_from_id.py
import re
import pytesseract
print(pytesseract.get_tesseract_version())
from PIL import Image

def extract_age_from_id(image_path: str) -> int:
    text = pytesseract.image_to_string(Image.open(image_path))

    # Look for date patterns: 1990, DOB: 12/02/2005, etc.
    dob_match = re.search(r'(\d{2}[/-]\d{2}[/-]\d{4})', text)
    if dob_match:
        from datetime import datetime
        dob_str = dob_match.group(1).replace('/', '-')
        dob = datetime.strptime(dob_str, "%d-%m-%Y")
        age = (datetime.now() - dob).days // 365
        return age
    return -1  # Could not determine age
