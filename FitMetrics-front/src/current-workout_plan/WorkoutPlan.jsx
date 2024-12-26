import { useState, useEffect } from 'react';
import './WorkoutPlan.css';
import Card from './Card.jsx';
import Spinner from 'react-bootstrap/Spinner';

function WorkoutPlan(props) {
  const [workoutPlanData, setWorkoutPlanData] = useState(null);
  const idToDay = (id) => {
    const days = [
      "Saturday", "Sunday", "Monday", "Tuesday", 
      "Wednesday", "Thursday", "Friday"
    ];
    return days[id];
  };
  

useEffect(() => {
  // Simulate API call to fetch data with a 3-second delay
  const timeout = setTimeout(() => {
    const data = {
      Saturday: {
        level: "Beginner",
        exercises: [
          { exerciseId: 0, exerciseName: "Incline push-up", reps: 8, sets: 3 },
          { exerciseId: 0,exerciseName: "Chest Dip", reps: 8, sets: 3 },
          { exerciseId: 0,exerciseName: "Standing fly", reps: 8, sets: 3 },
          { exerciseId: 0,exerciseName: "Side plank", reps: 8, sets: 3 }
        ]
      },
      Sunday: {
        level: "Rest day",
        exercises: []
      },
      Monday: {
        level: "Intermediate",
        exercises: [
          { exerciseId: 0,exerciseName: "Push-ups", reps: 10, sets: 4 },
          { exerciseId: 0,exerciseName: "Bench press", reps: 10, sets: 4 },
          { exerciseId: 0,exerciseName: "Bicep curls", reps: 10, sets: 4 },
          { exerciseId: 0,exerciseName: "Plank", reps: 1, sets: 1 }
        ]
      },
      Tuesday: {
        level: "Advanced",
        exercises: [
          { exerciseId: 0,exerciseName: "Pull-ups", reps: 12, sets: 5 },
          { exerciseId: 0,exerciseName: "Deadlift", reps: 10, sets: 5 },
          { exerciseId: 0,exerciseName: "Squats", reps: 15, sets: 5 },
          { exerciseId: 0,exerciseName: "Leg raises", reps: 12, sets: 5 }
        ]
      },
      Wednesday: {
        level: "Rest day",
        exercises: []
      },
      Thursday: {
        level: "Intermediate",
        exercises: [
          { exerciseId: 0,exerciseName: "Push-ups", reps: 15, sets: 4 },
          { exerciseId: 0,exerciseName: "Shoulder press", reps: 12, sets: 4 },
          { exerciseId: 0,exerciseName: "Crunches", reps: 20, sets: 4 },
          { exerciseId: 0,exerciseName: "Mountain climbers", reps: 20, sets: 4 }
        ]
      },
      Friday: {
        level: "Intermediate",
        exercises: [
          { exerciseId: 0,exerciseName: "Push-ups", reps: 15, sets: 4 },
          { exerciseId: 0,exerciseName: "Shoulder press", reps: 12, sets: 4 },
          { exerciseId: 0,exerciseName: "Crunches", reps: 20, sets: 4 },
          { exerciseId: 0,exerciseName: "Mountain climbers", reps: 20, sets: 4 }
        ]
      }
    };

    setWorkoutPlanData(data);
  }, 1000);

  // Cleanup timeout when component is unmounted
  return () => clearTimeout(timeout);
}, []);


  if (!workoutPlanData) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const updateData = (id, newExercise) => {
    const day = idToDay(id);
    setWorkoutPlanData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[day].exercises.push(newExercise);
      console.log(updateData)
      return updatedData;
    });
  };
  
  return (
    <div className="workout-plan-app">
      <Card id={0} day="Saturday" data={workoutPlanData.Saturday} updateData={updateData} />
      <Card id={1} day="Sunday" data={workoutPlanData.Sunday} updateData={updateData}/>
      <Card id={2} day="Monday" data={workoutPlanData.Monday} updateData={updateData}/>
      <Card id={3} day="Tuesday" data={workoutPlanData.Tuesday} updateData={updateData}/>
      <Card id={4} day="Wednesday" data={workoutPlanData.Wednesday} updateData={updateData}/>
      <Card id={5} day="Thursday" data={workoutPlanData.Thursday} updateData={updateData}/>
      <Card id={6} day="Friday" data={workoutPlanData.Friday} updateData={updateData}/>
    </div>
  );
}

export default WorkoutPlan;
