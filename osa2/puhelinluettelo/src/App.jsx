import { useState } from 'react'

const Person = ({ person }) => <div>{person.name}</div>

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
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) =>
    setNewName(event.target.value)

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName
      }))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
      />
    </div>
  )
}

export default App
