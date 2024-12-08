import './Card.css'

function Card(props) {

  return (
    <div className="card">
        <div>
            {props.day}
        </div>
    </div>
  )
}

export default Card
