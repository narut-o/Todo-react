import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Header = () => {
 

  const {isAuthenticated,setIsAuthenticated} = useContext(Context);

  const logoutHandler =  async()=>{

    try {
         const data = await axios.get(`${server}/users/logout`,{
          withCredentials:true
         })
         setIsAuthenticated(false);
         console.log(data);
         toast.success(data.message);
    } catch (error) {
       toast.error(error.response.data.message);
       setIsAuthenticated(true);
    }
    
  }

  return (<nav className='header' >
    
 <div >
  <h2>TODO APP</h2>
  </div>
    
  <article>
    <Link to={"/"}>Home</Link>
    <Link to={"/profile"} >Profile</Link>
  { isAuthenticated ? <button className='btn' onClick={logoutHandler} >Logout</button>: <Link to={"/login"}>Log In</Link>}
  </article>


  </nav>
   
  )
}

export default Header