import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";
export type Action =
    {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnose[];
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      patientId: string;
    };

export const setPatientList = (list: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: list };
};

export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const setDiagnoseList = (list: Diagnose[]): Action => {
  return { type: "SET_DIAGNOSE_LIST", payload: list };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return { type: "ADD_ENTRY", payload: entry, patientId };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
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
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const oldPatient = Object.values(state.patients).find(p => p.id === action.patientId);
      if (!oldPatient)
        return state;

      const newPatient = { ...oldPatient, entries: oldPatient.entries.concat(action.payload) };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: newPatient
        }
      };
    default:
      return state;
  }
};
