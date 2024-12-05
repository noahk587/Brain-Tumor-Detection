from flask import Flask, request, jsonify
import pickle
from PIL import Image
import io
import numpy as np

app = Flask(__name__)

# Load the pickle file (update 'model.pkl' to your actual pickle file path)
with open('vgg_16_model.pkl', 'rb') as f:
    model = pickle.load(f)

def preprocess_image(image):
    """
    Function to preprocess the image for the model
    """
    # Resize or normalize the image as per model requirements
    image = image.resize((128, 128))  # Example size, update to match your model
    image_array = np.array(image)
    image_array = image_array / 255.0  # Normalize if needed
    return image_array

@app.route('/')
def home():
    return "Welcome to the Brain Tumor Detection API!"

@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint to receive an image and process it using the pickle model
    """
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    # Read image from request
    image_file = request.files['image']
    try:
        image = Image.open(image_file.stream)
    except Exception as e:
        return jsonify({"error": "Invalid image format", "details": str(e)}), 400
    
    # Preprocess the image
    processed_image = preprocess_image(image)
    processed_image = processed_image.flatten().reshape(1, -1)  # Flatten for model if needed

    # Get prediction from the model
    try:
        prediction = model.predict(processed_image)
    except Exception as e:
        return jsonify({"error": "Model prediction failed", "details": str(e)}), 500
    
    # Return the prediction result
    return jsonify({"prediction": prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
