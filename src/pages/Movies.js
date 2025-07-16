// /src/pages/MoviesPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';

const MoviesPage = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', director: '', year: '', description: '', genre: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const token = localStorage.getItem('token');

  const getUser = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUser(data);
  };

  const fetchMovies = () => {
    fetch('http://localhost:4000/movies/getMovies', { headers: { Authorization: `Bearer ${token}` } })
     .then(res => {
    console.log('Response status:', res.status);
    return res.json();
  })
      .then(data => setMovies(data.movies || []));
  };

  const fetchComments = (movieId) => {
    fetch(`http://localhost:4000/movies/getComments/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setComments(prev => ({ ...prev, [movieId]: data.comments })));
  };

  const handleFormSubmit = () => {
    const url = editingId ? `http://localhost:4000/movies/updateMovie/${editingId}` : 'http://localhost:4000/movies/addMovie';
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
    fetch(`http://localhost:4000/movies/deleteMovie/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => fetchMovies());
  };

  const submitComment = (movieId) => {
    fetch(`http://localhost:4000/movies/addComment/${movieId}`, {
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
    getUser();
    fetchMovies();
  }, []);

  if (!user) return null;

  return (
    <div className="container mt-5 pt-5">
      {user.isAdmin ? (
        <>
          <h2>🎬 Admin Dashboard</h2>
          <Button className="mb-3" onClick={() => setShowModal(true)}>Add Movie</Button>

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
          <h2>📽 Available Movies</h2>
          {movies.map(movie => (
            <Card className="mb-3" key={movie._id}>
              <Card.Body>
                <Card.Title>{movie.title} ({movie.year})</Card.Title>
                <Card.Subtitle>{movie.director}</Card.Subtitle>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>

                <Form className="mt-3">
                  <Form.Control
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment"
                  />
                  <Button className="mt-2" size="sm" onClick={() => submitComment(movie._id)}>Submit</Button>
                </Form>

                <ul className="mt-3">
                  {(comments[movie._id] || []).map((c, i) => <li key={i}>{c.comment}</li>)}
                </ul>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

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
    </div>
  );
};

export default MoviesPage;

