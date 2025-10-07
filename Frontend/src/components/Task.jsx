import React, { useState } from 'react'
import "./Task.css"
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Task = ({todoTitle, isDone, index, onStatusChange}) => {
    const _isDone = isDone ? "Zrobione" : "Niezrobione";
    const buttonText = isDone ? "Anuluj" : "Wykonaj";
    const className = isDone ? "table-success" : "";
    const buttonClass = isDone ? "btn-warning" : "btn-success"

    const [editText, setEditText] = useState(false);
    const [title, setTitle] = useState(todoTitle);
    
    function ChangeStatus()
    {
      axios.patch(`http://localhost:5018/todo/${index}/status`)
      .then(()=>{
         onStatusChange();
      })
      .catch(error => {
        console.log("Błąd aktualizacji statusu: " + error);
      })
    }

    function Delete()
    {
      axios.delete(`http://localhost:5018/todo/${index}`)
      .then(()=>{
         onStatusChange();
      })
      .catch(error => {
        console.log("Błąd usuwania: " + error);
      })
    }

    function OpenEditTitle()
    {
      setEditText(!editText);
    }

    function EditTitle()
    {
      axios.patch(`http://localhost:5018/todo/${index}`, {
        title: title
      })
      .then(()=>{
         setEditText(false)
      })
      .catch(error => {
        console.log("Błąd usuwania: " + error);
      })
    }
  return (
    <>
    <tr className={className}>
      <td onDoubleClick={OpenEditTitle}>{editText ? <input type="text" name="title" defaultValue={title} autoFocus onChange={(e) => setTitle(e.target.value)} onBlur={EditTitle}/> : title}</td>
      <td>{_isDone}</td>
      <td>
        <button onClick={ChangeStatus} className={`btn btn-sm ${buttonClass}`}>{buttonText}</button>
        <button onClick={Delete} className={`btn btn-sm btn-danger ms-4`}>Usuń</button>
      </td>
    </tr>
    </>
  )
}

export default Task