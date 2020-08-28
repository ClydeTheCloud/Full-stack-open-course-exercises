import patients from "../data/patients";
import { Patient_UNSAFE, Patient_SAFE, NewPatient } from "../types";

function getPatients_UNSAFE(): Patient_UNSAFE[] {
  return patients;
}

function getPatients_SAFE(): Patient_SAFE[] {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
}

function addPatient(newPatientObj: NewPatient): Patient_UNSAFE {
  const newPatientEntry: Patient_UNSAFE = {
    ...newPatientObj,
    id: `${Math.round(Math.random() * 100000000)}-f723-11e9-8f0b-362b9e155667`,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
}

function findPatient(id: string): Patient_UNSAFE | undefined {
  return patients.find((p) => p.id === id);
}

export default {
  getPatients_SAFE,
  getPatients_UNSAFE,
  addPatient,
  findPatient,
};
