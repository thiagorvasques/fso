
import { patientToadd, Gender} from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (entry: any): entry is Gender => {
    return Object.values(Gender).includes(entry);
};
const parseString = (entry: unknown): string => {
    if(!entry || !isString(entry)){
        throw new Error('Incorrect or missing content');
    }
    return entry;
};
const parseGender = (entry: unknown): Gender => {
    if(!entry || !isGender(entry)){
        throw new Error("Incorrect or missing content");
    }
    return entry;
};


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toPatient = ({name,  dateOfBirth, ssn, gender, occupation}: Fields): patientToadd => {

    const newPatient: patientToadd = {
            name: parseString(name),
            dateOfBirth: parseString(dateOfBirth),
            ssn: parseString(ssn),
            gender: parseGender(gender),
            occupation: parseString(occupation)
    };

    return newPatient;
};

export default toPatient;