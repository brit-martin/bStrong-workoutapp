import Program from './components/Program'
import { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function App() {

  let [displayedProgramId, setDisplayedProgramId] = useState(-1)
 
  const [programObjs, setProgramObjs] = useState([])

  console.log(programObjs)

  useEffect(() => {
    axios.get('/this-weeks-program')
    .then((response) => {
      setProgramObjs(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[])

  const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  return (
   
     <div className="app">
     <h1 className="heading-title">Workouts of the Week</h1>
     <img className="homepage-image"src='https://static.vecteezy.com/system/resources/thumbnails/026/781/389/small_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg' alt="Gym Image"/>
            <div className= "workout-cards">
              {programObjs.map((element, index) => {
                return <Card className="card" style={{ width: '18rem'}} key={element.programId}>
                        <Card.Img variant='top'className="program-image" src={element.image} />
                        <Card.Body>
                        <Card.Title className="card-content">{weeks[index]}</Card.Title>
                        <Card.Text className="card-content">{element.name}
                        <Button className="card-content" variant="primary" onClick={() => setDisplayedProgramId(element.programId)}>Exercises</Button>
                        {displayedProgramId === (element.programId) && 
                         
                         <Program
                            displayedProgramId={displayedProgramId}
                            setDisplayedProgramId={setDisplayedProgramId}
                            date={element.date}
                            isFav = {element.isFav}
                            setProgramObjs = {setProgramObjs}
                          />
                        }
                        </Card.Text>
                        </Card.Body>
                  </Card>
              })
            }
            </div>    
    </div>
  )
}

export default App
