export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient_UNSAFE = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export type Patient_SAFE = Omit<Patient_UNSAFE, "ssn">;
