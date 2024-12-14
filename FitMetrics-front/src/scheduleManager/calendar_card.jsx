/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CalendarCard({ title, exercise, nutrition }) {
  return (
    <Card style={{ width: '18rem', backgroundColor: "rgba(33, 58, 69, 0.8)", color: 'white' }}>
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
          }}
        >
          {title}
        </Card.Title>

        <Card.Img variant="top" src="/images.png" alt="Card image" />

        <div className="card_details">
          <Card.Subtitle className="mb-2">Workout:</Card.Subtitle>
          {Array.isArray(exercise) && exercise.length > 0 ? (
            exercise.map((item, index) => (
              <div className="section_details" key={`workout-${index}`}>
                <span>
                  • {item.exerciseName} - {item.sets} sets x {item.reps} reps
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: '5px 0' }}>No workout data.</div>
          )}

          <Card.Subtitle className="mb-2">Nutrition:</Card.Subtitle>
          {Array.isArray(nutrition) && nutrition.length > 0 ? (
            nutrition.map((item, index) => (
              <div className="section_details" key={`nutrition-${index}`}>
                <span>
                  • {item.foodName}: {item.protein}g Protein, {item.carbohydrates}g Carbs, {item.energy} kcal
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: '5px 0' }}>No nutrition data.</div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CalendarCard;
