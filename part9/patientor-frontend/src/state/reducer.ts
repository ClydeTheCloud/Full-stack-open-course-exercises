import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

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
    }
  | {
      type: "ADD_NEW_ENTRY";
      payload: { patientId: string; entry: Entry };
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

export const addNewEntry = (entryData: {
  patientId: string;
  entry: Entry;
}): Action => {
  return {
    type: "ADD_NEW_ENTRY",
    payload: entryData,
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
    case "ADD_NEW_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId],
            entries: state.patients[action.payload.patientId].entries.concat(
              action.payload.entry
            ),
          },
        },
        loadedPatientsInfo: {
          ...state.loadedPatientsInfo,
          [action.payload.patientId]: {
            ...state.loadedPatientsInfo[action.payload.patientId],
            entries: state.patients[action.payload.patientId].entries.concat(
              action.payload.entry
            ),
          },
        },
      };
    default:
      return state;
  }
};
