import './Card.css'

function Card(props) {

  return (
    <div className="workout-card">
        <div className='title'><p>{props.day}</p></div>
    </div>
  )
}

export default Card
