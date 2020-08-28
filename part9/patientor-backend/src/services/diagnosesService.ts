import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../types";

function getDiagnoses(): Diagnosis[] {
  return diagnoses;
}

export default { getDiagnoses };
