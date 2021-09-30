
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container } from "semantic-ui-react";
import { useStateValue, addPatientInfo} from "../state";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from '../constants';
import EntryDetatils from './EntryDetails';

function SinglePatient() {
  const [{ patientsInfo}, dispatch] = useStateValue();
  const [singlePatient, setSinglePatient] = React.useState<Patient| undefined>();

  const params = useParams<{id: string}>();
  console.log("list of Patients", patientsInfo);
  console.log('params', params);


 React.useEffect(() => {
    const isInState = Object.keys(patientsInfo).includes(params.id);
    console.log(isInState);
    const fetchSingle = async () => {
        try {
            const{ data: patientfromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${params.id}`);
            dispatch(addPatientInfo(patientfromApi));
            setSinglePatient(patientfromApi);
        }catch(e){
            console.log(e);
        }
    };
    if(isInState){
        console.log("patient already in State");
        const patient = Object.values(patientsInfo).find((p) => p.id === params.id);
        console.log("patient returned by find",patient);
        setSinglePatient(patient);
    } else {
        console.log("call backend single patient");
        void fetchSingle();
    }

 },[]);

    if(singlePatient){
        return (
            <Container>
                <h1>{singlePatient.name}
                {singlePatient.gender === "male"? <i className="mars icon"></i> : (singlePatient.gender === "female" ? <i className="venus icon"></i> : <i className="neuter icon"></i>)}
                </h1>
                <p>ssn:{singlePatient.ssn}</p>
                <p>occupation: {singlePatient.occupation}</p>
                <h4>Entries</h4>
                {singlePatient
                ?  singlePatient.entries.map((entry: Entry) => (
                    <EntryDetatils key={entry.id} entry={entry} />
                    // <div key={e.id}>
                    //     <p>{e.date} {e.description}</p>
                    //     <ul>
                    //         {e.diagnosisCodes?.map((c, i) => (
                    //             <li key={i}>{c}: {Object.values(diagnosisList).map((d: Diagnosis) => d.code === c ? d.name : null)}</li>
                    //         ))}
                    //     </ul>
                    // </div>
                ))

                : null

                 }
            </Container>

        );
    } else {
        return <p>Patient not found</p>;
    }
}

export default SinglePatient;
