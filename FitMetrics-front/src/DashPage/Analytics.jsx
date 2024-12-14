import React, { useEffect, useState, useRef } from "react";
import "./Analytics.css";

function Analytics(props) {
  const [segments, setSegments] = useState([
    {
      label: "Carbohydrates",
      percentage: 0,
      color: "#007AFF",
      radius: 70,
    },
    {
      label: "Calories",
      percentage: 0,
      color: "#FFC542",
      radius: 55,
    },
    {
      label: "Protein",
      percentage: 0,
      color: "#4CD964",
      radius: 40,
    },
  ]);

  const analyticsData = useRef({
    carbohydrates: { value: 0, max: 300 },
    calories: { value: 0, max: 2500 },
    protein: { value: 0, max: 100 },
  })

  useEffect(() => {
    let analyticsData2 = {
      carbohydrates: { value: 0, max: 300 },
      calories: { value: 0, max: 2500 },
      protein: { value: 0, max: 100 },
    };

    props.meals.current.forEach((item) => {
      analyticsData2.carbohydrates.value += item.carbohydrates;
      analyticsData2.calories.value += item.energy;
      analyticsData2.protein.value += item.protein;
    });

    // Update the segments state
    setSegments([
      {
        label: "Carbohydrates",
        percentage:
          (analyticsData2.carbohydrates.value / analyticsData2.carbohydrates.max) * 100,
        color: "#007AFF",
        radius: 70,
      },
      {
        label: "Calories",
        percentage:
          (analyticsData2.calories.value / analyticsData2.calories.max) * 100,
        color: "#FFC542",
        radius: 55,
      },
      {
        label: "Protein",
        percentage:
          (analyticsData2.protein.value / analyticsData2.protein.max) * 100,
        color: "#4CD964",
        radius: 40,
      },
    ]);
    analyticsData.current = analyticsData2
  }, [props.meals.current]); // Trigger useEffect when props.meals.current changes

  return (
    <div className="analytics-container">
      <div className="chart-container">
        <svg viewBox="0 0 200 200" className="circular-chart">
          {segments.map((segment, index) => {
            const circumference = 2 * Math.PI * segment.radius; // Calculate circumference
            const dashArray = `${(segment.percentage / 100) * circumference} ${circumference}`;
            const dashOffset = 0; // Adjust offset for shrinking

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
                strokeDashoffset={dashOffset} // Set dynamic offset
                transform="rotate(-90 100 100)" // Rotate the circle so it starts at the top
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
          <strong>Carbohydrates:</strong> {analyticsData.current.carbohydrates.value.toFixed(0)} /{" "}
          300 gm
        </p>
        <p>
          <strong>Calories:</strong> {analyticsData.current.calories.value.toFixed(0)} /{" "}
          2500 cal
        </p>
        <p>
          <strong>Protein:</strong> {analyticsData.current.protein.value.toFixed(0)} /{" "}
          100 gm
        </p>
      </div>
    </div>
  );
}

export default Analytics;
