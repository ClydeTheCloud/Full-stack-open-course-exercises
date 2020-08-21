import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

interface BmiResponse {
    height: number;
    weight: number;
    result: string;
}

interface ExerciseIncomingData {
    daily_exercises: number[];
    target: number;
}

interface Request {
    body: ExerciseIncomingData;
}

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
        res.status(400).send({ error: "malformatted parameters" });
        return;
    }

    const responseObject: BmiResponse = {
        height: Number(req.query.height),
        weight: Number(req.query.weight),
        result: bmiCalculator(
            Number(req.query.height),
            Number(req.query.weight)
        ),
    };
    res.send(responseObject);
});

app.post("/exercises", (req, res) => {
    const incomingData = (req as Request).body;

    if (
        isNaN(Number(incomingData.target)) ||
        typeof incomingData.daily_exercises !== "object" ||
        incomingData.daily_exercises.some(isNaN)
    ) {
        res.status(400).send({ error: "malformatted parameters" });
        return;
    }

    if (!incomingData.target || !incomingData.daily_exercises) {
        res.status(400).send({ error: "parameters missing" });
        return;
    }

    const parsedTarget = Number(incomingData.target);
    const parsedSchedule: number[] = incomingData.daily_exercises.map(
        (n: number | string) => Number(n)
    );

    const result = calculateExercises(parsedSchedule, parsedTarget);
    res.send(result);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
