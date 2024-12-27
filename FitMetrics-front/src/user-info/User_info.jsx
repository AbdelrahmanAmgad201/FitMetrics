import { useState, useEffect, useRef } from 'react'
import './User_info.css'

function UserInfo(props) {

    const [fullName, setFullName] = useState("Mahmoud Hesham")
    const [userName, setUserName] = useState("name")
    const [gender, setGender] = useState("Male")
    const [age, setAge] = useState(20)
    const [weightUnit, setweightUnit] = useState("KG")
    const [lengthUnit, setLengthUnit] = useState("CM")
    const [weight, setWeight] = useState(99)
    const [height, setHeight] = useState(999)

    const [isBoxVisible, setIsBoxVisible] = useState(false)
    const [passwordErrorMsg, setPasswrodErrorMsg] = useState('')

    const oldPasswordInput = useRef('')
    const newPasswordInput = useRef('')
    const confirmPasswordInput = useRef('')

    const submitNewPassword = () => {
        setIsBoxVisible(false)
    }

    useEffect(() => {
    return () => {
        
    }
    }, [])

    return (
    <div className="user-info-menu">
        <div className='content'>
            <div className='full-name'>{fullName}</div>
            <div className='field'>
                <div className='data-name'>Username:</div>
                <div className='user-data'>{userName}</div>
            </div>
            <div className='field'>
                <div className='data-name'>Gender:</div>
                <div className='user-data'>{gender}</div>
            </div>
            <div className='field'>
                <div className='data-name'>Age:</div>
                <div className='user-data'>{age}</div>
            </div>
            <div className='field'>
                <div className='data-name'>Weight:</div>
                <div className='user-data'>{weight} {weightUnit}</div>
            </div>
            <div className='field'>
                <div className='data-name'>Height:</div>
                <div className='user-data'>{height} {lengthUnit}</div>
            </div>
        </div>
        <button className='change-password-btn' onClick={()=>{
            setIsBoxVisible(true)
        }}>Change password</button>

        {isBoxVisible && (<div className='blur-effect'/>)}

        {isBoxVisible && (
            <div className='change-password-menu'>
                <div className='password-menu-top'>
                    <button className='close-password-btn' onClick={()=>{
                        setIsBoxVisible(false)
                    }}>X</button>
                    <div className='password-title'>Change password</div>
                </div>
                {(passwordErrorMsg != '') && (
                    <div className='error-msg'>{passwordErrorMsg}</div>
                )}
                <div className='input-field'>
                    <div className='input-type'>old password:</div>
                    <input ref={oldPasswordInput} type='password' />
                </div>
                <div className='input-field'>
                    <div className='input-type'>new password:</div>
                    <input ref={newPasswordInput} type='password' />
                </div>
                <div className='input-field'>
                    <div className='input-type'>confirm password:</div>
                    <input ref={confirmPasswordInput} type='password' />
                </div>
                <div className='set-password-holder'>
                    <button className='set-password-btn' onClick={submitNewPassword}>Confirm</button>
                </div>
            </div>
        )}
    </div>
    )
}

export default UserInfo
