import { useState, useEffect, useRef } from 'react';
import './WorkoutPlan.css';
import Card from './Card.jsx';
import Spinner from 'react-bootstrap/Spinner';

function WorkoutPlan(props) {
  const URL = "http://localhost:8080/api/workout-plans"
  const [workoutPlanData, setWorkoutPlanData] = useState(null);
  const userId = useRef(props.userId||1);
  const planId = useRef(props.planId||1);
  

  const fetchUserWorkOuts = async () => {
    const url = `${URL}/user/${userId.current}`;
    console.log("id" + userId.current)

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
        setWorkoutPlanData(result[0] || result);
        planId.current = result[0].planId || result.planId
        console.log(planId.current);

      } else {
        console.error('Failed to fetch workout data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // Simulate the fetchUserWorkOuts call by setting the dummy data
  useEffect(() => {
    fetchUserWorkOuts();
  }, []);

  if (!workoutPlanData  || workoutPlanData.length <= 0) {
    return (
      <div className="spinner-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Spinner animation="border" role="status">
          </Spinner>
          <p style={{ color: 'white' }}>Fetching workout data...</p>
        </div>
        <hr style={{ width: '50%', borderColor: 'white', margin: '20px 0' }} />
        <p className="animated" style={{ color: 'red' }}>Make sure you have activated a plan!</p>
      </div>
    );
  }
  
  

  // Initialize all days of the week (1-indexed: Sunday=1, Monday=2, ..., Saturday=7)
  const allDays = {
    0: "Saturday",
    1: "Sunday", 
    2: "Monday", 
    3: "Tuesday", 
    4: "Wednesday", 
    5: "Thursday", 
    6: "Friday", 
  };

  // Map exercises to their respective days
  const exercisesByDay = workoutPlanData.exercises.reduce((acc, exercise) => {
    const dayName = exercise.day - 1;
    if (!acc[dayName]) {
      acc[dayName] = [];
    }
    acc[dayName].push(exercise);
    return acc;
  }, {});

  // Ensure all days have an entry (even if empty)
  const exercisesByDayWithAllDays = Object.keys(allDays).reduce((acc, dayId) => {
    if (!acc[dayId]) {
      acc[dayId] = [];
    }
    return acc;
  }, { ...exercisesByDay });

  const updateData = async (newExercise) => {
    try {
      const response = await fetch(`${URL}/${planId.current}/exercises?userId=${userId.current}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`
        },
        body: JSON.stringify(newExercise)
      });
  
      if (response.ok) {
        const addedExercise = await response.json();
        console.log(addedExercise)
        setWorkoutPlanData((prevData) => ({
          ...prevData,
          exercises: [...prevData.exercises, addedExercise],
        }));
        console.log(workoutPlanData);
      } else {
        console.error('Failed to add exercise');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };


  const modifyData = async (exerciseId, updatedExercise) => {
    try {
      const response = await fetch(`${URL}/exercises/${exerciseId}?userId=${userId.current}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`
        },
        body: JSON.stringify(updatedExercise)
      });
  
      if (response.ok) {
        const modifiedExercise = await response.json();
        setWorkoutPlanData((prevData) => {
          const updatedExercises = prevData.exercises.map(exercise =>
            exercise.id === exerciseId ? modifiedExercise : exercise
          );
          return { ...prevData, exercises: updatedExercises };
        });
        console.log(modifiedExercise);
      } else {
        console.error('Failed to modify exercise');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  
  
  const deleteData = async (exerciseId) => {
    try {
      const response = await fetch(`${URL}/exercises/${exerciseId}?userId=${userId.current}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`
        },
      });
  
      if (response.ok) {
        setWorkoutPlanData((prevData) => {
          const updatedData = { ...prevData };
          const exercises = updatedData.exercises.filter(exercise => exercise.id !== exerciseId);
          updatedData.exercises = exercises; // Ensure a new array is returned
          return updatedData;
        });
      } else {
        console.error('Failed to delete exercise');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  
  

  return (
    <div className="workout-plan-app">
      {Object.keys(exercisesByDayWithAllDays).map((dayId) => {
        const exercises = exercisesByDayWithAllDays[dayId];
        const planName = workoutPlanData.planName; // planName is the level
        const dayName = allDays[dayId]; // Get the day name from the `allDays` mapping

        return (
          <Card
            key={dayId}
            id={dayId}
            day={dayName}
            level={planName} // Setting level to planName
            data={{ exercises }}
            updateData={updateData}
            userJWT={props.userJWT}
            userId={userId}
            planId={planId}
            deleteData={deleteData}
            modifyData={modifyData}
          />
        );
      })}
    </div>
  );
}

export default WorkoutPlan;
