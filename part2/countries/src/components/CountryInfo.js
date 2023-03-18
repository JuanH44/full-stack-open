import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = ({country}) => {
	console.log('country', country);

	const [weather, setWeather] = useState(null);
	const [lat, lon] = country.capitalInfo.latlng;

	useEffect(() => {	
		axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`)
			.then(weatherInfo => setWeather(weatherInfo.data))
		}, [lat, lon]
	)

	return(
		<div>
			<h1>{country.name.common}</h1>
			<div>Capital: {country.capital[0]}</div>
			<div>Area: {country.area}</div>
			<h2>Languages:</h2>

			<ul>
				{Object.entries(country.languages).map( ([iso_639, language]) =>	<li key={iso_639}> {language}</li>)}
			</ul>

			<img src={country.flags.svg} alt={country.flags.alt} height={150}/>

			<h2>Weather in {country.capital[0]}</h2>

			{weather === null 
				? null 
				: <div>
						<div>Temperature {weather.main.temp} °C</div>
						<img 
							src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
							alt={weather.weather[0].description} 
							title={weather.weather[0].description}
						/>
						<div>Wind {weather.wind.speed} m/s</div>
					</div>
			}

		</div>
	)
}

export default CountryInfo;