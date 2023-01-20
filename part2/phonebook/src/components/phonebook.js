import { useState } from 'react'
 
 const Filter = ({filter, setFilter, handleChangeFilter}) => (

	<form >
		<div>
			<label>Filter: </label>
			<input onChange={handleChangeFilter}/>
		</div>
	</form>
);

const PersonForm = ({persons, setPersons}) =>{
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	

	const handleChangeName = (event) => {
		setNewName(event.target.value)
	}

	const handleChangeNumber = (event) =>{
		setNewNumber(event.target.value)
	} 

	const addPerson = (event) => {
		event.preventDefault()
		const nameObject = {
			name: newName,
			number: newNumber,
		}
		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		}else{
			setPersons(persons.concat(nameObject))
			setNewName('')
		}
	}


	return(
		<form onSubmit={addPerson}>
			<div>
				<label>name:</label> 
				<input value={newName} onChange={handleChangeName} />
			</div>
			<div>
				<label>number:</label> 
				<input value={newNumber} onChange={handleChangeNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Person = ({person}) => <div>{person.name} {person.number}</div>

const Persons = ({persons}) => persons.map(person => <Person key={person.name} person={person} />)
// export all components
export {Filter, PersonForm, Person, Persons};