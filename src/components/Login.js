import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import '../App.css'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

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

  // Form validation :-
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Login modal :-
  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = 'rgb(78, 65, 65)';
    subtitle.style.textDecoration = 'underline';
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
            <Form.Group className='mb-3' controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email id"
              />
              <Form.Control.Feedback type='invalid'>Enter a valid email id</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter your password"
              />
              <Form.Control.Feedback type='invalid'>Enter a password</Form.Control.Feedback>
            </Form.Group>
            <button type="submit" class="btn btn-success my-3 loginBt">Login</button>
            <p>Don't have an account? <Link to="/register" onClick={props.closeModal}>Register here</Link></p>
          </Form>
      </Modal>
    </div>
  )
}

export default Login