const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')

morgan.token('req-body', function (req) {
	return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))


const generateId = () => {
	const newId = Math.floor(Math.random() * 10000000)
	return newId
}

app.get('/info', (req, res) => {
	Person.find({}).then((persons) => {
		const info = `The phonebook currently has ${persons.length} contacts. This request processed at ${new Date()}.`

		res.json(info)
	})
})

app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		console.log(persons)
		res.json(persons)
	})
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.post('/api/persons/', (req, res, next) => {
	const body = req.body

	if (!body.number || !body.name) {
		return res.status(400).json({
			error: 'Important data is missing! Both name and number must be included!',
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
		id: generateId(),
		date: new Date(),
	})

	person
		.save()
		.then((savedPerson) => {
			res.json(savedPerson)
		})
		.catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
		.then((updatedPerson) => {
			res.json(updatedPerson.toJSON())
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Phonebook app server is now running on port ${PORT}`)
})
