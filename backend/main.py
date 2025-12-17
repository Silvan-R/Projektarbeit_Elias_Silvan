from typing import Annotated
from fastapi import FastAPI, Query, HTTPException
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# FastAPI-App erstellen
app = FastAPI()


# CORS-Konfiguration (wichtig für Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite / React
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# DATEN LADEN (wird beim Start einmal ausgeführt)
# --------------------------------------------------

# CSV-Datei einlesen
df = pd.read_csv("Gesamtdatensatz.csv")

# Zeitstempel in Datumsformat umwandeln (UTC)
df["timestamp"] = pd.to_datetime(df["timestamp"], utc=True, errors="coerce")

# Zeilen ohne gültigen Zeitstempel entfernen
df = df.dropna(subset=["timestamp"])

# Kinder- und Erwachsenen-Zahlen in numerische Werte umwandeln
df["child_pedestrians_count"] = pd.to_numeric(
    df["child_pedestrians_count"], errors="coerce"
)
df["adult_pedestrians_count"] = pd.to_numeric(
    df["adult_pedestrians_count"], errors="coerce"
)

# Zeilen entfernen, bei denen Kinder- oder Erwachsenenwerte fehlen
df = df.dropna(subset=["child_pedestrians_count", "adult_pedestrians_count"])


# --------------------------------------------------
# META-ENDPOINT: verfügbare Standorte
# --------------------------------------------------

@app.get("/standorte")
def get_standorte():
    """
    Gibt eine Liste aller verfügbaren Standortnamen zurück.
    Wird z.B. für ein Dropdown im Frontend verwendet.
    """
    return sorted(df["location_name"].dropna().unique().tolist())


# --------------------------------------------------
# FOKUSFRAGE: Kinderanteil pro Monat
# --------------------------------------------------

@app.get("/fokusfrage")
def fokusfrage(
    location: Annotated[
        str,
        Query(title="Standort", example="Bahnhofstrasse (Mitte)")
    ],
    start_date: Annotated[
        str,
        Query(title="Startdatum", example="2022-01-01")
    ],
    end_date: Annotated[
        str,
        Query(title="Enddatum", example="2022-12-31")
    ],
):
    """
    Berechnet für jeden Monat den Kinderanteil in Prozent
    für einen bestimmten Standort und Zeitraum.
    """

    # Start- und Enddatum in Datumsformat umwandeln
    start = pd.to_datetime(start_date, utc=True)
    end = pd.to_datetime(end_date, utc=True)

    # Datensatz nach Standort und Zeitraum filtern
    subset = df[
        (df["location_name"] == location)
        & (df["timestamp"] >= start)
        & (df["timestamp"] <= end)
    ]

    # Falls keine Daten gefunden wurden → Fehler zurückgeben
    if subset.empty:
        raise HTTPException(
            status_code=404,
            detail="Keine Daten für diese Auswahl gefunden"
        )

    # Monat aus dem Zeitstempel extrahieren (1–12)
    subset["month"] = subset["timestamp"].dt.month

    # Daten pro Monat zusammenfassen (Summen)
    grouped = subset.groupby("month").agg(
        children=("child_pedestrians_count", "sum"),
        adults=("adult_pedestrians_count", "sum"),
    )

    results = []

    # Für jeden Monat den Kinderanteil berechnen
    for month, row in grouped.iterrows():
        total = row["children"] + row["adults"]

        # Schutz vor Division durch 0
        if total == 0:
            continue

        kinder_anteil = (row["children"] / total) * 100

        results.append(
            {
                "month": int(month),                     # Monat (1–12)
                "kinderanteil_prozent": round(kinder_anteil, 2),  # Anteil in %
                "children": int(row["children"]),        # Kinder absolut
                "adults": int(row["adults"]),            # Erwachsene absolut
            }
        )

    # Monat mit dem höchsten Kinderanteil bestimmen
    max_month = max(results, key=lambda x: x["kinderanteil_prozent"])

    # Resultat zurückgeben
    return {
        "Werte": results,   # Daten für Balkendiagramm
        "max": max_month,    # Monat mit höchstem Anteil
    }


