import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../index.css';



import { CircleArrowRight } from 'lucide-react';

export default function Landing (){

	return (
		<>
		<Row id="hero" className="d-flex justify-content-center align-items-center text-center">
		  <Col md={8} id="heroTxt">
		    <h1>Navigate film. Discover stories.</h1>
		    <p>
		      A personal guide through the world of cinema — explore, organize, and revisit the stories that move you.
		    </p>

		    <div className="d-grid gap-2 d-sm-flex justify-content-center">
		      <Link className="btn" id="sign-btn" to="/register">
		        Explore
		      </Link>
		    </div>
		  </Col>
		</Row>


		    
    </>

		)
};