import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Registration(props) {

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

  // Fetching warning message after form submission :-
  const handleRegistration=async()=>{
    let data = await fetch(`${props.server}/auth/regWarn`);
    let parsedData = await data.text();
    if(parsedData && document.querySelector('.warn'))
      document.querySelector('.warn').innerHTML = parsedData;
  };
  useEffect(()=>{
    handleRegistration();
  });

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
            id="password"
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
      <p class="warn"></p>
      </Form>
    </div>
  )
}

export default Registration