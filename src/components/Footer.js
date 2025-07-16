import { Row, Col, Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Notyf } from 'notyf';



export default function Footer(){

	return(

<footer className="footer-bg pt-5">
  <Container>

    <Row className="pt-5 px-5 align-items-center justify-content-between">
      <Col md="auto">
        <h6 className="fw-bold text-muted m-0">WellSync</h6>
      </Col>

      <Col md="auto">
        <div className="d-flex gap-4">
          <Link to="/" className="text-decoration-none text-muted">Home</Link>
          <Link to="/about" className="text-decoration-none text-muted">About Us</Link>
          <Link to="/login" className="text-decoration-none text-muted">Login</Link>
          <Link to="/login" className="text-decoration-none text-muted">Sign Up</Link>
        </div>
      </Col>
    </Row>

    <hr className="mx-5" />

    <Row className="px-5 pb-4 align-items-center justify-content-between">
      
      <Col md="auto" className="d-flex gap-3">
        <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-facebook text-muted"></i>
        </Link>
        <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-instagram text-muted"></i>
        </Link>
        <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-youtube text-muted"></i>
        </Link>
      </Col>

      <Col md="auto">
        <p className="text-muted m-0">&#169; WellSync 2025 | All rights reserved.</p>
      </Col>
    </Row>

  </Container>
</footer>






)
}