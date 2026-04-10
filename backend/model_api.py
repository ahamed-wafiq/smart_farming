crop_water_need = {
    'rice': 'high',
    'sugarcane': 'high',
    'banana': 'high',
    'coconut': 'high',

    'maize': 'medium',
    'wheat': 'medium',
    'cotton': 'medium',
    'coffee': 'medium',

    'chickpea': 'low',
    'lentil': 'low',
    'mungbean': 'low',
    'blackgram': 'low',
    'pigeonpeas': 'low'
}
import joblib
from flask import Flask, request, jsonify

import pandas as pd

app = Flask(__name__)

# Load model
model = joblib.load("model.pkl")
le = joblib.load("label_encoder.pkl")


def irrigation_advice(crop, rainfall, humidity):
    water_need = crop_water_need.get(crop, 'medium')

    if rainfall > 200:
        return "No irrigation needed — sufficient rainfall"

    if water_need == 'high':
        return "High irrigation required" if rainfall < 100 else "Moderate irrigation needed"

    elif water_need == 'medium':
        return "Irrigation recommended" if rainfall < 80 else "No immediate irrigation needed"

    else:
        return "Light irrigation sufficient" if humidity < 80 else "No irrigation needed"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    sample = pd.DataFrame([data])

    pred = model.predict(sample)
    crop = le.inverse_transform(pred)[0]

    decision = irrigation_advice(
        crop,
        data["rainfall"],
        data["humidity"]
    )

    return jsonify({
        "crop": crop,
        "irrigation": decision
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)