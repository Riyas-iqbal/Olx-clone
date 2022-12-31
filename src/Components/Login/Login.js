import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom'; 

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = (event) => {
    console.log(email, password);
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential)
        history.push('/')
      })
      .catch((error) => {
        setError(error.message)
        console.log('error sign in : ', error)
      });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" alt='' src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            name="password"
            defaultValue="Doe"
          />
          <br />

          <br />
          <button className='loginBtn'>Login</button>
        </form>
        <button className='signupBtn' onClick={()=>history.push('/signup')}>Signup</button> 
        
      </div>
      <div className='errormessage'>
        <h6>{error}</h6>
      </div>
      
    </div>
  );
}

export default Login;
