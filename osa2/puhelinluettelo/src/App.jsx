import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
    }, [])

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
      const newPerson = {
        name: newName,
        number: newNumber
      };
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterName={filterName}
      />
    </div>
  )
}

export default App
