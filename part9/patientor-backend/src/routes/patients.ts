import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, toNewEntry } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const patients = patientsService.getPatients_SAFE();
  res.send(patients);
});

patientRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsService.addPatient(newPatient);

  res.send(addedPatient);
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientsService.findPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  const newEntry = toNewEntry(req.body);
  const patientWithAddedEntry = patientsService.addEntry(
    req.params.id,
    newEntry
  );
  if (!patientWithAddedEntry) {
    res.status(404).send({ error: "Patient not found" });
  }
  res.send(patientWithAddedEntry);
});

export default patientRouter;
