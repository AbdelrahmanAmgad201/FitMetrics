/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import './App.css'
import WorkoutPlan from './current-workout_plan/WorkoutPlan.jsx'
import MyCalendar from './scheduleManager/calendar.jsx'
import Dashboard from './DashPage/Dashboard.jsx'
import Workout_plans from './workout-plans/workout_plans.jsx'
import Nutrition_plan from './current-nutrition-plan/nutrition-plan.jsx';
import UserInfo from './user-info/User_info.jsx'
import Explore_meals from './explore_meals_workouts/explore_meals.jsx'
import Explore_workouts from './explore_meals_workouts/explore_workouts.jsx'
import Analytics from './analytics/Analytics.jsx'
import analytics_img from "./assets/analytics.png"
import calender_img from "./assets/calender.png"
import dashboard_img from "./assets/dashboard.png"
import explore_meals_img from "./assets/explore_meals.png"
import explore_workouts_img from "./assets/explore_workouts.png"
import nutrition_plan_img from "./assets/nutrition_plan.png"
import workout_plan_img from "./assets/workout_plan.png"
import streak_fire_img from "./assets/streak_fire.png"
import notification_bell_img from "./assets/notification_bell.png"
import logout_img from "./assets/logout_img.png"
import NutritionPlans from './nutrition-plans/nutrition_plans.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'

function App(props) {

  const [showDashboard, setShowDashboard] = useState(true)
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false)
  const [showCalender, setShowCalender] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showNutritionPlan, setShowNutritionPlan] = useState(false)
  const [showExploreMeals, setShowExploreMeals] = useState(false)
  const [showExploreWorkouts, setShowExploreWorkouts] = useState(false)
  const [showWorkoutPlans, setShowWorkoutPlans] = useState(false)
  const [showNutritionPlans, setShowNutritionPlans] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)

  const closeAllApps = () => {
    setShowDashboard(false)
    setShowWorkoutPlan(false)
    setShowCalender(false)
    setShowAnalytics(false)
    setShowNutritionPlan(false)
    setShowExploreMeals(false)
    setShowExploreWorkouts(false)
    setShowWorkoutPlans(false)
    setShowNutritionPlans(false)
    setShowUserInfo(false)
  }

  useEffect(() => {
    console.log(props.userJWT.current)
    return () => {

    }
  }, [])

  return (
    <div className="main-app">
      <div className="top-bar">
        <button className="user-identity" onClick={()=>{
          // closeAllApps()
          // setShowUserInfo(true)
        }}>FitMetrics</button>
        <div className="side-buttons">
        </div>
      </div>
      <div className="main-body">
        <div className="navigation-menu">
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowDashboard(true)
          }}>
            <img src={dashboard_img}/>
            <div>Dashboard</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowAnalytics(true)
          }}>
            <img src={analytics_img}/>
            <div>Analytics</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowWorkoutPlan(true)
          }}>
            <img src={workout_plan_img}/>
            <div>My Workout</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowNutritionPlan(true)
          }}>
            <img src={nutrition_plan_img}/>
            <div>My Nutrition</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowExploreMeals(true)
          }}>
            <img src={explore_meals_img}/>
            <div>Explore meals</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowExploreWorkouts(true)
          }}>
            <img src={explore_workouts_img}/>
            <div style={{fontSize:'14px'}}>Explore workouts</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowCalender(true)
          }}>
            <img src={calender_img}/>
            <div>Calender</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowWorkoutPlans(true)
          }}>
            <img src={explore_workouts_img}/>
            <div>Workout Plans</div>
          </button>
          <button className="field" onClick={() =>{
            closeAllApps()
            setShowNutritionPlans(true)
          }}>
            <img src={calender_img}/>
            <div>Nutrition Plans</div>
          </button>
        </div>
        <div className="application">
          {/* apps here */}
          {showUserInfo && <UserInfo />}
          {showCalender && <MyCalendar userJWT={props.userJWT} />}
          {showWorkoutPlan && <WorkoutPlan userJWT={props.userJWT} />}
          {showNutritionPlan && <Nutrition_plan userJWT={props.userJWT} />}
          {showDashboard && <Dashboard userJWT={props.userJWT} />}
          {showNutritionPlans && <NutritionPlans userJWT={props.userJWT}/>}
          {showWorkoutPlans && <Workout_plans userJWT={props.userJWT}/>}
          {showExploreMeals && <Explore_meals userJWT={props.userJWT}/>}
          {showExploreWorkouts && <Explore_workouts userJWT={props.userJWT}/>}
          {showAnalytics && <Analytics userJWT={props.userJWT}/>}
        </div>
      </div>
    </div>
  )
}

export default App
