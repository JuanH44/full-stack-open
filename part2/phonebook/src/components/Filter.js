export const Filter = ({filter, setFilter, handleChangeFilter}) => (
	<form >
		<div>
			<label>Filter: </label>
			<input onChange={handleChangeFilter}/>
		</div>
	</form>
);

