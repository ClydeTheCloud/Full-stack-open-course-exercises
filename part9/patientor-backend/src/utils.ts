/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from "./types";

function isString(txt: any): txt is string {
    return typeof txt === "string" || txt instanceof String;
}

function isDate(date: string): boolean {
    return Boolean(Date.parse(date));
}

function isGender(param: any): param is Gender {
    return Object.values(Gender).includes(param);
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

function toNewPatient(obj: any): NewPatient {
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

export default toNewPatient;
