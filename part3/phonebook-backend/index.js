const express = require('express');
const app = express();

app.use(express.json());

var morgan = require('morgan');

morgan.token('req-body', function (req, res) {
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :req-body'
	)
);
// app.use(morgan('tiny'));

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1,
	},
	{
		name: 'Ada Lovelace',
		number: '39-44-5323523',
		id: 2,
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3,
	},
	{
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
		id: 4,
	},
	{
		name: 'Alex Rudy',
		number: '112-864939',
		id: 5,
	},
];

const generateId = () => {
	const newId = Math.floor(Math.random() * 10000000);
	return newId;
};

app.get('/info', (req, res) => {
	const info = `The phonebook currently has ${
		persons.length
	} contacts. This request processed at ${new Date()}.`;

	res.json(info);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find(person => person.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	// console.log(req.body);

	if (persons.find(person => person.id === id)) {
		persons = persons.filter(person => person.id !== id);
		res.status(204).end();
	} else {
		res.status(404).end();
	}
	// console.log(persons);
});

app.post('/api/persons/', (req, res) => {
	const body = req.body;
	// console.log(body);

	if (!body.number || !body.name) {
		return res.status(400).json({
			error:
				'Important data is missing! Both name and number must be included!',
		});
	} else if (persons.find(p => p.name === body.name)) {
		return res.status(400).json({
			error: 'Contact with this name already exists on the server.',
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
		date: new Date(),
	};

	persons = persons.concat(person);
	res.json(person);
	// console.log(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Phonebook app server is now running on port ${PORT}`);
});
