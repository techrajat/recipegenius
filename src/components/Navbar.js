import React, { useEffect } from 'react'
import '../App.css'
import Logo from '../images/Logo.png'
import Login from './Login';
import { Link } from 'react-router-dom';

function Navbar(props) {
    // Disable the navbar when modal is open :-
    useEffect(()=>{
        if(props.modalIsOpen){
            document.querySelector('.navbar').style.pointerEvents = 'none';
            document.querySelector('.navbar').style.opacity = 0.5;
        }
        else{
            document.querySelector('.navbar').style.pointerEvents = 'auto';
            document.querySelector('.navbar').style.opacity = 1;
        }
    }, [props.modalIsOpen]) // Whenever the value of modalIsOpen will change, this code will activate / deactivate the navbar accordingly.

    // Close the navbar when a link is clicked in mobile view :-
    useEffect(()=>{
        if(window.innerWidth < 992){
            document.querySelectorAll('.mobileToggle').forEach((element)=>{
                element.addEventListener('click', ()=>{
                    document.querySelector('.navbar-toggler').click();
                });
            });
        }
    }, [])

  return (
    <div>
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src={Logo} alt="logo" id='logo' /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navContent">
                <li className="nav-item mobileToggle">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Recipes
                </Link>
                <ul className="dropdown-menu">
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Breakfast</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Lunch</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Dinner</Link></li>
                </ul>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Cuisines
                </Link>
                <ul className="dropdown-menu">
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Italian</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Mexican</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Chinese</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Indian</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Thai</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Japanese</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">French</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">Spanish</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">American</Link></li>
                    <li className="mobileToggle"><Link className="dropdown-item" to="/">More...</Link></li>
                </ul>
                </li>
                <li className="nav-item mobileToggle">
                <Link className="nav-link" aria-current="page" to="/">Restaurants</Link>
                </li>
                <li className="nav-item mobileToggle">
                    <Login server={props.server} modalIsOpen={props.modalIsOpen} openModal={props.openModal} closeModal={props.closeModal}/>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2 search" type="search" placeholder="Search for recipe, nutrients, ingredients" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar