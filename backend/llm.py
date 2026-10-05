import sys
sys.stdout.reconfigure(encoding='utf-8')
from transformers import MarianMTModel, MarianTokenizer

# Helsinki-NLP opus-mt-hi-en: Hindi to English translation model
# Lightweight (~300MB), no GPU needed
model_name = "Helsinki-NLP/opus-mt-hi-en"

tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

input_text = "मुझे खेती के बारे में बताओ"

inputs = tokenizer([input_text], return_tensors="pt", padding=True)
translated = model.generate(**inputs)
output = tokenizer.decode(translated[0], skip_special_tokens=True)

print("Input (Hindi):", input_text)
print("Output (English):", output)