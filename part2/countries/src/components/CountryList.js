const Countries = ({countriesToShow, showCountry}) => {

	return countriesToShow.map( country => {
	
		return(
			<div key={country.cca3}>
				<span>{country.name.common} </span>
				<button onClick={()=>showCountry(country.name.common)}>show</button>
			</div>
		);
		}
	)
}

export default Countries;