from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS aktivieren – sonst blockiert der Browser alles!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # oder ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_hello_world():
    return {"message": "Hallo Welt test"}


