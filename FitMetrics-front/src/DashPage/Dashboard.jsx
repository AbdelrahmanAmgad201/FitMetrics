import React from "react";
import Analytics from "./Analytics";
import AddMeal from "./AddMeal";
import WorkoutList from "./WorkoutList";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <Analytics />
      <AddMeal />
      <WorkoutList />
    </div>
  );
}

export default Dashboard;
