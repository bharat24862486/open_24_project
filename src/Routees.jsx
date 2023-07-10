import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Main from './Components/Main'
import Admin from './Components/Admin'
import { Login } from './Components/Login'
import FoodCart from './Components/FoodCart'
import { Checkbox } from '@chakra-ui/react'
import CheckoutPage from './Components/CheckoutPage'
import PaymentSuccessPage from './Components/PaymentSuccessPage '
import Private from './Private'
import TraceOrderPage from './Components/StatusPage'
import AdminOrder from './Components/AdminOrder'
import UserTrace from './Components/UserTrace'
import Signup from './Components/Signup'
import AdminAllOrder from './Components/AdminAllOrder'

const Routees = () => {
  return (
    <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/admin' element={<Private><Admin /></Private>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/adminorder' element={<AdminOrder />} />
        <Route path='/adminallorder' element={<AdminAllOrder />}/>
        <Route path='/orders' element={<Private><FoodCart /></Private>} />
        <Route path='/checkout' element={<Private><CheckoutPage /></Private>} />
        <Route path='/successfull' element={<Private><PaymentSuccessPage /></Private>} />
        <Route path='/trace' element={<Private><UserTrace /></Private>} />
    </Routes>
  )
}

export default Routees
