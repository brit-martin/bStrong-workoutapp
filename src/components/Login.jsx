import Button from "react-bootstrap/Button";
import { useState } from "react"
import React from 'react';
import axios from "axios";


export default function Login(props){ 

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [loginEmailValue, setLoginEmailValue] = useState('')
    const [loginPasswordValue, setLoginPasswordValue] = useState('')

    
    function signUpButton(event) {
        event.preventDefault()

        let userBody = {
            email: emailValue,
            password: passwordValue,
            fname: firstNameValue,
            lname: lastNameValue
        }

        axios.post('/signup', userBody)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function loginUserButton(event){
        event.preventDefault()

        axios.post('/login', userBody)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    return(
        <>
        <form onSubmit={signUpButton}>
            <h3>Sign Up</h3>

            <label htmlFor='fname'><b>First Name</b></label>
            <input 
                type="text" 
                placeholder="First Name" 
                name='fname' 
                value={firstNameValue}
                required
                onChange={(e) => setFirstNameValue(e.target.value)}
            ></input>

            <label htmlFor='lname'><b>Last Name</b></label>
            <input 
                type="text" 
                placeholder="Last Name" 
                name='lname' 
                value={lastNameValue}
                required
                onChange={(e) => setLastNameValue(e.target.value)}
            ></input>

            <label htmlFor='email'><b>Email</b></label>
            <input 
                type="text" 
                placeholder="Enter email" 
                name='email' 
                value={emailValue}
                required
                onChange={(e) => setEmailValue(e.target.value)}
            ></input>

            <label htmlFor='pword'><b>Password</b></label>
            <input 
                type="password" 
                placeholder="Enter password" 
                name="pword" 
                value={passwordValue}
                required
                onChange={(e) => setPasswordValue(e.target.value)} 
            ></input>

            <Button type="submit">Sign Up</Button>
            <span>Already registered <a href="#">login?</a></span>
        </form>
       

        <form onSubmit={loginUserButton}>
            <div className="login-container">
                <label htmlFor="user-email"><b>Email</b></label>
                <input
                     type='text' 
                     placeholder="Enter email" 
                     name ="user-email" 
                     value={loginEmailValue}
                     required
                     onChange={(e) => setLoginEmailValue(e.target.value)}>
                </input>

                <label htmlFor='password'><b>Password</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="password" 
                    value={loginPasswordValue}
                    required
                    onChange={(e) => setLoginPasswordValue(e.target.value)}>
                </input>

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

