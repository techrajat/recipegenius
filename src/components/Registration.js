import React from 'react';
import { useState } from 'react';
import '../App.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'; // Helps in navigating to a component in react

function Registration(props) {
  const navigate = useNavigate();

  // Registration form validation :-
  const [validated, setValidated] = useState(false);

  const handleSubmit1 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Completing the registration or fetching warning whether the user already exists :-
  // Note: If the user submits the form on the webpage and hence makes a post request, then the
  // response sent by the post request will open in a new webpage. We do not want the post request to 
  // open a new page with its response. Hence, whenever the registration form is submitted, we will :-
  // 1. Stop the form from getting submitted by using event.preventDefault() function.
  // 2. Collect the values filled in the form and make a post request using the collected values with
  //    function handleSubmit2().
  // 3. Fecth the response and display it on the current webpage if it is a warning, or, redirect to
  //    the hero component with login modal open if the registration is successful.
  const handleSubmit2=async(event)=>{
    event.preventDefault(); // Prevent the form from getting submitted
    // Make a post request to http://127.0.0.1:5000/api/auth/register with correct header and body :-
    const response = await fetch(`${props.server}/auth/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // body should be in JSON format
        firstName: document.getElementById('validationCustom01').value,
        lastName: document.getElementById('validationCustom02').value,
        phone: document.getElementById('validationCustom03').value,
        email: document.getElementById('validationCustom04').value,
        password: document.getElementById('validationCustom05').value
      })
    });
    const jsonRes = await response.json();
    if (response.status === 200){
      // Redirect to the hero component and open the login modal after successful registration :-
      navigate('/');
      props.openModal();
    }
    if (response.status === 400){
      document.querySelector('.regWarn').innerHTML = jsonRes.error;
    }
    if (response.status === 500){
      console.log(jsonRes.error);
    }
  }

  // Handle both form validation and authorization at the time of form submission :-
  const handleSubmit=(event)=>{
    handleSubmit1(event)
    let form = event.currentTarget;
    // checkValidity() is a built-in JavScript function to check the validity of an HTML form according
    // to the given rules.
    if (form.checkValidity() === true) { // Make post request only if the form is validated.
      handleSubmit2(event);
    }
  }

  return (
    <div>
      <Form action={`${props.server}/auth/register`} method='post' noValidate validated={validated} onSubmit={handleSubmit} id="regForm">
      <h3 id='regHead'>Register</h3>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01" className='my-2'>
          <Form.Label className='my-1'>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name='firstName'
            placeholder="First name"
            pattern="[A-Za-z]+"
          />
          <Form.Control.Feedback type="invalid">Enter a valid first name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02" className='my-2'>
          <Form.Label className='my-1'>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name='lastName'
            placeholder="Last name"
            pattern="[A-Za-z]+"
          />
          <Form.Control.Feedback type="invalid">Enter a valid last name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03" className='my-2'>
          <Form.Label className='my-1'>Phone</Form.Label>
          <Form.Control
            required
            type="tel"
            name='phone'
            placeholder="Phone number"
            pattern="[0-9]{10}"
          />
          <Form.Control.Feedback type="invalid">Enter a valid phone number</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04" className='my-2'>
          <Form.Label className='my-1'>Email</Form.Label>
          <Form.Control 
            required
            type="email" 
            name='email'
            placeholder="Email" 
          />
          <Form.Control.Feedback type="invalid">
            Enter a valid email id
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05" className='my-2'>
          <Form.Label className='my-1'>Password</Form.Label>
          <Form.Control 
            required
            type="password" 
            name='password'
            placeholder="Password" 
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
          />
          <Form.Control.Feedback type="invalid">
            Please should contain : <br/>
            - At least 8 characters <br/>
            - At least 1 alphabet <br/>
            - At least 1 number <br/>
            - At least 1 special character (@, $, !, %, *, #, ?, &)
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit</Button>
      <p class="regWarn"></p>
      </Form>
    </div>
  )
}

export default Registration