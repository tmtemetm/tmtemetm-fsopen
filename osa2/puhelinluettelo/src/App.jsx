import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setError] = useState(false)

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

  const displayNotification = (notification, error) => {
    setError(error)
    setNotification(notification)
    setTimeout(() => setNotification(null), 5000)
  }

  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons
      .find(person => person.name === newName)

    if (existingPerson !== undefined) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id,
          { ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person))
            displayNotification(`Updated ${updatedPerson.name}`, false)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            displayNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              true)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          displayNotification(`Added ${createdPerson.name}`, false)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person =>
            person.id !== deletedPerson.id))
          displayNotification(`Deleted ${deletedPerson.name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        isError={isError}
      />
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
