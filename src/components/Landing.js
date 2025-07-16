import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../index.css';



export default function Landing (){

	return (
		<>
		<Row id="hero" className="d-flex justify-content-center align-items-center text-center py-5">
		  <Col md={8} id="heroTxt" className="mt-5 pt-5">
		    <h1 className="mt-5 pt-5">Navigate film. Discover stories.</h1>
		    <p>
		      A personal guide through the world of cinema — explore, organize, and revisit the stories that move you.
		    </p>

		    <div className="d-grid gap-2 d-sm-flex justify-content-center mb-5 pb-5">
		      <Link className="btn p-2 text-light fw-semibold" id="btn1" to="/register">
		        Explore Movies
		      </Link>
		    </div>
		  </Col>
		</Row>	    
    </>

		)
};