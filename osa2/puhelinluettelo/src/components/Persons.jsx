const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

const Persons = ({ persons, filterName }) => {
  const filteredPersons = filterName.length === 0
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase()
        .includes(filterName.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person =>
        <Person
          key={person.name}
          person={person}
        />
      )}
    </div>
  )
}

export default Persons
