import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import List from './components/List';
import Form from './components/Form';
import "bootstrap"

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = () => {
    setLoading(true)
    axios.get("http://localhost:5018/todo")
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd pobierania: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if(loading)
  {
    return <div className='text-center'>Ładowanie...</div>;
  }

  return (
    <>
    <div className='w-50 d-flex flex-column m-auto '>
      <div id="top" className='container mt-5'>
            <h1 className='text-center mb-4'>TODO LIST</h1>
      </div>
      <List tasks={todos} onStatusChange={fetchTodos}/>
      <Form onTaskAdd={fetchTodos}/>
    </div>
    </>
  )
}

export default App
