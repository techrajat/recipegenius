import './App.css';
import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Registration from './components/Registration';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {
  const server = 'http://127.0.0.1:5000/api';

  // Functions to toggle the login modal :-
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
      setIsOpen(true);
  }
  function closeModal() {
      setIsOpen(false);
  }

  return (
    // Router displays one element at a time. Hence the <login> component should not be present
    // in the router as it is displayed over all the components.
    <div>
      <Router>
        <Navbar server={server} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal}></Navbar>        
        <Routes>
          <Route exact path='/' element={<Hero/>}></Route>
          <Route exact path='/register' element={<Registration server={server} openModal={openModal}/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}