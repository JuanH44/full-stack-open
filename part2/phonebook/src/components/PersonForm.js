export const PersonForm = ({ newPerson, addPerson, handleChangeForm}) =>{
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