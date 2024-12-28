import { useState, useEffect, useRef } from 'react';
import './nutrition-plan.css';
import Card from './Card.jsx';
import Spinner from 'react-bootstrap/Spinner';

function Nutrition_plan(props) {
  const URL = "http://localhost:8080/api/nutrition-plans";
  const [nutritionPlanData, setnutritionPlanData] = useState(null);
  const planId = useRef(props.planId||1);

  const fetchUserNutritionData = async () => {
    const url = `${URL}/user`;

    let data;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setnutritionPlanData(result[0] || result);
        planId.current = result[0].planId || result.planId
        console.log(planId.current);


      } else {
        console.error('Failed to fetch nutrition data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchUserNutritionData();
  }, []);

  if (!nutritionPlanData || nutritionPlanData.length <= 0) {
    return (
      <div className="spinner-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Spinner animation="border" role="status">
          </Spinner>
          <p style={{ color: 'white' }}>Fetching nutrition data...</p>
        </div>
        <hr style={{ width: '50%', borderColor: 'white', margin: '20px 0' }} />
        <p className="animated" style={{ color: 'red' }}>Make sure you have activated a plan!</p>
      </div>
    );
  }


  const modifyData = async (updatedNutrition) => {
    try {
      const response = await fetch(`${URL}/${planId.current}/customize`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJWT.current}`
        },
        body: JSON.stringify(updatedNutrition)
      });

      if (response.ok) {
        const modifiedNutrition = await response.json();
        console.log(modifiedNutrition);

        setnutritionPlanData(modifiedNutrition);
      } else {
        console.error('Failed to modify exercise');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };


  return (
    <div className="nutrition-plan-app">
      <Card
        key="workout-plan-card"
        id={0}
        day="Nutrition plan"
        level={nutritionPlanData.planName} // Set level to planName
        data={nutritionPlanData}
        userJWT={props.userJWT}
        planId={planId}
        modifyData={modifyData}
      />
    </div>
  );
}

export default Nutrition_plan;
