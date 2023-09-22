import AddSighting from './components/AddSighting'
import './App.css'
import ListSightings from './components/ListSightings'

function App() {


  return (
    <>
    <div className="App">
      <header>
        <h1>Animal Sighting Tracker</h1>
      </header>
      <main>
        <div>
        <AddSighting />
        </div>
        <div className="sightingContainer">
        <ListSightings /></div>
      </main>
    </div>
    </>
  )
}

export default App
