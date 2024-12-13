import {useState, useEffect, useRef} from 'react'
import login_img from "./assets/login.jpg"
import "./login_registration.css"

function Registration(props) {
    const usernameInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const confirmPasswordInputRef = useRef(null)

    return (
        <div className='login-body'>
            <div className='quote-two'>Fitmetrics</div>
            <div className='quote-one'>Commit to be fit </div>
            <div className='img-part'>
                <img src={login_img}/>
            </div>
            <div className='form'>
                <div className='title'>Sign up</div>
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
                    <button onClick={() => {
                        props.userSignupDataPage()
                    }}>Create account</button>
                </div>
            </div>
        </div>
    )
}

export default Registration