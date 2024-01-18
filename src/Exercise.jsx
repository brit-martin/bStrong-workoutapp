import { useState, useEffect } from 'react'
import './exercise.css'
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios'

export default function Exercise(props){

    const { setDisplayedProgramId } = props
    const [show, setShow] = useState(true);
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get(`/workout?programId=${props.displayedProgramId}`)
        .then((response) => {
            setExercises(response.data)
            console.log(response.data)
            
        
        })
    }, [])

    function FavoriteButton(){
        alert('workout favorited')
        axios.put(`/favorite-regimen?id=${props.displayedProgramId}`)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })  
        
    }

    function SaveButton(){
        alert('button was clicked')
        return (
            <>
    
            </>
        )
    }

    function ResetButton(){
        const [currentInput, setCurrentInput]= useState()

       
    }

    function RepsInputField (){

    }

    return (
        <>
        <Modal 
        size="lg"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton onHide={() => setShow(false) & setDisplayedProgramId(-1)}>
                <Modal.Title id="contained-modal-title-vcenter">Workout Program
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    {exercises.map((element) => {
                        return <div key={element.ExercisePrograms.exerciseId}>
                                <h3 >{element.name}</h3>
                                <p>Goal: {element.reps}</p>
                                <label>Reps:</label> 
                                <input type="text" name ="reps"/><Button onClick={SaveButton}>Save</Button>
                                <p>Sets: {element.sets}</p>
                                
                            </div>       
                        })
                    }           
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button>Reset</Button>
                <Button onClick={FavoriteButton}>Favorite</Button>
            </Modal.Footer>

        </Modal>
        </>
    )
}