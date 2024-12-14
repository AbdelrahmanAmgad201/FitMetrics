import React from "react";
import Analytics from "./Analytics";
import AddMeal from "./AddMeal";
import WorkoutList from "./WorkoutList";
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <Analytics userJWT={props.userJWT}/>
      <AddMeal userJWT={props.userJWT}/>
      <WorkoutList userJWT={props.userJWT}/>
    </div>
  );
}

export default Dashboard;
