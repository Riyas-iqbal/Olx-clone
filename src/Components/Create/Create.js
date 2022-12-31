import React, { Fragment , useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

const Create = () => {

  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const history = useHistory()

  const [ name , setName] = useState('')
  const [ category , setCategory] = useState('')
  const [ price , setPrice] = useState('')
  const [ image , setImage] = useState()

  const date = new Date()

  const handleSubmit = ()=>{

    console.log('Image Size',image.size/1000,'kb')

    firebase.storage().ref(`/image/${image.name}`).put(image)
    .then(({ref})=>{
      ref.getDownloadURL()
      .then((url)=>{
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          .then((response)=>{
            console.log('Document Added Successfully')
            history.push('/')
          })
          .catch((error)=>console.log('Error Adding Document',error))
      })
      .catch((error)=>console.log('Error get url',error))
    })
    .catch(error=>console.log('Error Uploading Image',error))
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(event)=>{setName(event.target.value)}}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(event)=>{setCategory(event.target.value)}}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              id="fname"
              value={price}
              onChange={(event)=>{setPrice(event.target.value)}} 
              name="Price" 
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={ image ? URL.createObjectURL(image) : '' }></img>
          
            <br />
            <input onChange={(event)=>{
                setImage(event.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
