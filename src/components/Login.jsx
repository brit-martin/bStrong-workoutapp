import Button from "react-bootstrap/Button";
import { useState } from "react"
import React from 'react';

export default function Login(props){ 

const [emailValue, setEmailValue] = useState('')
const [passwordValue, setPasswordValue] = useState('')
const [firstNameValue, setFirstNameValue] = useState('')
const [lastNameValue, setLastNameValue] = useState('')

function signUpButton(){
    
}

    return(
        <>
        <form
            onSubmit={(element) => {
            props(element, {
                email: emailValue,
                password: passwordValue,
                fname: firstNameValue,
                lname: lastNameValue,
            });
          }}>
            <h3>Sign Up</h3>

            <label htmlFor='fname'><b>First Name</b></label>
            <input 
                type="text" 
                placeholder="First Name" 
                name='fname' 
                required
                onChange={(e) => setFirstNameValue(e.target.value)}
            ></input>

            <label htmlFor='lname'><b>Last Name</b></label>
            <input 
                type="text" 
                placeholder="Last Name" 
                name='lname' 
                required
                onChange={(e) => setLastNameValue(e.target.value)}
            ></input>

            <label htmlFor='email'><b>Email</b></label>
            <input 
                type="text" 
                placeholder="Enter email" 
                name='email' 
                required
                onChange={(e) => setEmailValue(e.target.value)}
            ></input>

            <label htmlFor='pword'><b>Password</b></label>
            <input 
                type="password" 
                placeholder="Enter password" 
                name="pword" 
                required
                onChange={(e) => setPasswordValue(e.target.value)} 
            ></input>

            <Button type="submit">Sign Up</Button>
            <span>Already registered <a href="#">login?</a></span>
        </form>
       
        <form>
            <div className="login-container">
                <label htmlFor="user-email"><b>Email</b></label>
                <input type='text' placeholder="Enter email" name ="user-email" required></input>

                <label htmlFor='password'><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required></input>

                <Button typeof="submit">Login</Button>
            </div>
            <div className="login-container">
                <Button className="cancelbtn">Cancel</Button>
                {/* <span class='psw'>Forgot <a href="#">password?</a></span> */}
            </div>
        </form>
        </>
    )
 
}

