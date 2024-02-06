import { useState, useEffect } from 'react'
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios'
import Exercise from './Exercise.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './program.css'
import Swal from 'sweetalert2'

export default function Program(props){

    let { setDisplayedProgramId } = props
    let [show, setShow] = useState(true);
    let [exercises, setExercises] = useState([])


    function getExercisePrograms(){
        // console.log(`/workout?programId=${props.displayedProgramId}&date=${props.date}`)
        axios.get(`/workout?programId=${props.displayedProgramId}&date=${props.date}`)
        .then((response) => {
            setExercises(response.data)   
            // console.log(response.data)
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
        
        Swal.fire({
            title: "Are you sure you want to reset your reps?",
            text: "You wont be able to revert this.",
            icon: "warning",
            iconColor: "black",
            color: "white",
            showCancelButton: true,
            background: "#546E7A",
            confirmButtonColor: "black",
            cancelButtonColor: "#D05353",
            confirmButtonText: "Yes, reset them.",
        }).then ((result) => {
            console.log(result)
            if (result.isConfirmed) {
                axios.delete(`/reset-rep?scheduleId=${props.displayedProgramId}`)
                Swal.fire({
                    title: "Reset!",
                    text: "Your reps have been reset.",
                    icon: "success",
                    iconColor: "#DCE0D9",
                    background: "#546E7A",
                    color: "white",
                    confirmButtonColor: "#BACDCD",
                })  
            }
        })
        .then((response)=>{       
            setDisplayedProgramId(-1)
        })
        .catch ((error) => {
            console.log(error)
        })
    }

    return (
        <>
        <Modal 
        size="md"
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
                    <Button onClick={FavoriteButton}>Unfavorite
                    </Button>:  
                    <Button>
                    <i className="bi bi-suit-heart-fill" style={{ fontSize: '1.25rem', color: '#D05353' }} onClick={FavoriteButton}></i>
                    </Button>
                }
            </Modal.Footer>

        </Modal>
        </>
    )
}