import { useTab } from '@chakra-ui/react'
import React, { createContext, useState } from 'react'

export const Auth = createContext()

const AuthProvider=({children})=>{
    const [auth,setAuth] = useState(false)
    const [loading,setLoading] = useState(true)
    const [type,setType] = useState('')
    const [info,setInfo] = useState({})
    // const [order,setOrder] = useState([])
    const [adminOrder,setAdminOrder] = useState([])
    const [hamburger, setHamburger] = useState(false);


    return <Auth.Provider value={{auth,setAuth,type,setType,info,setInfo,hamburger, setHamburger,loading,setLoading}}>
        {children}
    </Auth.Provider>
}

export default AuthProvider
