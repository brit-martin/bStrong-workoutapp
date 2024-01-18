import Exercise from './Exercise.jsx'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

function App() {

  let [displayedProgramId, setDisplayedProgramId] = useState(-1)
 
  // console.log(displayedProgramId)
  return (
   
    < div className="app">
     <h1>Workouts of the Week</h1>
            <div>
                <h2 className='day'>Monday</h2>
                <h5>Glutes & Quads</h5>
                <button onClick={() => setDisplayedProgramId(1)}>Exercises</button>
                {displayedProgramId === 1 && <Exercise displayedProgramId = {displayedProgramId} setDisplayedProgramId = {setDisplayedProgramId}/>}
            </div>
            <div>
                <h2 className='day'>Tuesday</h2>
                <h5>Back & Biceps</h5>
                <button onClick={() => setDisplayedProgramId(2)}>Exercises</button>
                {displayedProgramId === 2 && <Exercise displayedProgramId = {displayedProgramId} setDisplayedProgramId = {setDisplayedProgramId}/>}
            </div>
            <div>
                <h2 className='day'>Wednesday</h2>
                <h5>Abs & Cardio</h5>
                <button onClick = {() => setDisplayedProgramId(3)}>Exercises</button>
                {displayedProgramId === 3 && <Exercise displayedProgramId = {displayedProgramId} setDisplayedProgramId = {setDisplayedProgramId}/>}
            </div>
            <div>
                <h2 className='day'>Thursday</h2>
                <h5>Hamstrings & Glutes</h5>
                <button onClick = {() => setDisplayedProgramId(4)}>Exercises</button>
                {displayedProgramId === 4 && <Exercise displayedProgramId = {displayedProgramId} setDisplayedProgramId = {setDisplayedProgramId}/>}
            </div>
            <div>
                <h2 className='day'>Friday</h2>
                <h5>Chest & Triceps</h5>
                <button onClick ={() => setDisplayedProgramId(5)}>Exercises</button>
                {displayedProgramId === 5 && <Exercise displayedProgramId = {displayedProgramId} setDisplayedProgramId = {setDisplayedProgramId}/>}
            </div>
     
    </div>

    

  )
}

export default App
