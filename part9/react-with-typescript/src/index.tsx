import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartSubBase extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartSubBase {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartSubBase {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartSubBase {
    name: "Typescript is awesome";
    dueDate: string;
}

type CoursePart =
    | CoursePartOne
    | CoursePartTwo
    | CoursePartThree
    | CoursePartFour;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Header: React.FC<{ courseName: string }> = (props) => {
    return <h1>{props.courseName}</h1>;
};

const Content: React.FC<{ courseParts: CoursePart[] }> = (props) => {
    return (
        <>
            {props.courseParts.map((part) => {
                return <Part key={part.name} part={part} />;
            })}
        </>
    );
};

const Total: React.FC<{ courseParts: CoursePart[] }> = (props) => {
    return (
        <>
            <h3>Total</h3>
            <p>
                Number of exercises{" "}
                {props.courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            </p>
        </>
    );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <>
                    <h3>{part.name}</h3>
                    <p>Exercie count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </>
            );
        case "Using props to pass data":
            return (
                <>
                    <h3>{part.name}</h3>
                    <p>Exercie count: {part.exerciseCount}</p>
                    <p>Group project count: {part.groupProjectCount}</p>
                </>
            );
        case "Deeper type usage":
            return (
                <>
                    <h3>{part.name}</h3>
                    <p>Exercie count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>
                        Exercie submission link: {part.exerciseSubmissionLink}
                    </p>
                </>
            );
        case "Typescript is awesome":
            return (
                <>
                    <h3>{part.name}</h3>
                    <p>Exercie count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Due date: {part.dueDate}</p>
                </>
            );
        default:
            return assertNever(part);
    }
};

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink:
                "https://fake-exercise-submit.made-up-url.dev",
        },
        {
            name: "Typescript is awesome",
            exerciseCount: 5,
            description: "Advanced development with typescript",
            dueDate: "1 Jan 2021",
        },
    ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
