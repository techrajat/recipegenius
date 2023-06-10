import './App.css';
import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Registration from './components/Registration';
import RecipeContainer from './components/RecipeContainer';
import LoadingBar from 'react-top-loading-bar';
import RecipeInfo from './components/RecipeInfo';
import LikedRecipes from './components/LikedRecipes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const server = 'http://127.0.0.1:5000/api';

  // To maintain information whether a user is logged in or not :-
  const [login, setLogin] = useState(false);

  // Sets the progress of the progress bar of RecipeContainer.js :-
  const [progress, setProgress] = useState(0);

  // Functions to toggle the login modal :-
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
      setIsOpen(true);
  }
  function closeModal() {
      setIsOpen(false);
  }

  // To store the id of the recipe selected by the user :-
  // const [selectedRecipeID, setSelectedRecipeID] = useState(null);

  return (
    // Router displays one element at a time. Hence the <login> component should not be present
    // in the router as it is displayed over all the components.
    <div>
      <Router>
        <LoadingBar color='green' progress={progress}/>
        <Navbar server={server} apiKey={apiKey} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} login={login} setLogin={setLogin}></Navbar>        
        <Routes>
          <Route exact path='/' element={<Hero apiKey={apiKey}/>}></Route>
          <Route exact path='/register' element={<Registration server={server} openModal={openModal}/>}></Route>
          <Route exact path='/recipeContainer' element={<RecipeContainer apiKey={apiKey} setProgress={setProgress}/>}></Route>
          <Route exact path='/recipeInfo' element={<RecipeInfo server={server} openModal={openModal} login={login}/>}></Route>
          <Route exact path='/likedRecipes' element={<LikedRecipes apiKey={apiKey} server={server}/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}