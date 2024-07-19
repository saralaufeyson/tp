import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import PrimarySearchAppBar from './components/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DSea from './pages/daysearch'
import BasicTextFields from './pages/addstratergy'
import BasicTable from './pages/viewtable'
import BasicTextFields1 from './pages/editstratergy'
import Viewdoc from './pages/viewstrat'
function App() {
  

  return (
    <><Router>
     <PrimarySearchAppBar/>

    <Routes>
    <Route exact path="/home" element={<DSea/>}/>
    <Route exact path="/add" element={<BasicTextFields/>}/>
    <Route exact path="/view" element={<BasicTable/>}/>
    <Route exact path="/edit/:id" element={<BasicTextFields1/>}/>
    
    <Route exact path="/docview/:id" element={<Viewdoc/>}/>
    </Routes>
    
   
    
  

    </Router>
   
      
    </>
  )
}

export default App
