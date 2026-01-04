import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

API_KEY = os.getenv("GEMINI_API_KEY") or "YOUR_API_KEY_HERE"

app = Flask(__name__)
CORS(app)

genai.configure(api_key=API_KEY)

@app.get("/")
def home():
    return {"status": "ok", "service": "GeoPulse"}

@app.get("/api/events")
def events():
    return [
        {
            "id": 1,
            "title": "Middle East Tensions Escalate",
            "description": "Increased military activity in Gulf region",
            "severity": "high",
            "date": "2026-01-03",
            "regions": ["Middle East", "Global"],
        },
        {
            "id": 2,
            "title": "Ukraine-Russia Conflict Updates",
            "description": "Ongoing military operations in Eastern Europe",
            "severity": "high",
            "date": "2026-01-02",
            "regions": ["Eastern Europe", "Russia"],
        },
    ]

@app.post("/api/analyze")
def analyze():
    body = request.json or {}
    event = body.get("event", "")
    location = body.get("location", "India")
    if not event:
        return {"error": "event is required"}, 400

    prompt = f"""
You are a geopolitical analyst.

Event: "{event}"
Location: {location}

Return ONLY JSON like:
{{
  "energy": {{"severity": 1, "timeframe": "immediate", "example": "...", "impact_description": "..."}},
  "food": {{...}},
  "travel": {{...}},
  "jobs": {{...}},
  "currency": {{...}}
}}
"""

    model = genai.GenerativeModel("gemini-2.0-flash")
    resp = model.generate_content(prompt)
    text = resp.text.strip()

    if text.startswith("```json"):
        text = text[7:]
    if text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]

    impacts = json.loads(text)
    overall = sum(v.get("severity", 0) for v in impacts.values()) / max(len(impacts), 1)

    return {
        "event": event,
        "location": location,
        "impacts": impacts,
        "overall_severity": overall,
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
