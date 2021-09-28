
import express from 'express';
import patientsService from '../services/patientsService';
import toPatient from '../utils';



const patientsRoute = express.Router();

patientsRoute.get('/', (_req, res) => {
    res.send(patientsService.getPatientToView());
});

patientsRoute.post('/', (req, res) => {

     try{
        const newPatientObject = toPatient(req.body);
        const saved = patientsService.addNewPatient(newPatientObject);
        res.json(saved);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

export default patientsRoute;