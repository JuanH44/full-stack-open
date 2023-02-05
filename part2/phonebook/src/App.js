import { useState, useEffect } from 'react'
import phonebookService from './services/phonebookService'
import {Notification} from './components/Notification'
import {PersonForm} from './components/PersonForm'
import {Persons} from './components/Persons'
import {Filter} from './components/Filter'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([]) 
	const [filter, setFilter] = useState('');

	const [newPerson, setNewPerson] = useState({name:'',number:''});
	const [notification, setNotification] = useState({type:"notification", message:null});

	useEffect(() => {
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

	const clearNotification = () => {
		setTimeout(() => {
			setNotification({type:"notification", message:null}) 		
		}, 5000);
	}

	const displayNotification = (type, message) => {
		setNotification({
			type: `notification ${type}`, 
			message: message
		});
		clearNotification();
	}

const addPerson = (event, newPerson) => {
	event.preventDefault()
	
	if (!persons.some(person => person.name === newPerson.name)){
		phonebookService
			.create(newPerson)
			.then((newPersonReturned) => {
				setPersons(persons.concat(newPersonReturned))
				setNewPerson({name:"", number:""})
				displayNotification(
					"success",
					`Added ${newPerson.name}`
				);
			})
			.catch(reject => {
				displayNotification(
					"error",
					`Information of ${newPerson.name} has been already removed from server`
				);
			})
	}else{
		const updatedPerson = {
			...persons.find(person => person.name === newPerson.name), 
			number: newPerson.number
		}

		if(window
				.confirm(`${updatedPerson.name} is already added to the phonebook, replace the old number with a new one?`)
			){
			phonebookService
				.update(updatedPerson.id, updatedPerson)
				.then((updatedPersonReturned) => {
					setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPersonReturned));
					setNewPerson({name:"",number:""});
					displayNotification(
						"success",
						`Updated ${updatedPerson.name}'s information`
					);
				})
				.catch(reject => {
					displayNotification(
						"error",
						`Information of ${updatedPerson.name} has been already removed from server`
					);
				})
		}
	}
}

const deletePerson = ({id, name}) => {
	if(window.confirm(`Delete ${name}?`)){
		phonebookService
			.deletePerson(id)
			.then(() => {
				setPersons(persons.filter(person => id !== person.id))
				displayNotification(
					"success",
					`Deleted ${name}`
				);
			})
			.catch(() => {
				displayNotification(
					"error",
					`Information of ${name} has been already removed from server`
				);
			})
	}
}

  return (
    <div>
      <h2>Phonebook</h2>
			<Notification  notification={notification}/>

			<Filter filter={filter} setFilter={setFilter} handleChangeFilter={handleChangeFilter}/>
      <PersonForm newPerson={newPerson} addPerson={addPerson} handleChangeForm={handleChangeForm}/>
      
			<h2>Numbers</h2>
     
			<Persons persons={personsToShow}  setPersons={setPersons} deletePerson={deletePerson}/>

    </div>
  )
}

export default App