import React, { useState } from "react";
import "./workout-plans.css";

const Workout_plans = () => {
  const dayMapping = {
    1: "Saturday",
    2: "Sunday",
    3: "Monday",
    4: "Tuesday",
    5: "Wednesday",
    6: "Thursday",
    7: "Friday",
  };

  const plans = [
    
      {
          "planId": 1,
          "planName": "Push Pull Legs Plan",
          "description": "A weekly workout plan targeting push, pull, and leg exercises.",
          "exercises": [
              {
                  "id": 1,
                  "exerciseName": "Barbell_Bench_Press_-_Medium_Grip",
                  "exerciseId": "Barbell_Bench_Press_-_Medium_Grip",
                  "day": 1
              },
              {
                  "id": 2,
                  "exerciseName": "Arnold_Dumbbell_Press",
                  "exerciseId": "Arnold_Dumbbell_Press",
                  "day": 1
              },
              {
                  "id": 3,
                  "exerciseName": "Barbell_Incline_Bench_Press_-_Medium_Grip",
                  "exerciseId": "Barbell_Incline_Bench_Press_-_Medium_Grip",
                  "day": 1
              },
              {
                  "id": 4,
                  "exerciseName": "Alternating_Cable_Shoulder_Press",
                  "exerciseId": "Alternating_Cable_Shoulder_Press",
                  "day": 1
              },
              {
                  "id": 5,
                  "exerciseName": "Barbell_Rear_Delt_Row",
                  "exerciseId": "Barbell_Rear_Delt_Row",
                  "day": 2
              },
              {
                  "id": 6,
                  "exerciseName": "Alternating_Kettlebell_Row",
                  "exerciseId": "Alternating_Kettlebell_Row",
                  "day": 2
              },
              {
                  "id": 7,
                  "exerciseName": "Barbell_Shrug",
                  "exerciseId": "Barbell_Shrug",
                  "day": 2
              },
              {
                  "id": 8,
                  "exerciseName": "Ab_Roller",
                  "exerciseId": "Ab_Roller",
                  "day": 2
              },
              {
                  "id": 9,
                  "exerciseName": "Barbell_Full_Squat",
                  "exerciseId": "Barbell_Full_Squat",
                  "day": 3
              },
              {
                  "id": 10,
                  "exerciseName": "Barbell_Lunge",
                  "exerciseId": "Barbell_Lunge",
                  "day": 3
              },
              {
                  "id": 11,
                  "exerciseName": "Barbell_Step_Ups",
                  "exerciseId": "Barbell_Step_Ups",
                  "day": 3
              },
              {
                  "id": 12,
                  "exerciseName": "90_90_Hamstring",
                  "exerciseId": "90_90_Hamstring",
                  "day": 3
              },
              {
                  "id": 13,
                  "exerciseName": "Advanced_Kettlebell_Windmill",
                  "exerciseId": "Advanced_Kettlebell_Windmill",
                  "day": 5
              },
              {
                  "id": 14,
                  "exerciseName": "Alternating_Deltoid_Raise",
                  "exerciseId": "Alternating_Deltoid_Raise",
                  "day": 5
              },
              {
                  "id": 15,
                  "exerciseName": "Barbell_Incline_Shoulder_Raise",
                  "exerciseId": "Barbell_Incline_Shoulder_Raise",
                  "day": 5
              },
              {
                  "id": 16,
                  "exerciseName": "Anti-Gravity_Press",
                  "exerciseId": "Anti-Gravity_Press",
                  "day": 5
              },
              {
                  "id": 17,
                  "exerciseName": "Barbell_Deadlift",
                  "exerciseId": "Barbell_Deadlift",
                  "day": 6
              },
              {
                  "id": 18,
                  "exerciseName": "Barbell_Rollout_from_Bench",
                  "exerciseId": "Barbell_Rollout_from_Bench",
                  "day": 6
              },
              {
                  "id": 19,
                  "exerciseName": "Alternate_Heel_Touchers",
                  "exerciseId": "Alternate_Heel_Touchers",
                  "day": 6
              },
              {
                  "id": 20,
                  "exerciseName": "Barbell_Shrug_Behind_The_Back",
                  "exerciseId": "Barbell_Shrug_Behind_The_Back",
                  "day": 6
              },
              {
                  "id": 21,
                  "exerciseName": "Barbell_Hack_Squat",
                  "exerciseId": "Barbell_Hack_Squat",
                  "day": 7
              },
              {
                  "id": 22,
                  "exerciseName": "Barbell_Glute_Bridge",
                  "exerciseId": "Barbell_Glute_Bridge",
                  "day": 7
              },
              {
                  "id": 23,
                  "exerciseName": "Band_Good_Morning_Pull_Through",
                  "exerciseId": "Band_Good_Morning_Pull_Through",
                  "day": 7
              },
              {
                  "id": 24,
                  "exerciseName": "Barbell_Seated_Calf_Raise",
                  "exerciseId": "Barbell_Seated_Calf_Raise",
                  "day": 7
              }
          ]
      },
      {
          "planId": 2,
          "planName": "Full-Body Weekly Plan",
          "description": "A balanced weekly workout plan focusing on strength, core, power, and mobility.",
          "exercises": [
              {
                  "id": 25,
                  "exerciseName": "Barbell_Deadlift",
                  "exerciseId": "Barbell_Deadlift",
                  "day": 1
              },
              {
                  "id": 26,
                  "exerciseName": "Barbell_Bench_Press_-_Medium_Grip",
                  "exerciseId": "Barbell_Bench_Press_-_Medium_Grip",
                  "day": 1
              },
              {
                  "id": 27,
                  "exerciseName": "Barbell_Incline_Shoulder_Raise",
                  "exerciseId": "Barbell_Incline_Shoulder_Raise",
                  "day": 1
              },
              {
                  "id": 28,
                  "exerciseName": "Ab_Roller",
                  "exerciseId": "Ab_Roller",
                  "day": 1
              },
              {
                  "id": 29,
                  "exerciseName": "90_90_Hamstring",
                  "exerciseId": "90_90_Hamstring",
                  "day": 2
              },
              {
                  "id": 30,
                  "exerciseName": "Band_Good_Morning_Pull_Through",
                  "exerciseId": "Band_Good_Morning_Pull_Through",
                  "day": 2
              },
              {
                  "id": 31,
                  "exerciseName": "Advanced_Kettlebell_Windmill",
                  "exerciseId": "Advanced_Kettlebell_Windmill",
                  "day": 2
              },
              {
                  "id": 32,
                  "exerciseName": "Plank_Arm_Lift",
                  "exerciseId": "Plank_Arm_Lift",
                  "day": 2
              },
              {
                  "id": 33,
                  "exerciseName": "Arnold_Dumbbell_Press",
                  "exerciseId": "Arnold_Dumbbell_Press",
                  "day": 3
              },
              {
                  "id": 34,
                  "exerciseName": "Barbell_Rear_Delt_Row",
                  "exerciseId": "Barbell_Rear_Delt_Row",
                  "day": 3
              },
              {
                  "id": 35,
                  "exerciseName": "Barbell_Curl",
                  "exerciseId": "Barbell_Curl",
                  "day": 3
              },
              {
                  "id": 36,
                  "exerciseName": "Alternating_Cable_Shoulder_Press",
                  "exerciseId": "Alternating_Cable_Shoulder_Press",
                  "day": 3
              },
              {
                  "id": 37,
                  "exerciseName": "Barbell_Hack_Squat",
                  "exerciseId": "Barbell_Hack_Squat",
                  "day": 5
              },
              {
                  "id": 38,
                  "exerciseName": "Barbell_Step_Ups",
                  "exerciseId": "Barbell_Step_Ups",
                  "day": 5
              },
              {
                  "id": 39,
                  "exerciseName": "Barbell_Seated_Calf_Raise",
                  "exerciseId": "Barbell_Seated_Calf_Raise",
                  "day": 5
              },
              {
                  "id": 40,
                  "exerciseName": "Alternate_Leg_Diagonal_Bound",
                  "exerciseId": "Alternate_Leg_Diagonal_Bound",
                  "day": 5
              },
              {
                  "id": 41,
                  "exerciseName": "Atlas_Stone_Trainer",
                  "exerciseId": "Atlas_Stone_Trainer",
                  "day": 6
              },
              {
                  "id": 42,
                  "exerciseName": "Band_Hip_Adductions",
                  "exerciseId": "Band_Hip_Adductions",
                  "day": 6
              },
              {
                  "id": 43,
                  "exerciseName": "Barbell_Shrug_Behind_The_Back",
                  "exerciseId": "Barbell_Shrug_Behind_The_Back",
                  "day": 6
              },
              {
                  "id": 44,
                  "exerciseName": "Battling_Ropes",
                  "exerciseId": "Battling_Ropes",
                  "day": 6
              },
              {
                  "id": 45,
                  "exerciseName": "Arm_Circles",
                  "exerciseId": "Arm_Circles",
                  "day": 7
              },
              {
                  "id": 46,
                  "exerciseName": "90_90_Hamstring",
                  "exerciseId": "90_90_Hamstring",
                  "day": 7
              },
              {
                  "id": 47,
                  "exerciseName": "Barbell_Side_Bend",
                  "exerciseId": "Barbell_Side_Bend",
                  "day": 7
              },
              {
                  "id": 48,
                  "exerciseName": "Ankle_Circles",
                  "exerciseId": "Ankle_Circles",
                  "day": 7
              }
          ]
      }
  ];

  const plansPerPage = 2; 
  const totalPages = Math.ceil(plans.length / plansPerPage); 
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
    // Handle plan activation logic here
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
