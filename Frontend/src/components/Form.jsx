import axios from 'axios';
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const Form = ({onTaskAdd}) => {

    const [title, setTitle] = useState("");

    const sendForm = (e) => {
        e.preventDefault();

        if(title.trim().length > 0)
        {
            axios.post("http://localhost:5018/todo", {
                title: title
            })
            .then(response => {
                onTaskAdd();
            })
            .catch(error => {
                console.log("Error " + error);
            })
        }

    }
  return (
    <>
        <form onSubmit={sendForm} className='d-flex gap-5 m-5'>
            <input className='form-control' type="text" name="title" placeholder='Nazwa Zadania' onChange={(e) => setTitle(e.target.value)}/>
            <input type="submit" value="Dodaj" className='btn btn-primary'/>
        </form>
    </>
  )
}

export default Form