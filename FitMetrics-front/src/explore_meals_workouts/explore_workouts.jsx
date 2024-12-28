import {useState, useEffect, useRef} from 'react'
import './explore_meals_workouts.css'
import Spinner from 'react-bootstrap/Spinner'
import LineChart from './LineChart';

function Explore_workouts({userJWT}) {

    const [searchResults, setSearchResults] = useState([])
    const [searchDetails, setSearchDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const all_exercises = useRef(null)
    const searchInput = useRef(null)
    const [showWorkoutMenu, setShowWorkoutMenu] = useState(false)
    const active_workout = useRef(null)

    const fetchWorkOuts = async (query) => {
        const url = 'http://localhost:8080/exercise/all';
        let data;
        
        if (all_exercises.current) {
            console.log("already loadded exe")
          await setSearchResults(all_exercises.current.excercises_ids.filter((exercise) => exercise.toLowerCase().startsWith(query.toLowerCase())) || []);
          console.log(searchResults)
          return;
        }
    
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',    
            }
          });
    
          if (response.ok) {
            const result = await response.json();
            all_exercises.current = result
            await setSearchResults(all_exercises.current.excercises_ids.filter((exercise) => exercise.toLowerCase().startsWith(query.toLowerCase())) || []);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
    };

    const getWorkoutDetails = async (workout) => {
        const url = 'http://localhost:8080/exercise/' + workout;
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',    
            }
          });
          
          if (response.ok) {
            const result = await response.json()
            console.log(result)
            return result
          }
        } catch (error) {
          console.error('Network error:', error);
        }
    };

    const loadResultsDetails = async () => {
        let data = []
        for (let i = 0; i < searchResults.length; i++){
            await data.push(await getWorkoutDetails(searchResults[i]))
        }
        console.log("data hereee")
        console.log(data)
        await setSearchDetails(data)
    }

    return (
        <div className='explore-workouts-main'>
            {showWorkoutMenu && (<div className='blur-effect'/>)}
            {showWorkoutMenu && (
                <div className='workout-menu'>
                    <LineChart
                        setShowWorkoutMenu={setShowWorkoutMenu}
                        workoutName={active_workout.current}
                        userJWT={userJWT}
                    />
                </div>
            )}

            <div className='explore-workouts-body'>
                <div className='workout-title'>Explore Workouts</div>
                <div className='searchbar-container'>
                    <div className='searchbar'>
                        <input ref={searchInput} type='text' />
                        <button onClick={async ()=>{
                            console.log(searchInput.current.value)
                            setIsLoading(true)
                            await fetchWorkOuts(searchInput.current.value)
                            await loadResultsDetails()
                            setIsLoading(false)
                            console.log(searchResults)
                            console.log(searchDetails)
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
                                    <th>Primary Muscle</th>
                                    <th>equipment</th>
                                    <th>level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchDetails.map((workout, index)=>(
                                        <tr key={index} onClick={()=>{
                                            setShowWorkoutMenu(true)
                                            active_workout.current = workout.name
                                        }}>
                                            <td>{workout.name}</td>
                                            <td>{workout.primaryMuscles ? workout.primaryMuscles[0] : '-'}</td>
                                            <td>{workout.equipment ? workout.equipment : '-'}</td>
                                            <td>{workout.level}</td>
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

export default Explore_workouts