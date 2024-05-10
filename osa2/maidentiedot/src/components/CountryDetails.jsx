const Details = ({ country }) => (
  <div>
    <div>
      Capital: {country.capital.join(', ')}
    </div>
    <div>
      Area: {country.area} km<sup>2</sup>
    </div>
  </div>
)

const Languages = ({ country }) => {
  const languageList = Object.entries(country.languages)
    .map(entry => <li key={entry[0]}>{entry[1]}</li>)

  return (
    <ul>
      {languageList}
    </ul>
  )
}

const Flag = ({ country }) => (
  <div>
    <img
      className='flag-thumbnail'
      src={country.flags.png}
      alt={country.flags.alt}
    />
  </div>
)

const CountryDetails = ({ country }) => (
  <div>
    <h1>
      {country.name.common}
    </h1>
    <Details country={country} />
    <Languages country={country} />
    <Flag country={country} />
  </div>
)

export default CountryDetails
