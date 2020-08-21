import patients from "../data/patients";
import { Patient_UNSAFE, Patient_SAFE } from "../types";

function getPatients_UNSAFE(): Patient_UNSAFE[] {
    return patients;
}

function getPatients_SAFE(): Patient_SAFE[] {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
}

export default { getPatients_SAFE, getPatients_UNSAFE };
