import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import '../App.css'

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

function Login() {

  // Login modal :-
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = 'rgb(78, 65, 65)';
    subtitle.style.textDecoration = 'underline';
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button type="button" className="btn btn-success loginBt" onClick={openModal}>Login</button>
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Page"
          id={'custom-modal'}
      >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login</h2>
          <button onClick={closeModal} id='modalClose'><i class="fa-solid fa-xmark"></i></button>
          <form action='/login' method='post'>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email id"/>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="text" class="form-control" id="password" name="password" placeholder="Enter your password"/>
          </div>
          <button type="submit" class="btn btn-success my-3 loginBt">Sign in</button>
          <p>Don't have an account? <a href="/">Register here</a></p>
          </form>
      </Modal>
    </div>
  )
}

export default Login