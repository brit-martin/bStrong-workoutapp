import { useState } from 'react'
// import './exercise.css'
import {Button, Modal} from 'react-bootstrap';

export default function Exercise(props){
    const { setDisplayedProgramId } = props

    const [show, setShow] = useState(true);
    return (
        <>
        <Modal 
        size="xl"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
    
            <Modal.Header closeButton onHide={() => setShow(false) & setDisplayedProgramId(-1)}>
                <Modal.Title id="contained-modal-title-vcenter">Workout Program</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <h3>Sumo Squats</h3>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 8-10 Reps</p>
                    <p>Sets: 4</p>
                    <Button>Save</Button>    
                
                    <h3>Glute Bridge</h3>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 10 Reps</p>
                    <p>Sets: 4</p>
                    <Button>Save</Button>    
                
                    <h3>Leg Press</h3>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 9 Reps</p>
                    <p>Sets: 4</p>
                    <Button>Save</Button>    
               
                    <h3>Reverse Lunge</h3>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 10 Reps</p>
                    <p>Sets: 4</p>
                    <Button>Save</Button>    
              
                    <h3>Box Jumps</h3>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 8-10 Reps</p>
                    <p>Sets: 4</p>
                    <Button>Save</Button>    
                
            </Modal.Body>
            <Modal.Footer>
                <Button>Reset</Button>
                <Button>Favorite</Button>
                {/* <div className="modal-background" onClick={setDisplayedProgramId}></div> */}
            </Modal.Footer>
        </Modal>
        </>
    )
}