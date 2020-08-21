import diagnoses from "../data/diagnoses";
import { Diagnose } from "../types";

function getDiagnoses(): Diagnose[] {
    return diagnoses;
}

export default { getDiagnoses };
