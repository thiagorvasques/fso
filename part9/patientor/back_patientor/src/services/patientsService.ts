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
        ...patient
    };


    patients.push(newPatient);
    return  newPatient;

};

export default {getPatientToView, addNewPatient};