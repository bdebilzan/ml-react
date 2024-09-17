import express from 'express';
import { SageMakerRuntime } from '@aws-sdk/client-sagemaker-runtime';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.text({ type: 'text/csv' }));
app.use(cors({
    origin: 'http://localhost:5173' // Specify the origin of the frontend app
}));

const region = "us-east-2"; // specify the region
const sagemakerRuntime = new SageMakerRuntime({ region: region });

app.post('/predict-temperature', async (req, res) => {
    const csvData = req.body;

    const params = {
        EndpointName: 'canvas-new-deployment-09-16-2024-4-11-PM', // specify the name of the endpoint
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
