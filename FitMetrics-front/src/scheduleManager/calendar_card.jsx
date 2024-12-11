import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CalendarCard({ title, body, closeCard }) {
  return (
    <Card style={{ width: '18rem', background: '#213A45', color: 'white' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <div className="list-group-flush">
        {/* Workout */}
        <Card.Subtitle
          className="mb-2"
          style={{ color: 'black', marginTop: '10px' }}
        >
          Workout:
        </Card.Subtitle>
        {Array.isArray(body?.Workout) ? (
          body?.Workout.map((item, index) => (
            <div
              key={`workout-${index}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              <span>• {item}</span>
            </div>
          ))
        ) : (
          <div style={{ color: 'white', padding: '5px 0' }}>
            {body?.Workout || "No workout data."}
          </div>
        )}

        {/* Food */}
        <Card.Subtitle
          className="mb-2"
          style={{ color: 'black', marginTop: '10px' }}
        >
          Food:
        </Card.Subtitle>
        {Array.isArray(body?.Food) ? (
          body?.Food.map((item, index) => (
            <div
              key={`food-${index}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              <span>• {item}</span>
            </div>
          ))
        ) : (
          <div style={{ color: 'white', padding: '5px 0' }}>
            {body?.Food || "No Food data."}
          </div>
        )}

        {/* Nutrition */}
        <Card.Subtitle
          className="mb-2"
          style={{ color: 'black', marginTop: '10px' }}
        >
          Nutrition:
        </Card.Subtitle>
        {Array.isArray(body?.Nutrition) ? (
          body?.Nutrition.map((item, index) => (
            <div
              key={`nutrition-${index}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              <span>• {item}</span>
            </div>
          ))
        ) : (
          <div style={{ color: 'white', padding: '5px 0' }}>
            {body?.Nutrition || "No Nutrition summary data."}
          </div>
        )}
      </div>

      <Button variant="primary" onClick={closeCard} style={{ background: "#333", borderColor: 'black' }}>
        Light Weeeight Baby!!! {/* Button triggers closeCard */}
      </Button>
    </Card>
  );
}

export default CalendarCard;
