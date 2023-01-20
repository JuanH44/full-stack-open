import React from 'react';

const Course = ({course}) => (
	<>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
	</>
);

const Header = ({course:{name}}) => <h2>{name}</h2>;

const Content = ({course:{parts}}) => {
	return (
		<div>
			{parts.map(part => 
				<Part key={part.id} part={part} />
			)}
		</div>
	);
};

const Part = ({part:{name, exercises}}) => <p>{name} {exercises}</p>;

const Total = ({course: {parts}}) => {
	const total = parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<div>
			<p><strong>total of {total} exercises</strong></p>
		</div>
	);
}; 

export default Course;