interface BmiInputValues {
    height: number;
    weight: number;
}

interface Error {
    message: string;
}

function bmiParseArgs(args: string[]): BmiInputValues {
    if (args.length < 4) throw new Error("Need more arguments");
    if (args.length > 4) throw new Error("Need less arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    }

    throw new Error("Please, provide valid numbers!");
}

export function bmiCalculator(height: number, weight: number): string {
    const bmIndex: number = weight / Math.pow(height / 100, 2);

    console.log(bmIndex);

    if (bmIndex < 15) {
        return "Very severely underweight";
    } else if (bmIndex < 16) {
        return "Severely underweight";
    } else if (bmIndex < 18.5) {
        return "Underweight";
    } else if (bmIndex < 25) {
        return "Normal (healthy weight)";
    } else if (bmIndex < 30) {
        return "Overweight";
    } else if (bmIndex < 35) {
        return "Obese Class I (Moderately obese)";
    } else if (bmIndex < 40) {
        return "Obese Class II (Severely obese)";
    } else {
        return "Obese Class III (Very severely obese)";
    }
}

if (process.argv.length > 2) {
    try {
        const { height, weight } = bmiParseArgs(process.argv);
        console.log(bmiCalculator(height, weight));
    } catch (e) {
        console.log("Oops! Something went wrong!", (e as Error).message);
    }
}
