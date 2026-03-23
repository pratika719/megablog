import { useState } from "react"
import React,{useState,useeffect} from 'react'
import { useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom'

export default function Protected({children,authentication=true}) {



const navigate=useNavigate()
const [loader,setLoader]=useState(true)
const authstatus =useSelector(state=>
    state.auth.status
)

useeffect(()=>{
  
    if(authentication && authstatus !== authentication){
      navigate("/login")

        
    } 
    else if(!authentication && authstatus !==authentication){
      navigate('/login')
    }

},[authstatus,navigate,authentication])




  return loader ? <h1>Loading.....</h1> :<>{children}</>
}


