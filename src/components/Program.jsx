import { useState, useEffect } from 'react'
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios'
import Exercise from './Exercise.jsx'

export default function Program(props){

    let { setDisplayedProgramId } = props
    let [show, setShow] = useState(true);
    let [exercises, setExercises] = useState([])


    useEffect(() => {
        axios.get(`/workout?programId=${props.displayedProgramId}&date=${props.date}`)
        .then((response) => {
            setExercises(response.data)
            // console.log(response.data)
            
        
        })
    }, [])

    function FavoriteButton(){
        console.log('button clicked')
        axios.put(`/favorite-regimen?id=${props.displayedProgramId}`)
        .then((response) => {
            console.log(response.data)   
            // window.location.reload();
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
        axios.delete(`/reset-rep?programId=${props.displayedProgramId}`)
        .then((response)=>{


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
                                
                            />
                            
                        })
                    }           
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={ResetRepsButton}>Reset</Button>
                {props.isFav?
                    <Button onClick={FavoriteButton}>Unfavorite</Button>:  
                    <Button onClick={FavoriteButton}>Favorite</Button>
                }
            </Modal.Footer>

        </Modal>
        </>
    )
}