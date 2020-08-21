import express from "express";
import patientsService from "../services/patientsService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    const patients = patientsService.getPatients_SAFE();
    res.send(patients);
});

export default patientRouter;
