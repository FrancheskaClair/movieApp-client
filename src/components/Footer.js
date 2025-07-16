import { Row, Col, Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Notyf } from 'notyf';



export default function Footer(){

	return(

<footer className="footer-bg pt-5">
  <Container fluid>

    <Row className="pt-1 px-5">

      <Col md={3} className="me-5 pe-5 ms-5">
      <h5>CineAtlas</h5>
      <p className="text-light">A film discovery platform where every movie sparks a conversation.</p>
    </Col>

    <Col>
    <h5>Company</h5>
    <div className="d-flex flex-column gap-2 mb-2">
      <Link to="/" className="text-decoration-none text-light">About Us</Link>
      <Link to="/" className="text-decoration-none text-light">Contact Us</Link>
      <Link to="/" className="text-decoration-none text-light">Terms and Conditions</Link>
    </div>
  </Col>

  <Col>
  <h5 className="mb-2">Account</h5>
  <div className="d-flex flex-column gap-2">
    <Link to="/" className="text-decoration-none text-light">Home</Link>
    <Link to="/" className="text-decoration-none text-light">Login</Link>
    <Link to="/" className="text-decoration-none text-light">Sign Up</Link>
  </div>
</Col>


<Col>
<h5>Service</h5>
<div className="d-flex flex-column gap-2">
  <Link to="/" className="text-decoration-none text-light">Customer</Link>
  <Link to="/" className="text-decoration-none text-light">Support</Link>
  <Link to="/" className="text-decoration-none text-light">Privacy and Policy</Link>
</div>
</Col>

<hr className="mt-3" />

</Row>

<Row className="px-5">
  <Col>
  <p className="text-light text-center">&#169; CineAtlas 2025. All rights reserved.</p>


</Col>


</Row>
</Container>
</footer>






)
}