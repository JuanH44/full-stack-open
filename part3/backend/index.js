const express = require('express')
const app = express()

const PORT = 3001;

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
	response.send('<h1>Hello world!</h1>');
})

app.get('/api/notes', (request, response) =>{
	response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	const note =  notes.find(note => note.id === id);

	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(notes => notes.id !== id);

	response.status(204).end()
})

app.post('/api/notes/', (request, response) => {
	const note = request.body;
	console.log('note', note);

	response.json(note)
	//notes.concat(note)

})