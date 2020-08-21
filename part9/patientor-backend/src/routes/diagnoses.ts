import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
    const diagnoses = diagnosesService.getDiagnoses();
    res.send(diagnoses);
});

export default diagnosesRouter;
