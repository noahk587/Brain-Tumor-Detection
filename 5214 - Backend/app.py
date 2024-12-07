from flask import Flask, request, jsonify
import pickle
from PIL import Image
import io
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pickle file (update 'model.pkl' to your actual pickle file path)
with open('vgg_16_model.pkl', 'rb') as f:
    model = pickle.load(f)

def preprocess_image(image):
    """
    Function to preprocess the image for the model
    """
    # Resize the image to match model input dimensions
    image = image.resize((128, 128))  # Resize to (128, 128)
    
    # Convert the image to a NumPy array
    image_array = np.array(image)
    
    # Ensure the image has 3 color channels (RGB)
    if image_array.shape[-1] != 3:
        image_array = np.stack([image_array] * 3, axis=-1)  # Add RGB channels if missing
    
    # Normalize the image (scale pixel values to [0, 1])
    image_array = image_array / 255.0
    
    # Add a batch dimension (model expects input shape of (None, 128, 128, 3))
    image_array = np.expand_dims(image_array, axis=0)
    
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

    # Get prediction from the model
    try:
        prediction = model.predict(processed_image)
    except Exception as e:
        return jsonify({"error": "Model prediction failed", "details": str(e)}), 500
    
    # Return the prediction result
    return jsonify({"prediction": prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
