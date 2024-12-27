import { useRef, useState } from 'react';
import './Card.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

function Card(props) {
  const [showModal, setShowModal] = useState(false);

  // States for protein, carbohydrates, and calories
  const [protein, setProtein] = useState(props.data.protein || '');
  const [carbohydrates, setcarbohydrates] = useState(props.data.carbohydrates || '');
  const [calories, setCalories] = useState(props.data.calories || '');

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleSubmit = () => {
    // Validation for protein, carbohydrates, and calories
    if (!protein || !carbohydrates || !calories) {
      alert('Please fill in all fields.');
      return;
    }

    // Update data (modify functionality)
    const modifiedData = { protein, carbohydrates, calories };
    props.modifyData(modifiedData);

    handleModalClose();
  };

  return (
    <div className="nutrition-card">
      <div className="title" onClick={handleModalShow} onTouchStart={handleModalShow}>
        <p
          style={{
            color: '#021526',
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
          padding: '10px',
          margin: '0',
        }}
      >
        <p style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', textDecoration: 'underline' }}>
          {props.level}:
        </p>

        {/* Display nutritional information (protein, carbohydrates, calories) */}
        <p style={{ color: '#3B1C32', fontWeight: 'bold', fontStyle: 'italic' }}>
          {`${props.data.description}`}
        </p>


        <p style={{ color: 'white' }}>
          <span style={{ color: '#021526' }}>Protein: </span>{`${props.data.protein} g`}
        </p>
        <p style={{ color: 'white' }}>
          <span style={{ color: '#021526' }}>Carbohydrates: </span>{`${props.data.carbohydrates} g`}
        </p>
        <p style={{ color: 'white' }}>
          <span style={{ color: '#021526' }}>Calories: </span>{`${props.data.calories}`}
        </p>
      </section>
      <img
          src="healthy.png"
          alt="Healthy food Icon"
          style={{ width: '30%', height: '30%', marginLeft: '75%'}}

        />



      {/* Main Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton style={{ background: 'black' }}>
          <Modal.Title style={{ color: 'white' }}>Modify Nutritional Information</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: 'black' }}>
          <Form>
            <Form.Group controlId="protein">
              <Form.Label style={{ color: 'white' }}>Protein (g)</Form.Label>
              <Form.Control
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="Enter amount of protein"
              />
            </Form.Group>

            <Form.Group controlId="carbohydrates">
              <Form.Label style={{ color: 'white' }}>Carbohydrates (g)</Form.Label>
              <Form.Control
                type="number"
                value={carbohydrates}
                onChange={(e) => setcarbohydrates(e.target.value)}
                placeholder="Enter amount of carbohydrates"
              />
            </Form.Group>

            <Form.Group controlId="calories">
              <Form.Label style={{ color: 'white' }}>Calories</Form.Label>
              <Form.Control
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter total calories"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ background: 'black' }}>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Card;
