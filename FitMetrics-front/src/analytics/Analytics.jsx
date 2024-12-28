import { useState, useRef, useEffect } from "react"
import './analytics.css'
import { Line } from 'react-chartjs-2';

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

function Analytics({userJWT}) {
    const startDate = useRef(null)
    const endDate = useRef(null)

    const [dataLabels, setDataLabels] = useState([])
    const [dataY, setDataY] = useState([])

    const [selectedOption, setSelectedOption] = useState('protein');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    
    const getFoodDetails = async (date1, date2) => {
        console.log(date1, date2)
        const url = `http://localhost:8080/calender/graph?start_date=${date1}&end_date=${date2}&type=${selectedOption}`
        console.log(url)
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
                const dates = [];
                const numbers = [];
                result.forEach((item) => {
                    const [date, number] = Object.entries(item)[0]; // Get the first key-value pair
                    dates.push(date);
                    numbers.push(number);
                });
                setDataLabels(dates)
                setDataY(numbers)
            }
        } catch (error) {
            console.error('Network error:', error);
        }
      };
    
    const data = {
        labels: dataLabels,
        datasets: [
          {
            label: selectedOption,
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
                font: {
                    size: 20,
                },
            },
            ticks: {
                color: '#ccc',
                font: {
                    size: 16,
                },
            },
            },
            y: {
            title: {
                display: true,
                text: selectedOption,
                color: '#ccc',
                font: {
                    size: 20,
                },
            },
            ticks: {
                color: '#ccc',
                font: {
                    size: 16,
                },
            },
            },
        },
    };
    
    const plotGraph = ()=>{
        const date1 = startDate.current.value
        const date2 = endDate.current.value
        console.log(date1, date2)
        console.log(userJWT.current)
        getFoodDetails(date1, date2)
    }
    
    return (
        <div className="analytics-plot-container">
            <div className='analytics-plot'>
                <div className='plot-input'>
                <select
                    className="select-type"
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="protein">protein</option>
                    <option value="energy">energy</option>
                    <option value="carbohydrates">carbohydrates</option>
                </select>
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
        </div>
    )
}

export default Analytics