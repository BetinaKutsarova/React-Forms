// import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
