import { useState, useEffect, useRef } from 'react'
import './WorkoutPlan.css'
import Card from './Card.jsx'

function WorkoutPlan(props) {
  const workoutPlanData = useRef(null)
  return (
    <div className="workout-plan-app">
        <Card day='Saturday'/>
        <Card day='Sunday'/>
        <Card day='Monday'/>
        <Card day='Tuesday'/>
        <Card day='Wednesday'/>
        <Card day='Thursday'/>
        <Card day='Friday'/>
    </div>
  )
}

export default WorkoutPlan
