"""
Backend Verification API (FastAPI)
Validates Boolean classification logic via REST endpoints.
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Digital Logic Network Alert Classifier API",
    description="Backend verification engine for EC2201 Mini Project",
    version="1.0.0"
)

class TrafficVector(BaseModel):
    A: int # High Volumetry
    B: int # Auth Failures
    C: int # Port Scan
    D: int # Bad Payload

@app.post("/api/classify")
def classify_traffic(vector: TrafficVector):
    A, B, C, D = vector.A, vector.B, vector.C, vector.D
    
    # Minimized Boolean SOP Logic
    F_crit = bool((B and C) or (C and D) or (A and B and D))
    F_norm = not bool(A or B or C or D)
    F_susp = not F_crit and not F_norm

    if F_crit:
        status = "CRITICAL"
    elif F_susp:
        status = "SUSPICIOUS"
    else:
        status = "NORMAL"

    return {
        "inputs": {"A": A, "B": B, "C": C, "D": D},
        "outputs": {
            "F_crit": int(F_crit),
            "F_susp": int(F_susp),
            "F_norm": int(F_norm)
        },
        "classification": status
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
