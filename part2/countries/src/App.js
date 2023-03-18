import { useState, useEffect } from 'react';
import axios from 'axios'

import Content from './components/Content'
 
import Form from './components/Form'

const App = () => {
	const [filter, setFilter] = useState("");
	const [countries, setCountries] = useState(null);

	useEffect (() => {
		axios.get(`https://restcountries.com/v3.1/all`)
			.then(
				(response) => {
					setCountries(response.data)
				}
			)
		}, []
	)

	const countriesToShow = filter.replaceAll(" ","").length === 0 || countries === null
		? null
		: countries.filter(country => 
			country
			.name
			.common
			.toLowerCase()
			.includes(filter.toLowerCase())
		)
	
	const onChangeCountry = (event) => {setFilter(event.target.value.toLowerCase())}

	const showCountry =  (countryName) => {
		setFilter(countryName); //Change de filter to the specific country name, then "countries to show" is changed too
	}

	return(
		<>
			<Form onChangeCountry={onChangeCountry}> </Form>
			<Content countriesToShow={countriesToShow} showCountry={showCountry}></Content>
		</>
	);
}

export default App;
