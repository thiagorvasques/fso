import { State } from "./state";
import { Diagnosis, Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_INFO";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  };

export const setPatientList = (patient: Patient[]): Action=> {
    return {
      type: "SET_PATIENT_LIST",
      payload: patient
    };
 };

 export const addPatient = (patient: Patient): Action=> {
   return {
     type: "ADD_PATIENT",
     payload: patient
   };
 };


 export const addPatientInfo = (patient: Patient): Action=> {
   return {
     type: "ADD_PATIENT_INFO",
     payload: patient
    };
  };

  export const setDiagnosis = (diagnosis: Diagnosis[]): Action=> {
     return {
       type: "SET_DIAGNOSIS",
       payload: diagnosis
     };
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_INFO":
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosisList: {
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnosisList
        }
      };
    default:
      return state;
  }
};
