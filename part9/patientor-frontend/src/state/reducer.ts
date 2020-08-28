import { State } from "./state";
import { Patient, Diagnosis } from "../types";

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
      type: "NEW_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const newPatientInfo = (patientInfo: Patient): Action => {
  return {
    type: "NEW_PATIENT_INFO",
    payload: patientInfo,
  };
};

export const setDiagnosesInfo = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses,
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
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "NEW_PATIENT_INFO":
      return {
        ...state,
        loadedPatientsInfo: {
          ...state.loadedPatientsInfo,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        loadedDiagnosisInfo: action.payload,
      };
    default:
      return state;
  }
};
