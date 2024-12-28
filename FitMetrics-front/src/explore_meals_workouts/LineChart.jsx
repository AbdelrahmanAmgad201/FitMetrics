import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './explore_meals_workouts.css'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { color } from 'chart.js/helpers';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const LineChart = ({setShowWorkoutMenu, workoutName, userJWT}) => {
  const startDate = useRef(null)
  const endDate = useRef(null)

  const [dataLabels, setDataLabels] = useState([])
  const [dataY, setDataY] = useState([])

  const getWorkoutDetails = async (date1, date2) => {
    console.log(date1, date2, workoutName)
    const url = `http://localhost:8080/api/exercise-history?exerciseName=${workoutName}&startDate=${date1}&endDate=${date2}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userJWT.current}`
        }
      });
      
      if (response.ok) {
        const result = await response.json()
        console.log(result)
        let tmpLabels = []
        let tmpDataY = []
        for (let i = 0; i < result.length; i++){
          tmpLabels.push(result[i].date)
          tmpDataY.push(result[i].sets * result[i].reps)
        }
        setDataLabels(tmpLabels)
        setDataY(tmpDataY)
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'Total Reps',
        data: dataY,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: '#ddd',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        fill: true, // Fill under the line
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#ccc',
        },
        ticks: {
          color: '#ccc',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Reps',
          color: '#ccc',
        },
        ticks: {
          color: '#ccc',
        },
      },
    },
  };

  const plotGraph = ()=>{
    const date1 = startDate.current.value
    const date2 = endDate.current.value
    console.log(date1, date2)
    console.log(userJWT.current)
    getWorkoutDetails(date1, date2)
  }

  return (
    <div className='workout-plot'>
      <div className='exit-plot'>
        <button onClick={()=>{
            setShowWorkoutMenu(false)
        }}>X</button>
      </div>
      <div className='plot-input'>
        <div className='plot-input-field'>
          <div>Start date</div>
          <input ref={startDate} type='date'/>
        </div>
        <div className='plot-input-field'>
          <div>End date</div>
          <input ref={endDate} type='date'/>
        </div>
      </div>
      <div className='plot-btn'>
        <button className='plot-workout-data' onClick={async ()=>{
          plotGraph()
        }}>Plot Data</button>
      </div>
      <Line className='line-plot' data={data} options={options}/>
    </div>
  )
};

export default LineChart;
