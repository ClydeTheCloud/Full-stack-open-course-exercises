/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  NewEntry,
  Diagnosis,
  Entry,
} from "./types";

function isString(txt: any): txt is string {
  return typeof txt === "string" || txt instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(param: any): param is Gender {
  return Object.values(Gender).includes(param);
}

function isHealthRating(param: any): param is HealthCheckRating {
  return param >= 0 && param <= 3;
}

function parseName(name: any): string {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name field: ${name}`);
  }
  return name;
}

function parseSsn(ssn: any): string {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn field: ${ssn}`);
  }
  return ssn;
}

function parseOccupation(occupation: any): string {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing ssn field: ${occupation}`);
  }
  return occupation;
}

function parseDate(date: any): string {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date field: ${date}`);
  }
  return date;
}

function parseGender(gen: any): Gender {
  if (!gen || !isGender(gen)) {
    throw new Error(`Incorrect or missing gender field: ${gen}`);
  }
  return gen;
}

function parseHealthRating(rating: any): HealthCheckRating {
  if (
    rating === null ||
    rating === undefined ||
    !isHealthRating(parseInt(rating))
  ) {
    throw new Error(`Incorrect or missing health rating field: ${rating}`);
  }
  return rating;
}

function parseCommonTextField(input: any): string {
  if (!input || !isString(input)) {
    throw new Error(
      `Incorrect or missing common text field in entry: ${input}`
    );
  }
  return input;
}

export function toNewPatient(obj: any): NewPatient {
  const newPatient: NewPatient = {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: [],
  };

  return newPatient;
}

function parseDiagnosisCodes(codes: any): Array<Diagnosis["code"]> {
  if (codes instanceof Array && codes.length > 0) {
    return codes.map((code) => parseCommonTextField(code));
  } else {
    return [];
  }
}

export function toNewEntry(obj: any): Entry {
  const baseEntry: NewEntry = {
    description: parseCommonTextField(obj.description),
    date: parseCommonTextField(obj.date),
    specialist: parseCommonTextField(obj.specialist),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
  };

  console.log("POSSIBLE VALUES", Object.values(HealthCheckRating));
  console.log("INPUT VALUE", parseInt(obj.healthCheckRating));

  switch (obj.type) {
    case "HealthCheck":
      const healthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        id: generateId(),
        type: "HealthCheck",
        healthCheckRating: parseHealthRating(obj.healthCheckRating),
      };
      return healthCheckEntry;
    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        ...baseEntry,
        id: generateId(),
        type: "Hospital",
        discharge: {
          date: parseCommonTextField(obj.discharge.startDate),
          criteria: parseCommonTextField(obj.discharge.endDate),
        },
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        id: generateId(),
        type: "OccupationalHealthcare",
        employerName: parseCommonTextField(obj.employerName),
        sickLeave: obj.sickLeave
          ? {
              startDate: parseCommonTextField(obj.sickLeave.startDate),
              endDate: parseCommonTextField(obj.sickLeave.endDate),
            }
          : undefined,
      };
      return occupationalHealthcareEntry;
    default:
      throw new Error(`Unknown entry type: ${obj.type}`);
  }
}

export function generateId(): string {
  return `id-string-${Math.round(
    Math.random() * 100000000
  )}-f723-11e9-8f0b-362b9e155667`;
}
