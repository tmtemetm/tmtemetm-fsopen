import CountryDetails from './CountryDetails'

const maxCountries = 10

const Country = ({ country, handleShowCountry }) => (
  <div>
    {country.name.common}&nbsp;
    <button onClick={() => handleShowCountry(country)}>Show</button>
  </div>
)

const includesIgnoreCase = (string, substring) =>
  string.toLowerCase()
    .includes(substring.toLowerCase())

const CountryList = ({
  countries,
  filterText,
  handleShowCountry
}) => {
  if (!filterText) {
    return null
  }

  const filteredCountries = countries.filter(({ name }) =>
    includesIgnoreCase(name.common, filterText))
  
  if (filteredCountries.length > maxCountries) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (filteredCountries.length === 0) {
    return (
      <div>
        No matches
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <CountryDetails country={filteredCountries[0]} />
    )
  }

  const countryComponents = filteredCountries
    .map(country => (
      <Country
        key={country.name.common}
        country={country}
        handleShowCountry={handleShowCountry}
      />
    ))

  return (
    <div>
      {countryComponents}
    </div>
  )
}

export default CountryList
