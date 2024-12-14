import React from "react";
import { useRef, useState } from "react";
import Analytics from "./Analytics";
import AddMeal from "./AddMeal";
import WorkoutList from "./WorkoutList";
import "./Dashboard.css";

function Dashboard(props) {
  const meals = useRef([])
  const [, setRender] = useState(0);
  const forceRender = () => {
    setRender((prev) => prev + 1); // Update state to trigger re-render
  };

  return (
    <div className="dashboard-container">
      <Analytics userJWT={props.userJWT} meals={meals}/>
      <AddMeal userJWT={props.userJWT} meals={meals} render={forceRender}/>
      <WorkoutList userJWT={props.userJWT}/>
    </div>
  );
}

export default Dashboard;
