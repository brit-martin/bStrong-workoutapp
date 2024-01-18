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
        // axios.put(`/favorite-regimen?id=${}`)
        // .then((response) => {
          
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })  
        
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
                    {exercises.map((element, index) => {
                        return <>
                                <h3 key={element.ExercisePrograms.exerciseId}>{element.name}</h3>
                                <label>Reps:</label>
                                <input type="text" name ="reps"/>
                                <p>Goal: {element.reps}</p>
                                <p>Sets: {element.sets}</p>
                                <Button onClick={SaveButton}>Save</Button> 
                            </>       
                        })
                    }           
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button>Reset</Button>
                <Button>Favorite</Button>
            </Modal.Footer>

        </Modal>
        </>
    )
}