export enum Gender {
    male = 'male',
    female = 'female'
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type patientToView = Omit<Patient, 'ssn'>;

export type patientToadd = Omit<Patient, 'id'>;