import { useRef, useState } from 'react';
import './Card.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Dropdown } from 'react-bootstrap';

function Card(props) {
  // Local state to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showModify, setShowModify] = useState(false);

  const [exerciseName, setExerciseName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [exercises, setExercises] = useState([]);
  const all_exercises = useRef(null);
  const modified = useRef(null);



  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleShowModify = () => setShowModify(true);
  
  const handleCloseModify = () => {
    setShowModify(false);
    setShowModal(true);
    modified.current = null
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setShowModal(true);
    modified.current = null
  };

  const modifyData = (id, name) =>{
    modified.current = {"id":id}
    console.log(modified.current)
    setExerciseName(name)
    setShowModal(false)
    setShowAdd(false)
    setShowModify(true)


  };

  const fetchWorkOuts = async (query) => {
    const url = 'http://localhost:8080/exercise/all';
    let data;
    
    if (all_exercises.current) {
      setExercises(all_exercises.current.excercises_ids
        .filter((exercise) => exercise.toLowerCase().startsWith(query.toLowerCase())) || []);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`

        },
      });

      if (response.ok) {
        const result = await response.json();
        data = result; 
        all_exercises.current = data
        setExercises(all_exercises.current.excercises_ids
          .filter((exercise) => exercise.toLowerCase().startsWith(query.toLowerCase())) || []);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const addWorkout = () => {
    handleModalClose();
    handleShowAdd();
  };


  const handleModifySubmit = () => {

    if (!reps || !sets) {
      alert('Please fill in all fields.');
      return;
    }
    props.modifyData(modified.current.id, {"reps":reps, "sets":sets})   
    handleCloseModify()
    
  };

  const handleAddSubmit = () => {

    if (!exerciseName || !reps || !sets) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Added ${exerciseName} with ${reps} reps and ${sets} sets.`);
    
    handleCloseAdd();


    props.updateData({"exerciseName":exerciseName,"day":parseInt(props.id, 10) + 1, "id":null, "exerciseId":exerciseName, "sets":sets,"reps":reps })


    
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
          {props.level}
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
            {props.level}
          </p>
          {Array.isArray(props.data.exercises) &&
            props.data.exercises.map((exercise, index) => (
              <div key={index}>
                <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ color: 'white', margin: 0 }}>
                    {`${exercise.exerciseName} (${exercise.reps} reps, ${exercise.sets} sets)`}
                  </p>
                  
                  {/* Container for Modify and Delete icons */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="modify.png"
                      alt="Modify"
                      style={{ width: '20px', height: '20px', cursor: 'pointer', marginRight: '10px' }}
                      onClick={() => modifyData(exercise.id, exercise.exerciseName)} // Assuming a modify function
                    />
                    <img
                      src="delete.png"
                      alt="Delete"
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      onClick={() => props.deleteData(exercise.id)}
                    />
                  </div>
                </section>
                {index < props.data.exercises.length - 1 && (
                  <hr style={{ borderColor: 'white', margin: '10px 0' }} />
                )}
              </div>
            ))}
        </Modal.Body>



        <Modal.Footer style={{ background: 'black' }}>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
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
                      fetchWorkOuts(e.target.value);
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
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0 && /^\d*$/.test(value))) {
                    setReps(value);
                  }
                }}
                placeholder="Enter number of reps"
              />
            </Form.Group>


            <Form.Group controlId="sets">
              <Form.Label style={{ color: 'white' }}>Sets</Form.Label>
              <Form.Control
                type="number"
                value={sets}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0 && /^\d*$/.test(value))) {
                    setSets(value);
                  }
                }}
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


            {/* Add Workout Modal */}
        <Modal show={showModify} onHide={handleCloseModify}>
        <Modal.Header closeButton style={{ background: 'black' }}>
          <Modal.Title style={{ color: 'white' }}>Add New Workout</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: 'black' }}>
          <Form>
            <Form.Group controlId="exerciseName">
              <Form.Label style={{ color: 'white' }}>{exerciseName}</Form.Label>
            </Form.Group>

            <Form.Group controlId="reps">
              <Form.Label style={{ color: 'white' }}>Reps</Form.Label>
              <Form.Control
                type="number"
                value={reps}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0 && /^\d*$/.test(value))) {
                    setReps(value);
                  }
                }}
                placeholder="Enter number of reps"
              />
            </Form.Group>


            <Form.Group controlId="sets">
              <Form.Label style={{ color: 'white' }}>Sets</Form.Label>
              <Form.Control
                type="number"
                value={sets}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0 && /^\d*$/.test(value))) {
                    setSets(value);
                  }
                }}
                placeholder="Enter number of sets"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ background: 'black' }}>
          <Button variant="secondary" onClick={handleCloseModify}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModifySubmit}>
            Modify Workout
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Card;
