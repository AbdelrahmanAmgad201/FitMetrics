/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CalendarCard({ title, body, closeCard }) {
  return (
    <Card style={{ width: '18rem', background: '#213A45', color: 'white', backgroundColor: "rgba(33, 58, 69, 0.8)" }}>
      

      <Card.Body>
      <Card.Title 
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#00e676',
          textAlign: 'center',
          textShadow: '5px 10px 5px rgba(0, 0, 0, 0.8)',
          letterSpacing: '2px',
          marginBottom: '15px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {title}
      </Card.Title>
      <Card.Img variant="top" src="/images.png" alt="Card image" />

      <div className="card_details">
        {/* Workout */}
        <Card.Subtitle className="mb-2">Workout:</Card.Subtitle>
        {Array.isArray(body?.Workout) ? (
          body?.Workout.map((item, index) => (
            <div className="section_details" key={`workout-${index}`}>
              <span>• {item}</span>
            </div>
          ))
        ) : (
          <div style={{ color: 'white', padding: '5px 0' }}>
            {body?.Workout || "No workout data."}
          </div>
        )}

        {/* Food */}
        <Card.Subtitle className="mb-2">Food:</Card.Subtitle>
        {Array.isArray(body?.Food) ? (
          body?.Food.map((item, index) => (
            <div className="section_details" key={`food-${index}`}>
              <span>• {item}</span>
            </div>
          ))
        ) : (
          <div style={{ color: 'white', padding: '5px 0' }}>
            {body?.Food || "No Food data."}
          </div>
        )}

        {/* Nutrition */}
        <Card.Subtitle className="mb-2">Nutrition:</Card.Subtitle>
        {Array.isArray(body?.Nutrition) ? (
          body?.Nutrition.map((item, index) => (
            <div className="section_details" key={`nutrition-${index}`}>
              <span>• {item}</span>
            </div>
          ))
        ) : (
          <div style={{ color: 'white', padding: '5px 0' }}>
            {body?.Nutrition || "No Nutrition summary data."}
          </div>
        )}
      </div>

    </Card.Body>

      <Button className="card_button" variant="primary" onClick={closeCard}>
        Light Weeeight Baaaby!!!
      </Button>

    </Card>
  );
}

export default CalendarCard;
