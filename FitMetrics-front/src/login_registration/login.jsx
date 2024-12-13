import {useState, useEffect, useRef} from 'react'
import login_img from "./assets/login.jpg"
import "./login_registration.css"

function Login(props) {
    const usernameInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const submit = async () => {
        const url = 'http://localhost:8080/user/login'
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
                console.error('wrong username or password');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <div className='login-body'>
            <div className='quote-two'>Fitmetrics</div>
            <div className='quote-one'>Commit to be fit </div>
            <div className='img-part'>
                <img src={login_img}/>
            </div>
            <div className='form'>
                <div className='title'>Sign in</div>
                <div className='input-part'>
                    <div className='input-field'>
                        <div>Username</div>
                        <input ref={usernameInputRef} type='text' />
                    </div>
                    <div className='input-field'>
                        <div>Password</div>
                        <input ref={passwordInputRef} type='password' />
                    </div>
                </div>
                <div className='other-page'>
                    <button onClick={() => {
                        props.registrationPage()
                    }}>Create account</button>
                </div>
                <div className='submit-btn'>
                    <button onClick={async () => {
                        await submit()
                        props.appPage()
                    }}>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Login