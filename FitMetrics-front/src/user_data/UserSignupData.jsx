import {useState, useEffect, useRef} from 'react'
import "./UserSignupData.css"
import profile_img from "./assets/profile.png"

function UserSignupData(props) {
    const firstNameInputRef = useRef(null)
    const lasttNameInputRef = useRef(null)
    const weightInputRef = useRef(null)
    const heightInputRef = useRef(null)
    const dateInputRef = useRef(null)
    const genderInputRef = useRef(null)
    const unitInputRef = useRef(null)

    const handleUnitChange = (event) => {
        unitInputRef.current = event.target.value
    }
    
    const handleGenderChange = (event) => {
        genderInputRef.current = event.target.value
    }

    const printAllInputs = () => {
        console.log("user data:")
        console.log(firstNameInputRef.current.value)
        console.log(lasttNameInputRef.current.value)
        console.log(weightInputRef.current.value)
        console.log(heightInputRef.current.value)
        console.log(dateInputRef.current.value)
        console.log(genderInputRef.current)
        console.log(unitInputRef.current)
    }

    return (
        <div className='UserSignupData-body'>
            <div className='main-body'>
                <div className='user-img'><div><img src={profile_img}/></div></div>
                <div className='input-row'>
                    <div className='input-field'>
                        <p>First name:</p>
                        <input ref={firstNameInputRef} type='text' />
                    </div>
                    <div className='input-field'>
                        <p>Last name:</p>
                        <input ref={lasttNameInputRef} type='text' />
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
                        <input ref={dateInputRef} type='date' />
                    </div>
                </div>
            </div>
            <button className='submit-btn' onClick={() => {
                printAllInputs()
                props.appPage()
            }}>Get Started</button>
        </div>
    )
}

export default UserSignupData