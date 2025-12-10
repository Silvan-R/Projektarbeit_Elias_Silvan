from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# CSV laden
df = pd.read_csv("Gesamtdatensatz.csv")

@app.get("/")
def get_backend_lauft():
    return {"message": "backend lauft!!!"}


@app.get("/df")
def get_dataframe():
    return {"timestamp": str(df.loc[1, "timestamp"])}


