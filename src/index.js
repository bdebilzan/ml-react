const express = require('express');
const { SageMakerRuntime } = require('@aws-sdk/client-sagemaker-runtime');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.text({ type: 'text/csv' }));
app.use(cors({
  origin: 'http://localhost:5173' // Specify the origin of the frontend app
}));

const region = "us-east-1"; // specify the region
const sagemakerRuntime = new SageMakerRuntime({ region: region });

app.post('/predict-temperature', async (req, res) => {
const csvData = req.body;

const params = {
  EndpointName: 'canvas-new-deployment-03-07-2024-1-21-PM', // specify the name of the endpoint
  Body: csvData,
  ContentType: 'text/csv',
};


  try {
    const { Body } = await sagemakerRuntime.invokeEndpoint(params);
    const responseBody = Buffer.from(Body).toString('utf-8').trim();
    const predictedValue = responseBody.split(',')[0];
    res.json({ maxTemp: predictedValue });
  } catch (error) {
    console.error('Error invoking SageMaker endpoint:', error);
    res.status(500).send('Error predicting temperature');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
