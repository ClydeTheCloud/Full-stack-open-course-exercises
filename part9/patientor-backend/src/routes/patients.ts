import express from "express";
import patientsService from "../services/patientsService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    const patients = patientsService.getPatients_SAFE();
    res.send(patients);
});

patientRouter.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    const addedPatientEntry = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });

    res.send(addedPatientEntry);
});

export default patientRouter;
