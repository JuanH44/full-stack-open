import { Person } from "./Person"
export const Persons = ({persons, deletePerson}) => 
	persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)