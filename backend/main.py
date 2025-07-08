from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from utils.ocr import extract_text_from_pdf
from utils.parser import extract_emission_data
from utils.validator import validate_emission_data
import os
from utils.cert_verifier import is_certified_by_carbon_trust , is_certified_by_green_e,is_certified_by_sbti,is_certified
from utils.certification_extractor import extract_certifications , extract_sourcing_certifications
import fitz
from utils.renewable_parser import extract_renewable_data
from utils.renewable_validator import validate_renewable_data
from utils.waste_parser import extract_waste_data
from utils.waste_validator import validate_waste_data
from utils.cert_verifier import is_certified_by_true , is_certified_by_aws
from utils.water_parser import extract_water_data
from utils.water_validator import validate_water_data
from utils.sourcing_parser import extract_sourcing_data
from utils.sourcing_validator import validate_sourcing_data
from pydantic import BaseModel
from typing import List
from utils.labor_parser import extract_labor_records
from utils.validate_labor_data import summarize_labor_validation
app = FastAPI()


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/submit-emissions-report")
async def submit_emissions_report(
    vendor_name: str = Form(...),
    scope1_claim: float = Form(...),
    scope2_claim: float = Form(...),
    report_file: UploadFile = File(...)
):
    file_location = f"{UPLOAD_FOLDER}/{vendor_name}_{report_file.filename}"
    with open(file_location, "wb") as f:
        f.write(await report_file.read())

    text = extract_text_from_pdf(file_location)
    extracted_data = extract_emission_data(text)
    validation_result = validate_emission_data(scope1_claim, scope2_claim, extracted_data)
    
    #extracting full pdf 
    doc=fitz.open(file_location)
    doctext=""
    for page in doc:
        doctext+=page.get_text()
    
    detected_certs = extract_certifications(doctext)

    
    legit_results={}
    if "Carbon Trust" in detected_certs:
        legit_results["carbon_trust"]=is_certified_by_carbon_trust(vendor_name)
    if "Green-e" in detected_certs:
        legit_results['Green-e']=is_certified_by_green_e(vendor_name)
    if "SBTi" in detected_certs:
        legit_results['SBTi']=is_certified_by_sbti(vendor_name)
    
    return {
        "status": "submitted",
        "vendor": vendor_name,
        "file_saved": file_location,
        "extracted_data": extracted_data,
        "validation": validation_result,
        "certifications_detected":extract_certifications or "None found",
        "certification_verification": legit_results or "Not Applicable" 
    }
    
@app.post("/submit-renewable-report")
async def submit_renewable_report(
    vendor_name: str = Form(...),
    renewable_percent_claim: float = Form(...),
    report_file: UploadFile = File(...)
):
    file_path = f"{UPLOAD_FOLDER}/{vendor_name}_{report_file.filename}"
    with open(file_path, "wb") as f:
        f.write(await report_file.read())

    full_text = extract_text_from_pdf(file_path)

    extracted_data = extract_renewable_data(full_text)
    validation_result = validate_renewable_data(renewable_percent_claim, extracted_data)

    detected_certs = extract_certifications(full_text)
    legit_results = {}
    if "Green-e" in detected_certs:
        legit_results["Green-e"] = is_certified_by_green_e(vendor_name)

    return {
        "status": "submitted",
        "vendor": vendor_name,
        "file_saved": file_path,
        "extracted_data": extracted_data,
        "validation": validation_result,
        "certifications_detected": detected_certs or "None found",
        "certification_verification": legit_results or "Not Applicable"
    }
    
@app.post("/submit-waste-report")
async def submit_waste_report(
    vendor_name: str = Form(...),
    claimed_diversion_rate: float = Form(...),
    report_file: UploadFile = File(...)
):
    file_path = f"{UPLOAD_FOLDER}/{vendor_name}_{report_file.filename}"
    with open(file_path, "wb") as f:
        f.write(await report_file.read())

    full_text = extract_text_from_pdf(file_path)
    extracted_data = extract_waste_data(full_text)
    validation = validate_waste_data(claimed_diversion_rate, extracted_data)

    # Detect certifications
    certs = extract_certifications(full_text)
    legit = {}
    if "TRUE" in certs or "TRUE Zero Waste" in certs:
        legit["TRUE Zero Waste"] = is_certified_by_true(vendor_name)

    return {
        "status": "submitted",
        "vendor": vendor_name,
        "file_saved": file_path,
        "extracted_data": extracted_data,
        "validation": validation,
        "certifications_detected": certs or "None",
        "certification_verification": legit or "Not Applicable"
    }

@app.post("/submit-water-report")
async def submit_water_report(
    vendor_name: str = Form(...),
    claimed_usage_mg: float = Form(...),
    report_file: UploadFile = File(...)
):
    # Save & extract
    file_path = f"{UPLOAD_FOLDER}/{vendor_name}_{report_file.filename}"
    with open(file_path, "wb") as f:
        f.write(await report_file.read())

    text = extract_text_from_pdf(file_path)
    extracted_data = extract_water_data(text)
    validation = validate_water_data(claimed_usage_mg, extracted_data)

    # Check certs
    certs = extract_certifications(text)
    legit = {}
    if "Alliance for Water Stewardship" in certs:
        legit["AWS"] = is_certified_by_aws(vendor_name)

    return {
        "status": "submitted",
        "vendor": vendor_name,
        "extracted_data": extracted_data,
        "validation": validation,
        "certifications_detected": certs,
        "certification_verification": legit or "N/A"
    }


@app.post("/submit-sourcing-report")
async def submit_sourcing_report(
    vendor_name: str = Form(...),
    report_file: UploadFile = File(...)
):
    file_path = f"uploads/{vendor_name}_{report_file.filename}"
    with open(file_path, "wb") as f:
        f.write(await report_file.read())

    text = extract_text_from_pdf(file_path)
    extracted = extract_sourcing_data(text)
    validation = validate_sourcing_data(extracted)

    detected_certs = extract_sourcing_certifications(text)
    cert_verification = {
        cert: is_certified(cert, vendor_name)
        for cert in detected_certs
    }

    return {
        "status": "submitted",
        "vendor": vendor_name,
        "extracted_data": extracted,
        "validation": validation,
        "certifications_detected": detected_certs,
        "certification_verification": cert_verification
    }


class WorkerInput(BaseModel):
    name: str
    job: str
    monthly_wage: int
    id_image_path: str

class LaborSubmission(BaseModel):
    vendor_name: str
    code_of_conduct_signed: bool
    workers: List[WorkerInput]

from utils.labor_parser import extract_labor_records
from utils.validate_labor_data import summarize_labor_validation

@app.post("/submit-labor-report")
def submit_labor_report(payload: LaborSubmission):
    labor_records = extract_labor_records([w.dict() for w in payload.workers])
    summary = summarize_labor_validation(labor_records)

    return {
        "vendor": payload.vendor_name,
        "code_of_conduct_signed": payload.code_of_conduct_signed,
        "labor_audit": labor_records,
        "summary": summary
    }