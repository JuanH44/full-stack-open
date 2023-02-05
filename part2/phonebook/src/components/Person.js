export const Person = ({person, deletePerson}) =>{
	return(
		<div>
			{person.name} {person.number} 
			<button onClick={() => deletePerson(person) }>Delete</button>
		</div>
	)
}