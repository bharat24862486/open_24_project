import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Main from './Components/Main'
import Admin from './Components/Admin'

const Routees = () => {
  return (
    <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/admin' element={<Admin />} />
    </Routes>
  )
}

export default Routees
