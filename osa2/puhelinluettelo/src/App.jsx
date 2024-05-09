import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(setPersons)
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

      personService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson =>
          setPersons(persons.filter(person =>
            person.id !== deletedPerson.id)))
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
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App
