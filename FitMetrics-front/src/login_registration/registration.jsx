import {useState, useEffect, useRef} from 'react'
import login_img from "./assets/login.jpg"
import "./login_registration.css"

function Registration(props) {
    const usernameInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const confirmPasswordInputRef = useRef(null)

    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)

    const submit = async () => {
        const url = 'http://localhost:8080/user/register'
        const data = {
            username: usernameInputRef.current.value,
            password: passwordInputRef.current.value
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            // Handle the response
            if (response.ok) {
                const result = await response.json();
                props.userJWT.current = result.jwt
                return true
            } else {
                setErrorMsg("already used username")
            }
        } catch (error) {
            console.error('Network error:', error);
        }
        return false
    }

    const clearInput = () => {
        usernameInputRef.current.value = ""
        passwordInputRef.current.value = ""
        confirmPasswordInputRef.current.value = ""
    }

    const validate = () => {
        const hasSpecialCharacters = (str) => /[^a-zA-Z0-9_]/.test(str)
        let flag = true
        if (hasSpecialCharacters(usernameInputRef.current.value))
            setErrorMsg("username should consist of letters, numbers and underscore only")
        else if (confirmPasswordInputRef.current.value != confirmPasswordInputRef.current.value)
            setErrorMsg("passwords doesn't match")
        else if (passwordInputRef.current.value.length < 8)
            setErrorMsg("password must be at least 8 characters long")
        else flag = false
        if (flag){
            setShowErrorMsg(true)
            clearInput()
            return false
        }
        return true
    }

    return (
        <div className='login-body'>
            <div className='quote-two'>Fitmetrics</div>
            <div className='quote-one'>Commit to be fit </div>
            <div className='img-part'>
                <img src={login_img}/>
            </div>
            <div className='form'>
                {showErrorMsg && <div className='error-msg'>{errorMsg}</div>}
                <div className='title-login'>Sign up</div>
                <div className='input-part'>
                    <div className='input-field'>
                        <div>Username</div>
                        <input ref={usernameInputRef} type='text' />
                    </div>
                    <div className='input-field'>
                        <div>Password</div>
                        <input ref={passwordInputRef} type='password' />
                    </div>
                    <div className='input-field'>
                        <div>Confirm Password</div>
                        <input ref={confirmPasswordInputRef} type='password' />
                    </div>
                </div>
                <div className='other-page'>
                    <p>Already have an accout?</p>
                    <button onClick={() => {
                        props.loginPage()
                    }}>Sign in</button>
                </div>
                <div className='submit-btn'>
                    <button onClick={async () => {
                        if (validate() && await submit()){
                            props.userSignupDataPage()
                        }
                    }}>Create account</button>
                </div>
            </div>
        </div>
    )
}

export default Registration