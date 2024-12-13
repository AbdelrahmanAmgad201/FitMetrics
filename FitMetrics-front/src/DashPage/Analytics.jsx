import React from "react";
import "./Analytics.css";

function Analytics() {
  const analyticsData = {
    carbohydrates: { value: 100, max: 300 },
    calories: { value: 1524, max: 2500 },
    protein: { value: 40, max: 100 },
  };

  const segments = [
    {
      label: "Carbohydrates",
      percentage: (analyticsData.carbohydrates.value / analyticsData.carbohydrates.max) * 100,
      color: "#007AFF",
      radius: 70,
    },
    {
      label: "Calories",
      percentage: (analyticsData.calories.value / analyticsData.calories.max) * 100,
      color: "#FFC542",
      radius: 55,
    },
    {
      label: "Protein",
      percentage: (analyticsData.protein.value / analyticsData.protein.max) * 100,
      color: "#4CD964",
      radius: 40,
    },
  ];

  return (
    <div className="analytics-container">
      <div className="chart-container">
        <svg viewBox="0 0 200 200" className="circular-chart">
          {segments.map((segment, index) => {
            const circumference = 2 * Math.PI * segment.radius;
            const dashArray = `${(segment.percentage / 100) * circumference} ${circumference}`;
            return (
              <circle
                key={index}
                className="chart-segment"
                cx="100"
                cy="100"
                r={segment.radius}
                fill="transparent"
                stroke={segment.color}
                strokeWidth="10"
                strokeDasharray={dashArray}
                strokeDashoffset={circumference / 4}
              />
            );
          })}
        </svg>
        <div className="legend">
          {segments.map((segment, index) => (
            <p key={index} style={{ color: segment.color }}>
              {segment.label}: {Math.round(segment.percentage)}%
            </p>
          ))}
        </div>
      </div>
      <div className="data-display">
        <p>
          <strong>Carbohydrates:</strong> {analyticsData.carbohydrates.value} /{" "}
          {analyticsData.carbohydrates.max} gm
        </p>
        <p>
          <strong>Calories:</strong> {analyticsData.calories.value} /{" "}
          {analyticsData.calories.max} cal
        </p>
        <p>
          <strong>Protein:</strong> {analyticsData.protein.value} /{" "}
          {analyticsData.protein.max} gm
        </p>
      </div>
    </div>
  );
}

export default Analytics;

// import React from "react";
// import "./Analytics.css";

// function Analytics() {
//   return <div className="analytic">Analytics</div>;
// }

// export default Analytics;
