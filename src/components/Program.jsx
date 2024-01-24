import { useState, useEffect } from 'react'
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios'
import Exercise from './Exercise.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './program.css'

export default function Program(props){

    let { setDisplayedProgramId } = props
    let [show, setShow] = useState(true);
    let [exercises, setExercises] = useState([])


    function getExercisePrograms(){
        axios.get(`/workout?programId=${props.displayedProgramId}&date=${props.date}`)
        .then((response) => {
            setExercises(response.data)   
            console.log(response.data)
        })
    }

    useEffect(() => {
        getExercisePrograms()
    }, [])

    function FavoriteButton(){
        console.log('button clicked')
        axios.put(`/favorite-regimen?id=${props.displayedProgramId}`)
        .then((response) => {
            console.log(response.data)   
            axios.get('/this-weeks-program')
            .then((response) => {
                props.setProgramObjs(response.data)
            })
        })
        .catch((error)=>{
            console.log(error)
        })  
        
    }


    function ResetRepsButton(){
        
        axios.delete(`/reset-rep?scheduleId=${props.displayedProgramId}`)
        .then((response)=>{
            alert(response.data.message)
            // getExercisePrograms()
            // setShow(false);
            setDisplayedProgramId(-1)
        })
        .catch ((error) => {
            console.log(error)
        })

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
                        return <Exercise 
                                key={element.exerciseId}
                                element={element}
                                exercises={exercises}
                            />
                            
                        })
                    }           
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={ResetRepsButton}>Reset</Button>
                {props.isFav?
                    <Button onClick={FavoriteButton}>Unfavorite</Button>:  
                    <Button>
                    <i className="bi bi-suit-heart-fill" style={{ fontSize: '1.25rem', color: '#D05353' }} onClick={FavoriteButton}></i>
                    </Button>
                }
            </Modal.Footer>

        </Modal>
        </>
    )
}