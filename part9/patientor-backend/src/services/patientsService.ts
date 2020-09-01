import patients from "../data/patients";
import { Patient_UNSAFE, Patient_SAFE, NewPatient, Entry } from "../types";
import { generateId } from "../utils";

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
    id: generateId(),
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
}

function findPatient(id: string): Patient_UNSAFE | undefined {
  return patients.find((p) => p.id === id);
}

function addEntry(patientId: string, entry: Entry): Patient_UNSAFE | undefined {
  const patient = findPatient(patientId);
  if (!patient) {
    return undefined;
  }
  patient.entries.push(entry);
  return patient;
}

export default {
  getPatients_SAFE,
  getPatients_UNSAFE,
  addPatient,
  findPatient,
  addEntry,
};
