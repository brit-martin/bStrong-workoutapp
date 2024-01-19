import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Exercise({element, props}) {
    let [repInput, setRepInput] = useState('')

    function SaveButton(){
        alert('button was clicked')
        let body ={
            goal: repInput,
            scheduleId: element.scheduleId,
            exerciseId: element.exerciseId,
            userId: element.userId,

        }
        axios.post('/new-rep', body)
        .then ((response) => {
            props.setRepInput(response.data.value)
            setRepInput('')
        })
        .catch ((error) => {
            console.log(error)
        })
    }

    console.log(element)
  return (
    <div key={element.ExercisePrograms.exerciseId}>
        <h3 >{element.name}</h3>
        <p>Goal: {element.reps}</p>
        <label>Reps:</label> 
        <input type="text" 
            name ="goal" 
            value={repInput}
            className='repInput'
            onChange={(event) => setRepInput(event.target.value)}
        />
            <Button className='btn' onClick={SaveButton}>Save</Button>
        <p>Sets: {element.sets}</p>
        
    </div>       
  )
}
