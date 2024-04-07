import axios from 'axios'
import React, { useContext } from 'react'
import { Context, server } from '../main'
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  
  const {user,isAuthenticated,loading} = useContext(Context);
   console.log(user);
  if(!isAuthenticated)return <Navigate to={"/login"} />
  return (
     loading?<Loader/>:<div>
      <h1>{user?.name}</h1>
      <h4>{user?.email}</h4>
     </div>
  )
}

export default Profile