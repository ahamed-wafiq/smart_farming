import sys
import os
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"
os.environ["TF_USE_LEGACY_KERAS"] = "1"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Configure UTF-8 for Windows terminal
sys.stdout.reconfigure(encoding='utf-8')

import tensorflow as tf
from tensorflow.keras.preprocessing import image #ignore this line
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import traceback
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Gemini
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
model = None
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
    print("Gemini API initialized successfully.")
else:
    print("WARNING: Gemini API Key not found or still placeholder in .env")

# Load Crop Recommendation Model
try:
    crop_model = joblib.load("rf_model.pkl")
    le = joblib.load("label_encoder.pkl")
    print("Crop models loaded successfully.")
except Exception as e:
    print(f"Error loading crop models: {e}")

crop_water_need = {
    'rice': 'high', 'sugarcane': 'high', 'banana': 'high', 'coconut': 'high',
    'maize': 'medium', 'wheat': 'medium', 'cotton': 'medium', 'coffee': 'medium',
    'chickpea': 'low', 'lentil': 'low', 'mungbean': 'low', 'blackgram': 'low', 'pigeonpeas': 'low'
}

def irrigation_advice(crop, rainfall, humidity):
    water_need = crop_water_need.get(crop, 'medium')
    if rainfall > 200: return "No irrigation needed — sufficient rainfall"
    if water_need == 'high':
        return "High irrigation required" if rainfall < 100 else "Moderate irrigation needed"
    elif water_need == 'medium':
        return "Irrigation recommended" if rainfall < 80 else "No immediate irrigation needed"
    else:
        return "Light irrigation sufficient" if humidity < 80 else "No irrigation needed"

# Load Disease Detection Model
try:
    disease_model = tf.keras.models.load_model("models/", compile=False)
    print("Disease model loaded successfully.")
except Exception as e:
    print(f"Error loading disease model: {e}")

class_names = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper_bell___Bacterial_spot", "Pepper_bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

@app.route("/predict", methods=["POST"])
def predict_crop():
    try:
        data = request.json
        sample = pd.DataFrame([data])
        proba = crop_model.predict_proba(sample)[0]
        top8_indices = np.argsort(proba)[::-1][:8]
        top_crops = le.inverse_transform(top8_indices)
        top_scores = (proba[top8_indices] * 100).round(1)

        results = []
        for crop, score in zip(top_crops, top_scores):
            decision = irrigation_advice(crop, data["rainfall"], data["humidity"])
            results.append({
                "crop": str(crop),
                "score": float(score),
                "irrigation": str(decision)
            })

        return jsonify({
            "crop": results[0]["crop"],
            "irrigation": results[0]["irrigation"],
            "predictions": results
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/predict_disease", methods=["POST"])
def predict_disease():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['file']
        img_bytes = file.read()
        
        print(f"Received file: {file.filename}, size: {len(img_bytes)} bytes")
        
        from PIL import Image
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))
        
        img_array = image.img_to_array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = disease_model.predict(img_array)
        
        top3_indices = np.argsort(predictions[0])[::-1][:3]
        top3 = [
            {"disease": class_names[i], "confidence": float(predictions[0][i]) * 100}
            for i in top3_indices
        ]
        
        predicted_index = top3_indices[0]
        confidence = float(predictions[0][predicted_index]) * 100
        
        return jsonify({
            "disease": class_names[predicted_index],
            "confidence": confidence,
            "index": int(predicted_index),
            "top3": top3
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/translate", methods=["POST"])
def translate_hindi():
    try:
        data = request.json
        text = data.get("text", "")
        if not GEMINI_KEY: return jsonify({"error": "Gemini API key not configured"}), 500

        prompt = f"Translate the following Hindi text to English. If it is already in English, return it as is. Text: {text}"
        response = model.generate_content(prompt)
        
        return jsonify({
            "original": text,
            "translated": response.text.strip()
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/ask", methods=["POST"])
def ask_assistant():
    try:
        data = request.json
        original_text = data.get("text", "")
        if not GEMINI_KEY: return jsonify({"error": "Gemini API key not configured"}), 500

        # System prompt for Gemini
        prompt = (
            "You are AgriVision, a professional agricultural AI assistant. "
            "The user might speak in Hindi or English. "
            "First, translate the user's query internally if it is in Hindi. "
            "Then, provide an accurate, helpful, and concise answer about farming, weather, or crops. "
            "If the user query is in Hindi, provide the answer in BOTH English and Hindi. "
            "If in English, just answer in English. "
            "User Query: " + original_text
        )

        response = model.generate_content(prompt)
        full_response = response.text.strip()

        # Simple heuristic to extract the translation if Gemini provides it
        # Actually, let's just return the full response as the answer
        return jsonify({
            "answer": full_response,
            "translation": None, # Gemini handles this internally now
            "is_hindi": False # Irrelevant now as Gemini handles multilingual
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("ML_API_PORT", "5005"))
    app.run(host="0.0.0.0", port=port, debug=False)