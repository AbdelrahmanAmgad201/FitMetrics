import React, { useState, useEffect } from "react";
import "./WorkoutList.css";
import Spinner from 'react-bootstrap/Spinner';

function WorkoutList(props) {
  const [workoutList, setWorkoutList] = useState(null);
  const [checkedWorkouts, setCheckedWorkouts] = useState(new Set()); // To track checked workouts

  // Map exercises to their respective days
  const exercisesByDay = (exercises) => {
    return exercises.reduce((acc, exercise) => {
      const dayName = exercise.day - 1;
      if (!acc[dayName]) {
        acc[dayName] = [];
      }
      acc[dayName].push(exercise);
      return acc;
    }, {});
  };

  const fetchUserWorkOuts = async () => {
    const url = `http://localhost:8080/api/workout-plans/user`;

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
        const groupedExercises = exercisesByDay(result[0].exercises || result.exercises);
        const today = new Date();
        const dayOfWeek = today.getDay();
        const adjustedDayOfWeek = (dayOfWeek + 1) % 7;
        setWorkoutList(groupedExercises[adjustedDayOfWeek] || []);
      } else {
        console.error('Failed to fetch workout data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const fetchDay = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
  
    try {
      const response = await fetch("http://localhost:8080/calender/all-day-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.userJWT.current}`,
        },
        body: JSON.stringify({ date: formattedDate }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch day data');
      }
  
      const data = await response.json();
      console.log(data[0]);
      return data[0];  // Assuming data[0] is a list of checked workouts
    } catch (error) {
      console.error('Error fetching day data:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchUserWorkOuts();
    const getCheckedWorkouts = async () => {
      const checked = await fetchDay();
      const checkedNames = new Set(checked.map(workout => workout.exerciseName));
      setCheckedWorkouts(checkedNames);  // Update checked workouts state
    };
    getCheckedWorkouts();
  }, []);

  const handleCheckboxChange = async (workout) => {
    if(checkedWorkouts.has(workout.exerciseName)){
      return
    }
    const { exerciseName, sets, reps } = workout;

    // Construct query parameters
    const queryParams = new URLSearchParams({
      exerciseName,
      sets: parseInt(sets).toString(),
      reps: parseInt(reps).toString(),
    });

    try {
      const url = `http://localhost:8080/api/exercise-history/save?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`,
        },
      });

      if (response.ok) {
        const savedHistory = await response.json();
        console.log('Exercise history saved:', savedHistory);
      } else {
        console.error('Failed to save exercise history');
      }
    } catch (error) {
      console.error('Error saving exercise history:', error);
    }

    // Add this workout to the checkedWorkouts set
    setCheckedWorkouts(prevChecked => new Set(prevChecked.add(workout.exerciseName)));
  };

  return (
    <div className="workoutList">
      <h2 className="title">Today's Workout</h2>
      <div className="workoutItems">
        {!workoutList ? (
          <div className="loading-container">
            <Spinner animation="border" role="status" className="spinner" />
            <strong className="loading-text">Loading</strong>
          </div>
        ) : workoutList.length > 0 ? (
          workoutList.map((workout, index) => (
            <div key={index} className="workoutItem">
              <input
                type="checkbox"
                id={workout.exerciseName} // Use exerciseName as ID for uniqueness
                onChange={() => handleCheckboxChange(workout)}
                checked={checkedWorkouts.has(workout.exerciseName)} // Only checked if it's in checkedWorkouts
              />
              <label htmlFor={workout.exerciseName}>{workout.exerciseName}</label>
            </div>
          ))
        ) : (
          <img
            src="rest.png"
            alt="Rest Icon"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  );
}

export default WorkoutList;
