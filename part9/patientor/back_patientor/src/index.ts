import express from 'express';
import cors from 'cors';
import diagnosesRoute from './routes/diadnosesRoutes';
import patientsRoute from './routes/patientsRoutes';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use("/api/diagnosis", diagnosesRoute);
app.use("/api/patients", patientsRoute);





const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);

});