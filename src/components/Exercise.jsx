import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import './exercise.css'

export default function Exercise({element}) {
    let [repInput, setRepInput] = useState('')

    // let element = props.element
    // console.log(element)

    function SaveButton(){
        
        let body = {
            goal: repInput,
            userId: 1,
            exerciseId: element.exerciseId,
            scheduleId: element.scheduleId,
        }

        console.log(body)
        
        axios.post('/new-rep', body)
        .then ((response) => {
            setRepInput(response.data)
            setRepInput('')
        })
        .catch ((error) => {
            console.log(error)
        })
    }
    

  return (
    <div key={element.exerciseId}>
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
