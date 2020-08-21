interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface CalcInputValues {
    target: number;
    schedule: number[];
}

type Rating = 1 | 2 | 3;

function calcParseArgs(args: string[]): CalcInputValues {
    if (args.length < 4) throw new Error("Need more arguments");

    const newArgs: string[] = args.slice(2);

    newArgs.forEach((item) => {
        if (isNaN(Number(item))) {
            throw new Error(`${item} is not a valid number!`);
        }
    });

    const target = Number(newArgs.shift());
    const schedule: number[] = newArgs.map((hours) => Number(hours));

    return { target, schedule };
}

export function calculateExercises(
    schedule: number[],
    target: number
): Results {
    const daysOfTraining: number[] = schedule.filter((d) => d > 0);

    const average: number =
        schedule.reduce((acc, cur) => acc + cur) / schedule.length;

    const rating: Rating = (() => {
        if (average < target * 0.75) {
            return 1;
        } else if (average > target * 1.25) {
            return 3;
        } else {
            return 2;
        }
    })();

    const ratingDescription = ((): string => {
        switch (rating) {
            case 1:
                return "You need to workout a lot more!";
            case 2:
                return "It is ok, but you can do better!";
            case 3:
                return "Nice!";
        }
    })();

    const results: Results = {
        periodLength: schedule.length,
        trainingDays: daysOfTraining.length,
        target,
        average,
        success: average > target,
        rating,
        ratingDescription,
    };

    return results;
}

if (process.argv.length > 2) {
    try {
        const { target, schedule } = calcParseArgs(process.argv);
        console.log(calculateExercises(schedule, target));
    } catch (e) {
        console.log("Oops! Something went wrong!", (e as Error).message);
    }
}
