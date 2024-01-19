import Program from './components/Program'
import { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import axios from 'axios'



function App() {

  let [displayedProgramId, setDisplayedProgramId] = useState(-1)
 
  const [programObjs, setProgramObjs] = useState([])

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
   
    < div className="app">
     <h1>Workouts of the Week</h1>
            <div>
              {programObjs.map((element, index) => {
                return <div key={element.programId}>
                  {/* {console.log(element)} */}
                        <h2>{weeks[index]}</h2>  
                        <h5>{element.name}</h5>
                        <button onClick={() => setDisplayedProgramId(element.programId)}>Exercises</button>
                        {displayedProgramId === (element.programId) && 
                          <Program displayedProgramId = {displayedProgramId} setDisplayedProgramId = {setDisplayedProgramId}
                        />}
                  </div>
              })
            }
            </div>    
    </div>
  )
}

export default App
