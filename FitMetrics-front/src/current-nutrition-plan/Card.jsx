import { useState } from 'react';
import './Card.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Dropdown } from 'react-bootstrap';

function Card(props) {
  // Local state to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setShowModal(true);
  };

  const fetchWorkOuts = async (query) => {
    const url = 'http://localhost:8080/search?query=' + query;
    let data;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        data = result.map((item) => item.foodName); // Assuming 'exerciseName' is a field in the result
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    setExercises(data || []);
    console.log("ex: " + exercises)
  };

  const addWorkout = () => {
    handleModalClose();
    handleShowAdd();
  };

  const handleAddSubmit = () => {

    if (!exerciseName || !reps || !sets) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Added ${exerciseName} with ${reps} reps and ${sets} sets.`);

    handleCloseAdd();

    const newExcersise = 
    {exerciseName:exerciseName,
      reps:reps,
      sets:sets
    };

    props.updateData(props.id, newExcersise)
    
  };

  return (
    <div className="workout-card">
      <div className="title" onClick={handleModalShow} onTouchStart={handleModalShow}>
        <p
          style={{
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {props.day}
        </p>
      </div>

      <section
        className={`description-${props.id}`}
        style={{
          overflow: 'auto',
          maxHeight: '300px',
          padding: '10px',
          margin: '0',
        }}
      >
        <p style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
          {props.data.level}
        </p>
        {Array.isArray(props.data.exercises) &&
          props.data.exercises.map((exercise, index) => (
            <p key={index} style={{ color: 'white' }}>
              {`${exercise.exerciseName} (${exercise.reps} reps, ${exercise.sets} sets)`}
            </p>
          ))}
      </section>

      {/* Main Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton style={{ background: 'black' }}>
          <Modal.Title style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            {props.day}
            <img
              src="add.png"
              alt="Add Icon"
              style={{ marginLeft: '8px', width: '40px', height: '40px', cursor: 'pointer' }}
              onClick={addWorkout}
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: 'black' }}>
          <p style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
            {props.data.level}
          </p>
          {Array.isArray(props.data.exercises) &&
            props.data.exercises.map((exercise, index) => (
              <section key={index}>
                <p style={{ color: 'white' }}>
                  {`${exercise.exerciseName} (${exercise.reps} reps, ${exercise.sets} sets)`}
                </p>
                {index < props.data.exercises.length - 1 && (
                  <hr style={{ borderColor: 'white', margin: '10px 0' }} />
                )}
              </section>
            ))}
        </Modal.Body>

        <Modal.Footer style={{ background: 'black' }}>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Workout Modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton style={{ background: 'black' }}>
          <Modal.Title style={{ color: 'white' }}>Add New Workout</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: 'black' }}>
          <Form>
            <Form.Group controlId="exerciseName">
              <Form.Label style={{ color: 'white' }}>Exercise Name</Form.Label>
              <div className="dropdown">
                <Form.Control
                  type="text"
                  value={exerciseName}
                  onChange={(e) => {
                    setExerciseName(e.target.value); // Update exercise name as user types
                    if (e.target.value.trim()) {
                      fetchWorkOuts(e.target.value); // Trigger search when user types
                    }
                  }}
                  placeholder="Search for an exercise"
                  className="dropdownInput"
                />

                {/* Bootstrap Dropdown to display exercises */}
                {exerciseName && exercises.length > 0 && (
                  <Dropdown.Menu show>
                    {exercises.map((exercise, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setExerciseName(exercise)
                          setExercises([])
                        }} // Set selected exercise
                      >
                        {exercise}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="reps">
              <Form.Label style={{ color: 'white' }}>Reps</Form.Label>
              <Form.Control
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="Enter number of reps"
              />
            </Form.Group>

            <Form.Group controlId="sets">
              <Form.Label style={{ color: 'white' }}>Sets</Form.Label>
              <Form.Control
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="Enter number of sets"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ background: 'black' }}>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Add Workout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Card;
