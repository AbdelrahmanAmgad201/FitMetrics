import React, { useState, useEffect } from "react";
import "./nutrition_plans.css";

const NutritionPlans = (props) => {
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plansPerPage = 2;
  const totalPages = Math.ceil(plans.length / plansPerPage);

  const fetchNutritionPlans = async () => {
    fetch("http://localhost:8080/api/nutrition-plans/all") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setPlans(data))
      .catch((error) => console.error("Error fetching nutrition plans:", error));
  };

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

  const handleActivatePlan = async (plan) => {
    console.log(plan.planId);

    await fetch(`http://localhost:8080/api/nutrition-plans/duplicate?planId=${plan.planId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${props.userJWT.current}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Duplicated Nutrition Plan:", data);
      })
      .catch((error) => console.error("Error duplicating nutrition plan:", error));
  };

  // Fetch nutrition plans on component mount
  useEffect(() => {
    fetchNutritionPlans();
  }, []);

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

                <button
                  className="activate-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card selection when clicking the button
                    handleActivatePlan(plan); // Activate plan on button click
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
