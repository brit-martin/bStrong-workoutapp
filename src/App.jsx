import Program from './components/Program'
import { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import axios from 'axios'



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
     <h1>Workouts of the Week</h1>
     <img src='https://static.vecteezy.com/system/resources/thumbnails/026/781/389/small_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg' alt="Gym Image"/>
            <div>
              {programObjs.map((element, index) => {
                return <div key={element.programId}>
                  {/* {console.log(element)} */}
                        <h2>{weeks[index]}</h2>  
                        <h5>{element.name}</h5>
                        {/* <image{element.image}/> */}
                        <button onClick={() => setDisplayedProgramId(element.programId)}>Exercises</button>
                        {displayedProgramId === (element.programId) && 
                          <Program
                            displayedProgramId={displayedProgramId}
                            setDisplayedProgramId={setDisplayedProgramId}
                            date={element.date}
                            isFav = {element.isFav}
                            setProgramObjs = {setProgramObjs}
                          />
                        }
                  </div>
              })
            }
            </div>    
    </div>
  )
}

export default App
