import React, { useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';
import { useHistory } from 'react-router-dom';


export default function Signup() {

  const history = useHistory()

  const [ username , setUsername ] = useState('')
  const [ email , setEmail ] = useState('')
  const [ phone , setPhone ] = useState('')
  const [ password , setPassword ] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = (event)=> {
    event.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email,password)

    .then((result)=>{
      result.user.updateProfile({displayName:username})

      .then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        })
        .catch((error)=> {
          console.log('Error adding document :' , error)
        })

        .then(()=>{
          history.push('/login')
        })

      })

    })
    .catch((error)=>{
      console.log('error creating user')
      console.log(error)
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={ username }
            onChange={ event => setUsername(event.target.value) }
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={ email }
            onChange={ event => setEmail(event.target.value) }
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={ phone }
            onChange={ event => setPhone(event.target.value) }
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={ password }
            onChange={ event => setPassword(event.target.value) }
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        {/* eslint-disable-next-line */}
        <a type='button' onClick={()=>history.push('/login')}>Login</a> 
      </div>
    </div>
  );
}
