import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const patients = patientsService.getPatients_SAFE();
  res.send(patients);
});

patientRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatientEntry = patientsService.addPatient(newPatient);

  res.send(addedPatientEntry);
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientsService.findPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

export default patientRouter;
