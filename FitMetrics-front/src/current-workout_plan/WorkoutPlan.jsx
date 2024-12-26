import { useState, useEffect, useRef } from 'react';
import './WorkoutPlan.css';
import Card from './Card.jsx';
import Spinner from 'react-bootstrap/Spinner';

function WorkoutPlan(props) {
  const [workoutPlanData, setWorkoutPlanData] = useState(null);
  const userId = useRef(1);
  const planId = useRef(1);

  const idToDay = (id) => {
    const days = [
      "Saturday", "Sunday", "Monday", "Tuesday", 
      "Wednesday", "Thursday", "Friday"
    ];
    return days[id];
  };
  

  const fetchUserWorkOuts = async () => {
    const url = `http://localhost:8080/api/workout-plans/user/${userId.current}`;
    let data;

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
        console.log(result);

        //setWorkoutPlanData(result);

      } else {
        console.error('Failed to fetch workout data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    // Simulate API call to fetch data with a 3-second delay
    fetchUserWorkOuts();

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

  const updateData = (dayId, newExercise) => {
    const day = idToDay(dayId);
    setWorkoutPlanData((prevData) => {
      const updatedData = { ...prevData };
  
      // Check if the exercise already exists based on the exerciseName
      const exerciseExists = updatedData[day].exercises.some(
        (exercise) => exercise.exerciseName === newExercise.exerciseName
      );
  
      // Only add the exercise if it doesn't already exist
      if (!exerciseExists) {
        updatedData[day].exercises.push(newExercise);
      } else {
        console.log("Exercise already exists, not adding:", newExercise.exerciseName);
      }
  
      console.log(updatedData);
      return updatedData;
    });
  };
  

  const deleteData = (dayId, oldExerciseIndex) => {
    const day = idToDay(dayId);
    setWorkoutPlanData((prevData) => {
      const updatedData = { ...prevData };
      const exercises = updatedData[day].exercises;
      
      // Remove exercise by index directly
      exercises.splice(oldExerciseIndex, 1); // Removes one exercise at the specified index
  
      // Return the updated state
      updatedData[day].exercises = [...exercises]; // Make sure to update the state with a new array
      return updatedData;
    });
  };
  
  
  
  
  
  
  return (
    <div className="workout-plan-app">
      <Card id={0} day="Saturday" data={workoutPlanData.Saturday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
      <Card id={1} day="Sunday" data={workoutPlanData.Sunday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
      <Card id={2} day="Monday" data={workoutPlanData.Monday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
      <Card id={3} day="Tuesday" data={workoutPlanData.Tuesday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
      <Card id={4} day="Wednesday" data={workoutPlanData.Wednesday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
      <Card id={5} day="Thursday" data={workoutPlanData.Thursday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
      <Card id={6} day="Friday" data={workoutPlanData.Friday} updateData={updateData} userJWT={props.userJWT} userId = {userId} planId = {planId} deleteData={deleteData}/>
    </div>
  );
}

export default WorkoutPlan;
