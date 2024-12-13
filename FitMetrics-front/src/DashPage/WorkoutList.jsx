import React, { useState, useEffect } from "react";
import "./WorkoutList.css";

function WorkoutList() {
  const [workoutList, setWorkoutList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const fetchWorkouts = () => {
    const data = [
      "Push-ups",
      "Squats",
      "Lunges",
      "Plank",
      "Burpees",
      "Mountain Climbers",
    ];
    setWorkoutList(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleCheckboxChange = () => {
    const allChecked = workoutList.every(
      (workout) => document.getElementById(workout).checked
    );
    setAllChecked(allChecked);
  };

  return (
    <div className="workoutList">
      <h2 className="title">Today's Workout</h2>
      <div className="workoutItems">
        {workoutList.map((workout, index) => (
          <div key={index} className="workoutItem">
            <input 
              type="checkbox" 
              id={workout} 
              onChange={handleCheckboxChange} 
            />
            <label htmlFor={workout}>{workout}</label>
          </div>
        ))}
      </div>
      
      {allChecked && (
        <div className="congratulations-message">
          Congratulations! <br />  You finished all your workouts for today! 🎉
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
