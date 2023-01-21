import { useState, useEffect } from 'react'
import axios from 'axios'
import {Filter, PersonForm, Persons} from './components/phonebook'

const App = () => {

  const [persons, setPersons] = useState([]) 

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	const [filter, setFilter] = useState('');

	const handleChangeFilter = ({target:{value}}) =>setFilter(value);

	const personsToShow = ( /^\s*$/.test(filter) 
		? persons 
		: persons.filter(person => RegExp(`^${filter}`,'i').test(person.name))
	)

  return (
    <div>
      <h2>Phonebook</h2>

			<Filter filter={filter} setFilter={setFilter} handleChangeFilter={handleChangeFilter}/>
      <PersonForm persons={persons} setPersons={setPersons}/>
      
			<h2>Numbers</h2>
     
			<Persons persons={personsToShow}/>

    </div>
  )
}

export default App