import './WorkoutPlan.css'
import Card from './Card.jsx'

function WorkoutPlan(props) {

  return (
    <div className="workout-plan-app">
        <Card day='sunday'/>
        <Card day='monday'/>
        <Card day='tuesday'/>
        <Card day='sunday'/>
        <Card day='sunday'/>
        <Card day='sunday'/>
        <Card day='sunday'/>
    </div>
  )
}

export default WorkoutPlan
