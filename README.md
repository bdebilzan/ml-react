## Project Overview

This project demonstrates how to integrate AWS SageMaker with a React-based application. The code provides a backend server using Node.js and Express.js that interacts with an AWS SageMaker endpoint to make predictions based on input data. The frontend, built with React, sends data to this backend and displays the results.

### Key Features

- **Data Processing**: The backend processes CSV data received from the React frontend.
- **AWS SageMaker Integration**: The backend communicates with an AWS SageMaker endpoint to make predictions.
- **CORS Configuration**: The backend is configured to handle cross-origin requests from the React frontend.
- **Error Handling**: Includes error handling for SageMaker invocation and server responses.

### How It Works

1. **Backend Setup**:
   - The Node.js server uses Express to handle HTTP POST requests at the `/predict-temperature` endpoint.
   - Data sent to this endpoint is forwarded to an AWS SageMaker model endpoint for processing.
   - The server receives the model's prediction, processes it, and sends the result back to the frontend.

2. **Frontend Interaction**:
   - The React application communicates with the backend to send data and receive predictions.
   - The server's response is displayed in the React app.

This setup allows seamless integration of machine learning capabilities provided by AWS SageMaker with a user-friendly React frontend.
