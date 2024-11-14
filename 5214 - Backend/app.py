from flask import Flask, request, render_template, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the app, allowing requests from specific origins
CORS(app, resources={r"/predict": {"origins": "http://localhost:*"}})

# Load the pre-trained model (update the path to your model file)
model = joblib.load(r'RFmodel.pkl')  # Replace with the correct model path


# Route for rendering the form in the frontend
@app.route('/')
def index():
    return render_template('index.html')


# Route to handle API call for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the POST request
        data = request.json

        # Create a DataFrame from the received data
        df = pd.DataFrame(data)

        # Make the prediction using the loaded model
        prediction = model.predict(df)

        # Return the prediction result
        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
