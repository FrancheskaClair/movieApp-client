import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import UserContext from '../UserContext';

const MoviesPage = () => {
  const { user } = useContext(UserContext);

  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', director: '', year: '', description: '', genre: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const token = localStorage.getItem('token');

  const fetchMovies = () => {
    fetch('https://movieapi-salvador.onrender.com/movies/getMovies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data.movies || []);
        (data.movies || []).forEach(movie => fetchComments(movie._id));
      });
  };

  const fetchComments = (movieId) => {
    fetch(`https://movieapi-salvador.onrender.com/movies/getComments/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setComments(prev => ({ ...prev, [movieId]: data.comments }));
      });
  };

  const handleFormSubmit = () => {
    const url = editingId
      ? `https://movieapi-salvador.onrender.com/movies/updateMovie/${editingId}`
      : 'https://movieapi-salvador.onrender.com/movies/addMovie';
    const method = editingId ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false);
        setEditingId(null);
        setForm({ title: '', director: '', year: '', description: '', genre: '' });
        fetchMovies();
      });
  };

  const deleteMovie = (id) => {
    fetch(`https://movieapi-salvador.onrender.com/movies/deleteMovie/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => fetchMovies());
  };

  const submitComment = (movieId) => {
    fetch(`https://movieapi-salvador.onrender.com/movies/addComment/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ comment })
    })
      .then(res => res.json())
      .then(() => {
        fetchComments(movieId);
        setComment('');
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };

  if (!user) return null;

  return (
    <div className="container my-5 py-5">
      {user.isAdmin ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Admin Dashboard</h2>
            <Button onClick={() => setShowModal(true)}>Add Movie</Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th><th>Director</th><th>Year</th><th>Genre</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.year}</td>
                  <td>{movie.genre}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setEditingId(movie._id);
                        setForm(movie);
                        setShowModal(true);
                      }}
                    >Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => deleteMovie(movie._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <h2 className="mb-3">Uncover Your Next Favorite Film</h2>
          {movies.map(movie => (
            <Card className="mb-3" key={movie._id}>
              <Card.Body>
                <Card.Title>{movie.title} ({movie.year})</Card.Title>
                <Card.Subtitle>{movie.director}</Card.Subtitle>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMovie(movie);
                    setShowCommentsModal(true);
                  }}
                >
                  Comments
                </a>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {/* Add/Edit Movie Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {['title', 'director', 'year', 'description', 'genre'].map((field, i) => (
              <Form.Group key={i} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type={field === 'year' ? 'number' : 'text'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleFormSubmit}>{editingId ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>

      {/* Comments Modal */}
      <Modal show={showCommentsModal} onHide={() => setShowCommentsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments for {selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="mb-3 list-unstyled">
          {(comments[selectedMovie?._id] || []).map((c, i) => (
            <li key={i}>
              <strong>{c.username || 'Anonymous'}:</strong> {c.comment}
              <br />
            </li>
          ))}
        </ul>

          <Form>
            <Form.Control
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
            />
            <Button
              className="mt-2"
              size="sm"
              onClick={() => submitComment(selectedMovie._id)}
              disabled={!comment.trim()}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MoviesPage;
