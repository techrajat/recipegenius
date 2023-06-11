import React, { useEffect } from 'react'
import '../App.css'
import Logo from '../images/Logo.png'
import Login from './Login';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();

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

    // Check whether a user is logged in or not and then modify the navbar accordingly :-
    const getUser=async()=>{ // Function for getting logged in user detais
        try{
            let response = await fetch(`${props.server}/auth/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('token')
                }
            });
            if(response.status === 200){
                document.getElementById('navLoginBT').style.display = 'none';
                document.getElementById('userDropdown').style.display = 'block';
                let data = await response.json();
                document.getElementById('username').innerHTML = "<i class='fa-solid fa-user'></i>"+data.userDetails.firstName+" "+data.userDetails.lastName;
                props.setLogin(true);
            }
            else{
                console.log("Wrong authorization token");
                props.setLogin(false);
            }
        }
        catch{
            console.log("Start the MongoDB server.");
        }
    }
    
    useEffect(()=>{
        getUser(); // Get and display user's details when he/she logs in
    // eslint-disable-next-line
    }, [props.login]);

    // Logout the user if he/she clicks on the logout button :-
    const logout=()=>{
        if(props.login){
            localStorage.removeItem('token');
            props.setLogin(false);
            document.getElementById('navLoginBT').style.display = 'block';
            document.getElementById('userDropdown').style.display = 'none';
        }
    }

    // Save the recipe string entered by user in local storage and navigate to RecipeContainer.js :-
    const handleRecipeForm=async(event)=>{
            event.preventDefault();
            let str = document.getElementById('navSearch').value;
            document.getElementById('navSearch').value = null;
            if(window.innerWidth < 992){ // Close the navbar after search in mobile view
                document.querySelector('.navbar-toggler').click();
            }
            if(str){
            localStorage.setItem('searchStr', `https://api.spoonacular.com/recipes/complexSearch?apiKey=${props.apiKey}&query=${str}&number=100`);
            navigate('/recipeContainer');
        }
    };

    // Search for the cuisine selected by the user :-
    useEffect(()=>{
        document.querySelectorAll('.cuisine').forEach((element)=>{
            element.addEventListener('click', ()=>{
                let str = element.innerHTML;
                localStorage.setItem('searchStr', `https://api.spoonacular.com/recipes/complexSearch?apiKey=${props.apiKey}&query=${str}&number=100`);
                navigate('/recipeContainer');
            });
        });
    // eslint-disable-next-line
    }, []);

  return (
    <div>
        <nav className="navbar navbar-expand-lg fixed-top">
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
                    Cuisines
                </Link>
                <ul className="dropdown-menu scrollbar">
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Italian</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Mexican</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Chinese</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Indian</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Thai</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Japanese</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">French</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">Spanish</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><Link className="dropdown-item cuisine">American</Link></li>
                </ul>
                </li>
                <li className="nav-item mobileToggle" id='navLoginBT'>
                <Login server={props.server} modalIsOpen={props.modalIsOpen} openModal={props.openModal} closeModal={props.closeModal} setLogin={props.setLogin}/>
                </li>
                <li className="nav-item dropdown" id='userDropdown'>
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" id='username'></Link>
                <ul className="dropdown-menu">
                    <li className="mobileToggle"><Link className="dropdown-item" to="/likedRecipes">Liked recipes</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li className="mobileToggle"><button onClick={logout} className="dropdown-item" id='logout'>Logout</button></li>
                </ul>
                </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleRecipeForm}>
                <input className="form-control me-2 search" id='navSearch' type="search" placeholder="Search for recipe, nutrients, ingredients" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar