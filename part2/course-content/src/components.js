import React from 'react';

const Header = props => {
	return <h1>{props.course.name}</h1>;
};

const Part = props => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>
	);
};

const Content = props => {
	return (
		<div>
			{props.course.parts.map(part => (
				<Part part={part} key={part.id} />
			))}
		</div>
	);
};

const Total = props => {
	return (
		<p>
			<strong>
				Number of exercises{' '}
				{props.course.parts.reduce((a, b) => {
					return a + b.exercises;
				}, 0)}
			</strong>
		</p>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	);
};

export default Course;
