import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context, server } from '../main';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';
const Home = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const {isAuthenticated} = useContext(Context);
  const submitHandler =  async(e)=>{
    e.preventDefault();
    setLoading(true);
   try {
        const {data} =  await axios.post(`${server}/tasks/new`,{title,description},{withCredentials:true,headers:{
          "Content-Type":"application/json"
        }})
       setTitle("");
       setDescription("");
     toast.success(data.message);
     setLoading(false);
   } catch (error) {
    toast.error(error.response.data.message);
    setLoading(false);
   }

  }

  const updateHandler = async(id)=>{
       try {
     const {data} =   await axios.put(`${server}/tasks/${id}`,{},{withCredentials:true})
       toast.success(data.message);
       } catch (error) {
          toast.error(error.response.data.message);
       }
  }
  const deleteHandler = async(id)=>{
    try {
     const {data} =  await axios.delete(`${server}/tasks/${id}`,{withCredentials:true})
      toast.success(data.message)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    axios
    .get(`${server}/tasks/get`,{withCredentials:true})
    .then(res=>{
      setTasks(res.data.tasks);
    })

  },[tasks])
  if(!isAuthenticated)return <Navigate to={'/login'} />
  return (
    <div className="container">
      <div className="login">
    <section>
    <form onSubmit={submitHandler} >
          <input type='text' placeholder='Title' required value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input type='text' placeholder='Description' required value={description} onChange={(e)=>setDescription(e.target.value)} />
          <button className='btn' typeof='submit' disabled={loading}>Add Task</button>
        </form>
    </section>
      </div>
      <section className="todosContainer">
       {tasks.map((task)=>{
       return <TodoItem 
       title = {task.title} 
       description={task.description} 
       isComplete={task.isComplete}
       id = {task._id}
       updateHandler = {updateHandler}
       deleteHandler = {deleteHandler}
       key={task._id}
       />
       })}
      </section>
    </div>
  )
}

export default Home