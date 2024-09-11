import { useState, useEffect } from 'react'
import SearchField from './components/search.jsx'
import AddPeople from './components/addPeople.jsx'
import People from './components/people.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [filtered, setNewFiltered] = useState(persons)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setNewFiltered(response.data)
      })
  }

  useEffect(hook, [])

  // you can't add the same person with different lower or upper case letters either
  const addPerson = (event) => {
    event.preventDefault()
    const sameName = persons.filter( person => person.name.toLowerCase() === newName.toLowerCase() )
    if (sameName.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      } 
      setPersons(persons.concat(personObject))
      setNewFiltered(filtered.concat(personObject))
      setNewNumber("")
      setNewName("")

    } else {
      alert(`${newName} is already added to phonebook`)
    }
  
  }

  const handleNames = (event) => {
    setNewName(event.target.value)
  }

  const handleNumbers = (event) => {
    setNewNumber(event.target.value)
  }

  const filterSearch = (event) => {
    setNewSearch(event.target.value)
    const search = event.target.value.toLowerCase()
    const filteredPersons = persons.filter( person => person.name.toLowerCase().includes(search))
    setNewFiltered(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField input={newSearch} filter={filterSearch}/>
      <h3>Add a contact</h3>
      <AddPeople person={addPerson} name={newName} addName={handleNames} number={newNumber} addNumber={handleNumbers}/>
      <h3>Numbers</h3>
      <People filteredList={filtered}/>
    </div>
  )
}

export default App
