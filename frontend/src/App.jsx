import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Register from './components/Register'
import Header from './components/Header'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
 
  return (
    <div className="container"> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
