import Exercise from './Exercise.jsx'


function App() {
 

  return (
    <>
     <h1>Workouts of the Week</h1>
            <div>
                <h2 className='day'>Monday</h2>
                <h4>Glutes & Quads</h4>
                <button>Exercises</button>
                <Exercise/>
            </div>
            <div>
                <h2 className='day'>Tuesday</h2>
                <h4>Back & Biceps</h4>
                <button>Exercises</button>
                <Exercise/>
            </div>
            <div>
                <h2 className='day'>Wednesday</h2>
                <h4>Abs & Cardio</h4>
                <button>Exercises</button>
                <Exercise/>
            </div>
            <div>
                <h2 className='day'>Thursday</h2>
                <h4>Hamstrings & Glutes</h4>
                <button>Exercises</button>
                <Exercise/>
            </div>
            <div>
                <h2 className='day'>Friday</h2>
                <h4>Chest & Triceps</h4>
                <button>Exercises</button>
                <Exercise/>
            </div>
     
    </>
  )
}

export default App
