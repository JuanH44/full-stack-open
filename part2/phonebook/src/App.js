import { useState } from 'react'
import {Filter, PersonForm, Persons} from './components/phonebook'

const App = () => {

  const [persons, setPersons] = useState([
    { 
			name: 'Arto Hellas',
			number: '040-1234567',
		}
  ]) 

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