# python_backend/app.py

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from PIL import Image
import io

#  Don’t forget this import since you use cv2 below!
import cv2
import numpy as np
import joblib

from model import load_model

app = Flask(__name__)
CORS(app)

# Load once at startup
model = load_model()
scaler = joblib.load('scaler.pkl')

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    return response

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return make_response(jsonify({}), 200)

    file = request.files.get('file')
    if not file or file.filename == '':
        return jsonify({'prediction': 'Invalid image, no prediction'}), 400

    try:
        # Read image
        img = Image.open(io.BytesIO(file.read())).convert('RGB')

        # --- image branch ---
        arr_img = np.array(img.resize((128, 128)), dtype=np.float32) / 255.0
        arr_img = np.expand_dims(arr_img, axis=0)

        # --- feature branch ---
        gray = cv2.cvtColor((arr_img[0] * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY)
        eq = cv2.equalizeHist(gray)
        edges = cv2.Canny(eq, 100, 200)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        area = float(max((cv2.contourArea(c) for c in contours), default=0))
        mean_int = float(np.mean(eq))
        cx = cy = 0.0
        if contours:
            M = cv2.moments(max(contours, key=cv2.contourArea))
            if M['m00'] != 0:
                cx = (M['m10']/M['m00']) / gray.shape[1]
                cy = (M['m01']/M['m00']) / gray.shape[0]
        feats = np.array([[area, mean_int, cx, cy]], dtype=np.float32)
        feats = scaler.transform(feats)

        # --- inference ---
        preds = model.predict([arr_img, feats])[0]  # e.g. [0.1, 0.7, 0.1, 0.1]
        print("DEBUG softmax scores:", preds)      # log them so you can inspect
        max_prob = float(np.max(preds))

        # Temporarily remove or lower the threshold
        threshold = 0.3
        if max_prob < threshold:
            return jsonify({'prediction': 'Invalid image, no prediction', 'confidence': max_prob}), 200

        idx = int(np.argmax(preds))
        # Make sure this ordering matches your flow_from_directory order:
        labels = ['glioma', 'meningioma', 'no tumor', 'pituitary']
        return jsonify({'prediction': labels[idx], 'confidence': round(max_prob, 3)})

    except Exception as e:
        print("ERROR in /predict:", e)  # server‐side log
        return jsonify({'prediction': 'Invalid image, no prediction', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
