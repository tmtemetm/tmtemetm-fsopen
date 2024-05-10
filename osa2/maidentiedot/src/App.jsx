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

  return (
    <div>
      <CountryFilter
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />
      <CountryList
        countries={countries}
        filterText={filterText}
      />
    </div>
  )
}

export default App
