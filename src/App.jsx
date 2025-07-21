import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Settings from './pages/Settings.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

   return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  );


}

export default App
