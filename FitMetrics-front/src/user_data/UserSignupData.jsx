import {useState, useEffect, useRef} from 'react'
import "./UserSignupData.css"
import profile_img from "./assets/profile.png"

function UserSignupData({userJWT}) {
    const firstNameInputRef = useRef(null)
    const lastNameInputRef = useRef(null)
    const weightInputRef = useRef(null)
    const heightInputRef = useRef(null)
    const dateInputRef = useRef(null)
    const genderInputRef = useRef(null)
    const unitInputRef = useRef(null)

    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)

    const handleUnitChange = (event) => {
        unitInputRef.current = event.target.value
    }
    
    const handleGenderChange = (event) => {
        genderInputRef.current = event.target.value
    }

    const submit = async () => {
        const url = 'http://localhost:8080/user/post-data'
        const data = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            isKg: true,
            weight: weightInputRef.current.value,
            height: heightInputRef.current.value,
            dateOfBirth: dateInputRef.current.value
        };

        if (unitInputRef.current == "Pound/Inch")
            data.isKg = false
        
        console.log(data)
        console.log(userJWT.current)

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userJWT.current}`
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

    const validate = () => {
        const notOnlyLetters = (str) => /[^a-zA-Z]/.test(str)
        const notNumber = (str) => isNaN(str)
        let flag = true
        if (notOnlyLetters(firstNameInputRef.current.value)){
            firstNameInputRef.current.value = ""
            setErrorMsg("first name should contain only letters")
        }
        else if (notOnlyLetters(lastNameInputRef.current.value)){
            lastNameInputRef.current.value = ""
            setErrorMsg("last name should contain only letters")
        }
        else if (genderInputRef.current == null)
            setErrorMsg("choose gender")
        else if (unitInputRef.current == null)
            setErrorMsg("choose unit")
        else if (notNumber(weightInputRef.current.value)){
            weightInputRef.current.value = ""
            setErrorMsg("weight should be a valid number")
        }
        else if (notNumber(heightInputRef.current.value)){
            heightInputRef.current.value = ""
            setErrorMsg("height should be a valid number")
        }
        else if (dateInputRef.current.value == "")
            setErrorMsg("choose a date")
        else flag = false
        if (flag){
            setShowErrorMsg(true)
            clearInput()
            return false
        }
        return true
    }

    return (
        <div className='UserSignupData-body'>
            <div className='main-body'>
                {showErrorMsg && <div className='error-msg'>{errorMsg}</div>}
                <div className='user-img'><div><img src={profile_img}/></div></div>
                <div className='input-row'>
                    <div className='input-field'>
                        <p>First name:</p>
                        <input ref={firstNameInputRef} type='text' />
                    </div>
                    <div className='input-field'>
                        <p>Last name:</p>
                        <input ref={lastNameInputRef} type='text' />
                    </div>
                </div>
                <div className='input-row'>
                    <p>Gender: </p>
                    <label>
                        <input type='radio' name='gender' value="male" onChange={handleGenderChange}/>
                        Male
                    </label>
                    <label>
                        <input type='radio' name='gender' value="female" onChange={handleGenderChange}/>
                        Female
                    </label>
                </div>
                <div className='input-row'>
                    <p>Unit preference: </p>
                    <label>
                        <input type='radio' name='unit' value="KG/CM" onChange={handleUnitChange}/>
                        KG/CM
                    </label>
                    <label>
                        <input type='radio' name='unit' value="Pound/Inch" onChange={handleUnitChange}/>
                        Pound/Inch
                    </label>
                </div>
                <div className='input-row'>
                    <div className='input-field'>
                        <p>Weight:</p>
                        <input ref={weightInputRef} type='text' />
                    </div>
                    <div className='input-field'>
                        <p>Height:</p>
                        <input ref={heightInputRef} type='text' />
                    </div>
                </div>
                <div className='input-row'>
                    <div className='input-field'>
                        <p>Date Of Birth:</p>
                        <input ref={dateInputRef} type='date' max="2020-1-1" min="1910-1-1"/>
                    </div>
                </div>
            </div>
            <button className='submit-btn' onClick={async () => {
                if (validate() && await submit()){
                    props.appPage()
                }
            }}>Get Started</button>
        </div>
    )
}

export default UserSignupData