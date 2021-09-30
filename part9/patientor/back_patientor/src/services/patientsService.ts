/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { patientToadd, patientToView, Patient } from '../types';
import {v1 as uuid} from 'uuid';

const getPatientToView = (): patientToView[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addNewPatient = (patient: patientToadd): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        ssn: patient.ssn,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: []
    };


    patients.push(newPatient);
    return  newPatient;

};

const getPatientById = (id: string): Patient | undefined=> {
  const patient = patients.find((p) => p.id === id);
  return patient;
};


export default {getPatientToView, addNewPatient, getPatientById};