from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# timestamp → datetime umwandeln
ts = pd.to_datetime(df["timestamp"], errors="coerce")

# Zeitzone entfernen, falls vorhanden
try:
    ts = ts.dt.tz_convert(None)
except TypeError:
    pass

df["timestamp"] = ts


@app.get("/")
def get_backend_lauft():
    return {"message": "backend lauft!!!"}


@app.get("/df")
def get_dataframe():
    return {"timestamp": str(df.loc[1, "timestamp"])}


@app.get("/fokusfrage")
def daten(start: str | None = None, end: str | None = None):
    data = df.copy()

    # --- Startdatum filtern ---
    if start is not None:
        start_dt = pd.to_datetime(start)
        data = data[data["timestamp"] >= start_dt]

    # --- Enddatum filtern ---
    if end is not None:
        end_dt = pd.to_datetime(end)
        data = data[data["timestamp"] <= end_dt]

    ergebnis = []
    for _, row in data.iterrows():
        ergebnis.append(
            {
                "timestamp": row["timestamp"].strftime("%Y-%m-%d %H:%M:%S"),
                "location_id": int(row["location_id"]),
                "location_name": row["location_name"],
                "pedestrians_count": int(row["pedestrians_count"]),
                "child_pedestrians_count": int(row["child_pedestrians_count"]),
            }
        )

    return {"results": ergebnis}
   


