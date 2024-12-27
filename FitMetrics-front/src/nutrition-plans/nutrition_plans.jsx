import React, { useState } from "react";
import "./nutrition_plans.css";

const NutritionPlans = () => {
  const plans = [
    {
      planId: 1,
      planName: "Bulking Plan",
      description: "High-calorie plan designed for muscle growth.",
      calories: 3500.0,
      protein: 175.0,
      carbohydrates: 450.0,
    },
    {
      planId: 2,
      planName: "Cutting Plan",
      description: "Low-calorie plan for fat loss while preserving muscle.",
      calories: 2000.0,
      protein: 150.0,
      carbohydrates: 200.0,
    },
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

  return (
    <div className="app-container">
      <h1>Nutrition Plans</h1>
      <div
        className={`blurred-background ${selectedPlan ? "blurred" : ""}`}
      >
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
                className={`plan-card ${
                  selectedPlan && selectedPlan.planId !== plan.planId
                    ? "blurred"
                    : ""
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3>{plan.planName}</h3>
                <p>{plan.description}</p>
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
              className={`dot ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            ></div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{selectedPlan.planName}</h2>
            <ul>
              <li><strong>Calories:</strong> {selectedPlan.calories}</li>
              <li><strong>Protein:</strong> {selectedPlan.protein}</li>
              <li><strong>Carbohydrates:</strong> {selectedPlan.carbohydrates}</li>
            </ul>
            <button
              className="close-button"
              onClick={() => setSelectedPlan(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPlans;
