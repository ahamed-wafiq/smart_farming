import joblib
import pandas as pd
import json

# Load model
model = joblib.load('rf_model.pkl')

# Load features + label mapping
with open('features_data.json') as f:
    data = json.load(f)

columns = data['columns']
label_dict = data['label_dict']

# Reverse mapping (number → crop)
reverse_dict = {v: k for k, v in label_dict.items()}

# Sample input (replace with user input later)
sample = pd.DataFrame([{
    'N': 90,
    'P': 42,
    'K': 43,
    'temperature': 20.5,
    'humidity': 80,
    'ph': 6.5,
    'rainfall': 200
}])

# Ensure column order matches training
sample = sample[columns]

# Predict
prediction = model.predict(sample)

# Decode result
crop = reverse_dict[prediction[0]]

print("Recommended Crop:", crop)