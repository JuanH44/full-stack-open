 
 const Filter = ({filter, setFilter, handleChangeFilter}) => (

	<form >
		<div>
			<label>Filter: </label>
			<input onChange={handleChangeFilter}/>
		</div>
	</form>
);

const PersonForm = ({ newPerson, addPerson, handleChangeForm}) =>{

	return(
		<form onSubmit={(event) => addPerson(event, newPerson)}>
			<div>
				<label>name:</label> 
				<input name="name" value={newPerson.name}  onChange={handleChangeForm} />
			</div>
			<div>
				<label>number:</label> 
				<input name="number" value={newPerson.number}  onChange={handleChangeForm} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Person = ({person, deletePerson}) =>{
	return(
		<div>
			{person.name} {person.number} 
			<button onClick={() => deletePerson(person) }>Delete</button>
		</div>
	)
}

const Persons = ({persons, deletePerson}) => persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)
// export all components
export {Filter, PersonForm, Person, Persons};