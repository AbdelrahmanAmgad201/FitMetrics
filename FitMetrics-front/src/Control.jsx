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

    const userJWT = useRef(null)

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
            {showLoginPage && <Login registrationPage={goToRegistrationPage} appPage={goToApp} userJWT={userJWT} />}
            {showRegistrationPage && <Registration loginPage={goToLoginPage} userSignupDataPage={goToUserSignupData} userJWT={userJWT} />}
            {showAppPage && <App userJWT={userJWT} />}
            {showUserSignupData && <UserSignupData appPage={goToApp} userJWT={userJWT}/>}
        </div>
    )
}

export default Control