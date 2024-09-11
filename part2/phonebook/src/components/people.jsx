const People = ({filteredList}) => {
  return (
    <ul>
      {filteredList.map(person => 
        <li key={person.id} >{person.name} {person.number}</li>
      )}
    </ul>
  )
}

export default People