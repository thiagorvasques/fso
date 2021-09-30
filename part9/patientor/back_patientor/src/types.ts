export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}


export type Entry =
    | HospitalEntry
    |OccupationalHealthcareEntry
    |HealthCheckEntry;

export interface BaseEntry{
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: healthCheckRating;

}

export interface DateInterval {
    startDate: string,
    endDate: string,
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: DateInterval
}

export interface Discharge {
    date: string,
    criteria: string
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge
}

export interface Patient{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type patientToView = Omit<Patient, 'ssn' | 'entries'>;

export type patientToadd = Omit<Patient, 'id' | 'entries'>;

// // Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;