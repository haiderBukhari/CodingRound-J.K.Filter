import React, { useState } from 'react';
import axios from 'axios';
import { SuccesToast, ErrorToast } from '../components/ReactToast';
import './login.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const initial = {
        name: "",
        email: "",
        password: ""
    }
    const errorInitial = {
        status: false,
        message: ""
    }
    
    const Navigate = useNavigate();
    const [error, setError] = useState(errorInitial);
    const [useInfo, setUserInfo] = useState(initial);
    
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);

    const handleEmailChange = (e) => {
        setUserInfo({ ...useInfo, email: e.target.value });
        if (error.status) {
            setError(errorInitial);
        }
    };
    const handleNameChange = (e) => {
        setUserInfo({ ...useInfo, name: e.target.value });
        if (error.status) {
            setError(errorInitial);
        }
    };

    const handlePasswordChange = (e) => {
        setUserInfo({ ...useInfo, password: e.target.value });
        if (error.status) {
            setError(errorInitial);
        }
    };

    const loginUser = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_PORT}/register`, useInfo, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            SuccesToast("Registered Successfully");
        }).catch(err => {
            setError({
                status: true,
                message: err.response.data.message
            })
            ErrorToast(err.response.data.message);
        })
    }
    return (
        <div className='login-main-container'>
            <div className="logincontainer" id="logincontainer">
                <div className="form-logincontainer sign-in">
                    <form>
                        <h1 className='text-2xl font-bold font-sans mb-4'>Sign Up</h1>
                        <input
                            style={{ border: `1px solid ${error.status ? '#ff0000' : (isFocusedName ? 'blue' : '#ccc')}` }}
                            onFocus={() => setIsFocusedName(true)}
                            onBlur={() => setIsFocusedName(false)}
                            onChange={handleNameChange}
                            type="text"
                            placeholder="Full Name"
                            value={useInfo.name || ""}
                        />
                        <input
                            style={{ border: `1px solid ${error.status ? '#ff0000' : (isFocusedEmail ? 'blue' : '#ccc')}` }}
                            onFocus={() => setIsFocusedEmail(true)}
                            onBlur={() => setIsFocusedEmail(false)}
                            onChange={handleEmailChange}
                            type="email"
                            placeholder="Email"
                            value={useInfo.email || ""}
                        />
                        <input
                            style={{ border: `1px solid ${error.status ? '#ff0000' : (isFocusedPassword ? 'blue' : '#ccc')}` }}
                            onFocus={() => setIsFocusedPassword(true)}
                            onBlur={() => setIsFocusedPassword(false)}
                            onChange={handlePasswordChange}
                            type="password"
                            placeholder="Password"
                            value={useInfo.password || ""}
                        />
                        <button onClick={loginUser} type='submit'>Sign Up</button>
                        <div className='flex justify-center items-center' style={{ display: `${(!error.status) ? 'none' : ''}` }}>
                            <p style={{ color: "#ff0000", fontWeight: "600" }}>Already Signed Up</p>
                        </div>
                    </form>
                </div>
                <div className="toggle-logincontainer">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1 className='welcome-note'>Hello, All! <span style={{ fontSize: "27px" }}>👋</span></h1>
                            <p>Welcome! Create an Account and access million of resources</p>
                            <button onClick={()=>{Navigate('/login')}} style={{ border: "1px solid #ccc" }} id="login">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register