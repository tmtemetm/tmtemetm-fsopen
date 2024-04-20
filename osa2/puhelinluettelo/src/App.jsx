import { useState } from 'react'

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(person =>
      <Person
        key={person.name}
        person={person}
      />
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '040-1234567' },
    { name: 'Alan Turing', number: '040-7654321' },
    { name: 'Linus Torvalds', number: '040-1112223' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNewNameChange = (event) =>
    setNewName(event.target.value)

  const handleNewNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterNameChange = (event) =>
    setFilterName(event.target.value)

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
    }
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = filterName.length === 0
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase()
        .includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNewNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
      />
    </div>
  )
}

export default App
