import { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons} from './components/phonebook'
import phonebookService from './services/phonebookService'

const App = () => {

  const [persons, setPersons] = useState([]) 
	const [filter, setFilter] = useState('');

	const [newPerson, setNewPerson] = useState({name:'',number:''})

	useEffect(() => {
		console.log("Trayendo todo");
		phonebookService
			.getAll()
			.then(response =>
				setPersons(response)
			)
	}, [])

	const handleChangeFilter = (event) => setFilter(event.target.value);

	const handleChangeForm = (event) => {
		const {name, value} = event.target
		setNewPerson({...newPerson, [name]:value})
	}

	const personsToShow = ( /^\s*$/.test(filter) 
		? persons 
		: persons.filter(person => RegExp(`^${filter}`,'i').test(person.name))
	)

const addPerson = (event, newPerson) => {
	event.preventDefault()
	
	if (!persons.some(person => person.name === newPerson.name)){
		phonebookService
			.create(newPerson)
			.then(() => {
				setPersons(persons.concat(newPerson))
				setNewPerson({name:"", number:""})
			})
			.catch(reject => console.log("Something went wrong: ", reject))
	}else{
		const duplicatedPerson = persons.find(person => person.name === newPerson.name)
		const updatedPerson = {...duplicatedPerson, number:newPerson.number}

		if(window.confirm(`${duplicatedPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
			phonebookService
				.update(updatedPerson.id, updatedPerson)
				.then(() => {
					setPersons(persons.map(person => person.id === updatedPerson.id ? newPerson : person));
					setNewPerson({name:"",number:""});
				})
				.catch(reject => console.log("Something went wrong: ", reject))
		}
	}
}

const deletePerson = ({id, name}) => {
	if(window.confirm(`Delete ${name}?`)){
		phonebookService
			.deletePerson(id)
			.then(setPersons(persons.filter(person => id !== person.id)))
			.catch(reject => console.log("Something went wrong: ", reject))
	}
}

  return (
    <div>
      <h2>Phonebook</h2>

			<Filter filter={filter} setFilter={setFilter} handleChangeFilter={handleChangeFilter}/>
      <PersonForm newPerson={newPerson} addPerson={addPerson} handleChangeForm={handleChangeForm}/>
      
			<h2>Numbers</h2>
     
			<Persons persons={personsToShow}  setPersons={setPersons} deletePerson={deletePerson}/>

    </div>
  )
}

export default App