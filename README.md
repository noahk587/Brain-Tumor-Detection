# Brain Tumor Detection
## Overview
This project aims to create an image recognition model for the early detection of brain tumors through MRI analysis, using machine learning to classify scans as either healthy or showing a tumor. The models that we considered for the image classification were a standalone, standard CNN model, VGG-16, and CNN Long Short-Term Memory Model.
## Web Deployment
Our web deployment can be accessed by the following link:  
https://main.dei0a255zwqfs.amplifyapp.com/

## Using a Local Host
Node.js is needed to run on local host. Additionaly, numpy, io, PIL, flask, flask_cors Python packages need to be installed.
1. **Clone the repository**:
    ```bash
    git clone https://github.com/noahk587/Brain-Tumor-Detection.git
    cd Brain-Tumor-Detection.git
2. **Move the `vgg_16_model.pkl` file into the `backend` folder**:

    - Make sure the `vgg_16_model.pkl` file (included in the project zip) is placed in the `backend` folder.
3. With the frontend as the working directory, run:
   ```bash
   npm i && npm run dev
4. In a new terminal window with the backend as the working directory, run:
   ```bash
   flask run

### Repository for Deployment
A second repository was needed for the deployment becasue of ownership requirment for a repository in order to deploy. The link to that respoitory can be accessed below:  
https://github.com/Dhruvil6/BrainTunor5214


## Dataset Source
Our dataset was obtained from Kaggle  
Link: https://www.kaggle.com/datasets/preetviradiya/brian-tumor-dataset/data
