import { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css'
import Task from './Task';
import "bootstrap/dist/css/bootstrap.min.css";

const List = ({onStatusChange, tasks}) => {
  const todos = tasks

  return (
    <>
        <table id='container' className='table table-stiped table-bordered'>
          <thead className='table-dark'>
            <tr>
              <th id='name'>Nazwa</th>
              <th id='state'>Status</th>
              <th id='action'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {todos.sort((a,b) => a.isDone - b.isDone).map((todo) => (
                <Task todoTitle={todo.title} isDone={todo.isDone} index={todo.id} onStatusChange={onStatusChange}/>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default List