import { useState } from 'react'
import './App.css'
import WorkoutPlan from './workout_plan/WorkoutPlan.jsx'
import MyCalendar from './scheduleManager/calendar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="main-app">
      <div className="top-bar">
        <div className="user-identity">
          <img />
          <div>mahmoud</div>
        </div>
        <div className="side-buttons">
          test
        </div>
      </div>
      <div className="main-body">
        <div className="navigation-menu">
          <button><img /><div>hello1</div></button>
          <button><img /><div>hello2</div></button>
          <button><img /><div>hello3</div></button>
          <button><img /><div>hello4</div></button>
          <button><img /><div>hello5</div></button>
          <button><img /><div>hello6</div></button>
          <button><img /><div>hello7</div></button>
        </div>
        <div className="application">
          {/* apps here */}
          {/* <WorkoutPlan /> */}
          {<MyCalendar></MyCalendar>}

        </div>
      </div>
    </div>
  )
}

export default App
