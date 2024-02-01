import Button from "react-bootstrap/Button";
import { useState } from "react"
import React from 'react';
import axios from "axios";
import './login.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


export default function Login(props){ 
    const {setRefresh, refresh} = props

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [loginEmailValue, setLoginEmailValue] = useState('')
    const [loginPasswordValue, setLoginPasswordValue] = useState('')
    const [showLogin, setShowLogin] = useState(false)


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
            setRefresh(!refresh)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function loginUserButton(event){
        event.preventDefault()

        let oneUserBody = {
            email: loginEmailValue,
            password: loginPasswordValue,
        }

        axios.post('/login', oneUserBody)
        .then((response) => {
            console.log(response.data)
            setRefresh(!refresh)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    return(
        <>
        {!showLogin ?
        
        <Form onSubmit={signUpButton} className="signup-form">
            <img style={{maxHeight: "120px"}} src={`../images/workoutlogo.png`} alt="workoutlogo"/>
            <h3>Sign Up</h3>

            <FloatingLabel
                controlid="floatingInput"
                label="First Name"
                className="signup"
            >
                <Form.Control 
                    type="text" 
                    placeholder="First Name" 
                    value={firstNameValue} 
                    onChange={(e) => setFirstNameValue(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
                controlid="floatingInput"
                label="Last Name"
                className="signup"
            >
                <Form.Control 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastNameValue} 
                    onChange={(e) => setLastNameValue(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
                controlid="floatingInput"
                label="Email"
                className="signup"
            >
                <Form.Control 
                    type="text" 
                    placeholder="Last Name" 
                    value={emailValue} 
                    onChange={(e) => setEmailValue(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
                controlid="floatingInput"
                label="Password"
                className="signup"
            >
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={passwordValue} 
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
            </FloatingLabel>

            <Button className="signup-button" type="submit">Sign Up</Button>
            <span>Already registered <a href="#" onClick={() => {setShowLogin(true)}}>login?</a></span>
        </Form>
       :
        <Form onSubmit={loginUserButton} className="login-container">
            <img style={{maxHeight: "120px"}} src={`../images/workoutlogo.png`} alt="workoutlogo"/>
            <h3>Login</h3>
            <FloatingLabel
                controlid="floatingInput"
                label="Email"
                className="login"
            >
                <Form.Control 
                    type="text" 
                    placeholder="Email" 
                    value={loginEmailValue} 
                    onChange={(e) => setLoginEmailValue(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
                controlid="floatingInput"
                label="Password"
                className="login"
            >
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={loginPasswordValue} 
                    onChange={(e) => setLoginPasswordValue(e.target.value)}
                />
            </FloatingLabel>
            <div className="btn-container">
                <Button className='loginbtn' type="submit">Login</Button>
                <Button className="loginbtn" onClick={() => {setShowLogin(false)}}>Cancel</Button>
            </div>    
        </Form>
   
        }   
    </>
      
    )
 
}

