import {useState, useEffect, useRef} from 'react'
import './explore_meals_workouts.css'
import Spinner from 'react-bootstrap/Spinner'

function Explore_meals() {

    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const searchInput = useRef(null)

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const getMealDetails = async (id) => {
        const url = 'http://localhost:8080/food/' + id
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const result = await response.json()
                console.log(result)
            }
        } catch (error) {
            console.error('Network error:', error)
        }
    }

    const removeDuplicates = async () => {
        const uniqueMeals = searchResults.filter((meal, index, self) => 
            index === self.findIndex((m) => (
            m.foodName === meal.foodName
            ))
        );
        await setSearchResults(uniqueMeals)
    }

    const fetchMeals = async (query) => {
        const url = 'http://localhost:8080/search?query=' + query
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const result = await response.json();
                await setSearchResults(result)
                await removeDuplicates()
                console.log(searchResults)
            }
        } catch (error) {
            console.error('Network error:', error);
        }
        
    }

    return (
        <div className='explore-workouts-main'>
            <div className='explore-workouts-body'>
                <div className='workout-title'>Explore Workouts</div>
                <div className='searchbar-container'>
                    <div className='searchbar'>
                        <input ref={searchInput} type='text' />
                        <button onClick={async ()=>{
                            console.log(searchInput.current.value)
                            setIsLoading(true)
                            await fetchMeals(searchInput.current.value)
                            setIsLoading(false)
                        }}>
                            <img src='src/assets/loupe.png'/>
                        </button>
                    </div>
                </div>
                {!isLoading && (
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Calories / Serve</th>
                                    <th>Protien / Serve</th>
                                    <th>Carbohydrates / Serve</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchResults.map((meal, index)=>(
                                        <tr>
                                            <td>{meal.foodName}</td>
                                            <td>{meal.energy ? meal.energy.value : '-'}</td>
                                            <td>{meal.protein ? meal.protein.value : '-'}</td>
                                            <td>{meal.carbohydrates ? meal.carbohydrates.value : '-'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
                {isLoading && (
                    <div className="spinner-container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <Spinner animation="border" role="status">
                            </Spinner>
                            <p style={{ color: 'white' }}>searching...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Explore_meals