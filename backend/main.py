from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# CORS aktivieren – sonst blockiert der Browser alles!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # oder ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_json("Teildatensatz.json")

@app.get("/data")
def get_data():
    return df.head(5).to_dict(orient="records")


