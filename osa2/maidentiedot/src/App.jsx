import { useEffect, useState } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    countryService.getAll()
      .then(setCountries)
  }, [])

  const handleFilterTextChange = event =>
    setFilterText(event.target.value)

  const handleShowCountry = country =>
    setFilterText(country.name.common)

  return (
    <div>
      <CountryFilter
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />
      <CountryList
        countries={countries}
        filterText={filterText}
        handleShowCountry={handleShowCountry}
      />
    </div>
  )
}

export default App
