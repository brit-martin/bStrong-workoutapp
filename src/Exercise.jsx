import { useState } from 'react'

export default function Exercise(props){


    return (
        <>
            <div className="modal">

                <div className="modal-box">
                    <h2>Sumo Squats</h2>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 8-10 Reps</p>
                    <p>Sets: 4</p>
                    <button>Save</button>    
                </div>
                <div className="modal-box">
                    <h2>Glute Bridge</h2>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 10 Reps</p>
                    <p>Sets: 4</p>
                    <button>Save</button>    
                </div>
                <div className="modal-box">
                    <h2>Leg Press</h2>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 9 Reps</p>
                    <p>Sets: 4</p>
                    <button>Save</button>    
                </div>
                <div className="modal-box">
                    <h2>Reverse Lunge</h2>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 10 Reps</p>
                    <p>Sets: 4</p>
                    <button>Save</button>    
                </div>
                <div className="modal-box">
                    <h2>Box Jumps</h2>
                    <label>Reps:</label>
                    <input type="text" name ="reps"/><p>Goal: 8-10 Reps</p>
                    <p>Sets: 4</p>
                    <button>Save</button>    
                </div>
                <br></br>
                <button>Reset</button>
                <button>Favorite</button>
                {/* <div className="modal-background" onClick= {setDisplayedProgramId}></div> */}
            </div>
        </>
    )
}