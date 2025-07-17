import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';

import '../index.css';

import { Notyf } from 'notyf';

export default function Register() {

	const notyf = new Notyf(); 
    const navigate = useNavigate()

	const {user} = useContext(UserContext);

	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);


	console.log(email);
	console.log(password);
	console.log(confirmPassword)


	function registerUser(e) {

		e.preventDefault();

		fetch('https://movieapi-salvador.onrender.com/users/register',{

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

		if(data.message === "Registered Successfully"){

			setEmail('');
			setPassword('');
			setConfirmPassword('');

			notyf.success("Registration successful")
			navigate('/login')

		} else {
			notyf.error("Unsuccessful Registration")
		}

		})
	}
    


	useEffect(()=>{

		if((email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

	},[email,password,confirmPassword])

	return (
			<div className="d-flex justify-content-center align-items-center my-5 pt-5">
			<Form onSubmit={(e) => registerUser(e)} id="sign-form">
			<h1 className="mb-5 text-center">Sign Up</h1>

				<Form.Group className="mb-2">
					<Form.Label>Email</Form.Label>
					<Form.Control 
					type="email"
					placeholder="Enter Email" 
					required 
					value={email} 
					onChange={e => {setEmail(e.target.value)}}/>
				</Form.Group>
				<Form.Group className="mb-2">
					<Form.Label>Password</Form.Label>
					<Form.Control 
					type="password" 
					placeholder="Enter Password" 
					required 
					value={password} 
					onChange={e => {setPassword(e.target.value)}}/>
				</Form.Group>
				<Form.Group className="mb-2">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control 
					type="password" 
					placeholder="Confirm Password" 
					required 
					value={confirmPassword} 
					onChange={e => {setConfirmPassword(e.target.value)}}/>
				</Form.Group>

				<p className="mt-3 text-center">
				  Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
				</p>

				{
					isActive

					? <Button type="submit" id="signup-btn">Sign Up</Button>
					: <Button type="submit" disabled id="signup-btn">Sign Up</Button>
				}
			</Form>
			</div>
		
		)
}