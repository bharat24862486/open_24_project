import React, { useContext } from 'react'
import { Auth } from './Context/Auth'
import { Navigate, redirect, useNavigate } from 'react-router-dom'

const Private = ({children}) => {
    let {auth,setAuth,type,setType,info,setInfo} = useContext(Auth)
    const navigate = useNavigate()
    console.log(auth)
    if(auth == false){
       return  <Navigate to='/login'/>
    }

    return children
   
}

export default Private
