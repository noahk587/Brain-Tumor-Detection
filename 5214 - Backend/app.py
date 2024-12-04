from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(name)

Load the pickle file (e.g., a trained ML model)
Make sure to upload this pickle file along with your backend when deploying to AWS
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return "Flask API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ensure the request has JSON data
        if not request.isjson:
            return jsonify({"error": "Request must be JSON"}), 400

Get image data (or any other data) from the request
        data = request.getjson()

        # Extract features or image processing (mocked for demonstration)
        imagedata = data.get('imagedata', None)
        if image_data is None:
            return jsonify({"error": "No image data provided"}), 400

Mocked feature processing from image data
Replace with actual image preprocessing logic if needed
        features = np.array(image_data).reshape(1, -1)

Predict using the loaded model
        prediction = model.predict(features)

        # Return prediction result
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name == '__main':
    app.run(debug=True)
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(name)

Load the pickle file (e.g., a trained ML model)
Make sure to upload this pickle file along with your backend when deploying to AWS
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return "Flask API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ensure the request has JSON data
        if not request.isjson:
            return jsonify({"error": "Request must be JSON"}), 400

Get image data (or any other data) from the request
        data = request.getjson()

        # Extract features or image processing (mocked for demonstration)
        imagedata = data.get('imagedata', None)
        if image_data is None:
            return jsonify({"error": "No image data provided"}), 400

Mocked feature processing from image data
Replace with actual image preprocessing logic if needed
        features = np.array(image_data).reshape(1, -1)

Predict using the loaded model
        prediction = model.predict(features)

        # Return prediction result
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name == '__main':
    app.run(debug=True)
