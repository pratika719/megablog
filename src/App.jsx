import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"


import './App.css'

function App() {
  const [loading,setloading]=useEffect(true)
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
      dispatch(login({userData}))
      } else{
        dispatch(logout())
      }


    })
    .finally(()=>setloading(false))
  })


 

  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg gray-400 '>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />

        </main>
        <footer />
        
      </div>


    </div>
  ) : (null)

}

export default App
