const Form = ({onChangeCountry}) => {
	return ( 
		<form>
			<label>find countries: </label>
			<input name="country" type="text" placeholder="country name" onChange={onChangeCountry}></input>
		</form>
	);
	
}

export default Form;



