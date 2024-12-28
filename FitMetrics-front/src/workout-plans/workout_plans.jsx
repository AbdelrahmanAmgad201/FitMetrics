import React, { useState, useEffect } from "react";
import "./workout-plans.css";

const Workout_plans = (props) => {
  const dayMapping = {
    1: "Saturday",
    2: "Sunday",
    3: "Monday",
    4: "Tuesday",
    5: "Wednesday",
    6: "Thursday",
    7: "Friday",
  };

  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plansPerPage = 2;
  const totalPages = Math.ceil(plans.length / plansPerPage);

  const fetchWorkoutPlans = () => {
    fetch("http://localhost:8080/api/workout-plans/builtIn", {
      method: "GET", // Explicitly specifying the GET method
    })
      .then((response) => response.json())
      .then((data) =>{
        console.log(data) 
        setPlans(data)})
      .catch((error) => console.error("Error fetching workout plans:", error));
  };

  // Use effect to load workout plans initially
  useEffect(() => {
    fetchWorkoutPlans(); // Automatically fetch workout plans on component mount
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentPlans = plans.slice(
    (currentPage - 1) * plansPerPage,
    currentPage * plansPerPage
  );

  const handleActivatePlan = (plan) => {

    fetch(`http://localhost:8080/api/workout-plans/${plan.planId}/copy`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${props.userJWT.current}`, // Pass the token in the header
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Copied Plan:", data);
      })
      .catch((error) => console.error("Error copying workout plan:", error));
  };

  return (
    <div className="app-container">
      <h1>Week Plans</h1>
      <div className={`blurred-background ${selectedPlan ? "blurred" : ""}`}>
        <div className="cards-container">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="arrow-button"
          >
            ◀
          </button>

          <div className="plans-container">
            {currentPlans.map((plan) => (
              <div
                key={plan.planId}
                className={`plan-card ${selectedPlan && selectedPlan.planId !== plan.planId ? "blurred" : ""}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3>{plan.planName}</h3>
                <p>{plan.description}</p>

                <button
                  className="activate-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card selection when clicking the button
                    handleActivatePlan(plan);
                  }}
                >
                  Activate Plan
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="arrow-button"
          >
            ▶
          </button>
        </div>

        <div className="pagination-dots">
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={`dot ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            ></div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{selectedPlan.planName}</h2>
            {Object.entries(
              selectedPlan.exercises.reduce((acc, exercise) => {
                const dayName = dayMapping[exercise.day] || "Unknown Day";
                if (!acc[dayName]) acc[dayName] = [];
                acc[dayName].push(exercise);
                return acc;
              }, {})
            ).map(([day, exercises]) => (
              <div key={day}>
                <h3>{day}</h3>
                <ul>
                  {exercises.map((exercise) => (
                    <li key={exercise.id}>{exercise.exerciseName}</li>
                  ))}
                </ul>
              </div>
            ))}
            <button className="close-button" onClick={() => setSelectedPlan(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout_plans;
