export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  entries?: Entry[];
  dateOfBirth?: string;
}

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntryWithDiagnosisCodes extends BaseEntry {
  diagnosisCodes?: string[];
}

interface HospitalEntry extends BaseEntryWithDiagnosisCodes {
  type: 'Hospital';
  discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: number;
}

interface OccupationalHealthcareEntry extends BaseEntryWithDiagnosisCodes {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;
