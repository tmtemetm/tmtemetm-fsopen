const CountryFilter = ({ filterText, handleFilterTextChange }) => (
  <div>
    Find countries&nbsp;
    <input
      value={filterText}
      onChange={handleFilterTextChange}
    />
  </div>
)

export default CountryFilter
