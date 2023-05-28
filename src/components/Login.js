import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import '../App.css'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

function Login(props) {
  const navigate = useNavigate();

  // Login modal :-
  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = 'rgb(78, 65, 65)';
    subtitle.style.textDecorationLine = 'underline';
  }

  // Login form validation :-
  const [validated, setValidated] = useState(false);

  const handleSubmit1=(event)=>{
    let form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Verifying login credentials :-
  const handleSubmit2=async(event)=>{
    event.preventDefault(); // Prevent the form from getting submitted
    // Make a post request to http://127.0.0.1:5000/api/auth/login with correct header and body :-
    const response = await fetch(`${props.server}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // body should be in JSON format
        email: document.getElementById('validationCustom06').value,
        password: document.getElementById('validationCustom07').value
      })
    });
    const jsonRes = await response.json();
    if (response.status === 200){
      // Save the token in local storage and then redirect to the hero component and close the login
      // modal after succeful login :-
      localStorage.setItem('token', jsonRes.authToken);
      navigate('/');
      props.closeModal();
    }
    if (response.status === 400){
      document.querySelector('.logWarn').innerHTML = jsonRes.error;
    }
    if (response.status === 500){
      console.log(jsonRes.error);
    }
  }

  // Handle both form validation and login at the time of form submission :-
  const handleSubmit=(event)=>{
    handleSubmit1(event);
    let form = event.currentTarget;
    if (form.checkValidity() === true) { // Make post request only if the form is validated.
      handleSubmit2(event);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-success loginBt" onClick={props.openModal}>Login</button>
      <Modal
          isOpen={props.modalIsOpen}
          onAfterOpen={afterOpenModal}
          style={customStyles}
          contentLabel="Login Page"
          id={'custom-modal'}
      >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login</h2>
          <button onClick={props.closeModal} id='modalClose'><i class="fa-solid fa-xmark"></i></button>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId="validationCustom06">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Enter your email id"
              />
              <Form.Control.Feedback type='invalid'>Enter a valid email id</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId="validationCustom07">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <Form.Control.Feedback type='invalid'>Enter a password</Form.Control.Feedback>
            </Form.Group>
            <button type="submit" class="btn btn-success my-3 loginBt">Login</button>
            <p>Don't have an account? <Link to="/register" onClick={props.closeModal}>Register here</Link></p>
            <p class="logWarn"></p>
          </Form>
      </Modal>
    </div>
  )
}

export default Login