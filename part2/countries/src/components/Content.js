import CountryInfo from "./CountryInfo"
import CountryList from "./CountryList"

const Content = ({countriesToShow,showCountry}) => {
	return(
		countriesToShow === null
		? null
		:	countriesToShow.length > 10 
			? <div>Too many matches, specify another filter</div>
			: countriesToShow.length === 1 
				? <CountryInfo country={countriesToShow[0]} ></CountryInfo>
				: <CountryList countriesToShow={countriesToShow} showCountry={showCountry}></CountryList>
	)
}

export default Content;