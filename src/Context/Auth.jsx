import { useTab } from '@chakra-ui/react'
import React, { createContext, useState } from 'react'

export const Auth = createContext()

const AuthProvider=({children})=>{
    const [auth,setAuth] = useState(false)
    const [type,setType] = useState('')
    const [info,setInfo] = useState({})
    // const [order,setOrder] = useState([])
    const [adminOrder,setAdminOrder] = useState([])


    return <Auth.Provider value={{auth,setAuth,type,setType,info,setInfo}}>
        {children}
    </Auth.Provider>
}

export default AuthProvider
