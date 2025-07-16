import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom'; 
import UserContext from '../UserContext';

import '../index.css';

import { Notyf } from 'notyf';


export default function Login() {

	const notyf = new Notyf(); 
    const navigate = useNavigate()

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);


    function authenticate(e) {

        e.preventDefault();
		fetch('http://localhost:4000/users/login',{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password

		})
	})
	.then(res => res.json())
	.then(data => {
		
		if(data.access){
			localStorage.setItem('token', data.access);
			retrieveUserDetails(data.access);

			notyf.success(`You are now logged in`);
			navigate('/')

		} else if (data.error === "Email and password do not match") {

			notyf.error(`Incorrect Credentials`);

		} else {

			notyf.error(`${email} does not exist`);
		}
	})

	setEmail('');
	setPassword('');


    }


    const retrieveUserDetails = (token) => {

        fetch('http://localhost:4000/users/details', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {

            setUser({
              id: data.user._id,
            });

        })

    };

    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
    		<div className="d-flex justify-content-center align-items-center mt-5">
	        <Form onSubmit={(e) => authenticate(e)} id="login-form">
	        	<h1 className="mb-5 text-center">Login</h1>
	            <Form.Group controlId="userEmail" className="mb-2">
	                <Form.Label>Email address</Form.Label>
	                <Form.Control 
	                    type="text"
	                    placeholder="Enter email"
	                    value={email}
            			onChange={(e) => setEmail(e.target.value)}
	                    required
	                />
	            </Form.Group>

	            <Form.Group controlId="password">
	                <Form.Label>Password</Form.Label>
	                <Form.Control 
	                    type="password" 
	                    placeholder="Enter password"
	                    value={password}
            			onChange={(e) => setPassword(e.target.value)}
	                    required
	                />
	            </Form.Group>

	            <p className="text-center small mt-3">Don't have an Account? <Link to="/register" className="text-decoration-none">Sign Up</Link></p>

	            <div className="d-flex justify-content-center pt-3">
	             { isActive ? 
	                <Button type="submit" id="login-btn">
	                    Login
	                </Button>
	                : 
	                <Button type="submit" id="login-btn" disabled>
	                    Login
	                </Button>
	            }
	            </div>
	        </Form>
	        </div>
    )
}