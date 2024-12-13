import {useState, useEffect, useRef} from 'react'
import Login from "./login_registration/login.jsx"
import Registration from "./login_registration/registration.jsx"
import App from "./App.jsx"
import UserSignupData from "./user_data/UserSignupData.jsx"

function Control() {

    const [showLoginPage, setShowLoginPage] = useState(true)
    const [showRegistrationPage, setShowRegistrationPage] = useState(false)
    const [showAppPage, setShowAppPage] = useState(false)
    const [showUserSignupData, setShowUserSignupData] = useState(false)

    const closeAllPages = () => {
        setShowAppPage(false)
        setShowLoginPage(false)
        setShowRegistrationPage(false)
        setShowUserSignupData(false)
    }

    const goToLoginPage = () => {
        closeAllPages()
        setShowLoginPage(true)
    }

    const goToRegistrationPage = () => {
        closeAllPages()
        setShowRegistrationPage(true)
    }

    const goToUserSignupData = () => {
        closeAllPages()
        setShowUserSignupData(true)
    }

    const goToApp = () => {
        closeAllPages()
        setShowAppPage(true)
    }

    return (
        <div className='control-body'>
            {showLoginPage && <Login registrationPage={goToRegistrationPage} appPage={goToApp}/>}
            {showRegistrationPage && <Registration loginPage={goToLoginPage} userSignupDataPage={goToUserSignupData}/>}
            {showAppPage && <App />}
            {showUserSignupData && <UserSignupData appPage={goToApp}/>}
        </div>
    )
}

export default Control