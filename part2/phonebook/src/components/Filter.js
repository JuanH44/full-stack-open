export const Filter = ({handleChangeFilter}) => (
	<form >
		<div>
			<label>Filter: </label>
			<input onChange={handleChangeFilter}/>
		</div>
	</form>
);

