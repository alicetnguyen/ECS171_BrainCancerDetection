# python_backend/model.py

import numpy as np
import cv2
from PIL import Image
from tensorflow.keras.models import load_model as _load_model
import joblib

# Load your Keras model once
def load_model():
    return _load_model('brain_tumor_model.h5')

# Load the scaler once
scaler = joblib.load('scaler.pkl')

def predict_image(model, pil_img: Image.Image) -> str:
    # --- 1) Image branch preprocessing ---
    img = pil_img.resize((128, 128))
    arr_img = np.array(img, dtype=np.float32) / 255.0
    arr_img = np.expand_dims(arr_img, axis=0)  # (1,128,128,3)

    # --- 2) Handcrafted features extraction ---
    gray = cv2.cvtColor((arr_img[0]*255).astype(np.uint8), cv2.COLOR_RGB2GRAY)
    equalized = cv2.equalizeHist(gray)
    edges = cv2.Canny(equalized, 100, 200)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    largest_area = max((cv2.contourArea(c) for c in contours), default=0)
    mean_intensity = float(np.mean(equalized))

    cx = cy = 0.0
    if contours:
        M = cv2.moments(max(contours, key=cv2.contourArea))
        if M["m00"] != 0:
            cx = M["m10"] / M["m00"] / gray.shape[1]
            cy = M["m01"] / M["m00"] / gray.shape[0]

    feats = np.array([[largest_area, mean_intensity, cx, cy]], dtype=np.float32)

    # --- 3) Apply the same scaling you used in training! ---
    feats = scaler.transform(feats)

    # --- 4) Predict on the two‐input model ---
    preds = model.predict([arr_img, feats])  # shape (1, num_classes)
    idx = int(np.argmax(preds[0]))

    labels = ['glioma', 'meningioma', 'no tumor', 'pituitary']
    return labels[idx]
