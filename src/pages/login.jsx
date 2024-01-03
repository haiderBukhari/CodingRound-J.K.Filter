import React, { useState } from 'react';
import axios from 'axios';
import { SuccesToast, ErrorToast } from '../components/ReactToast';
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const initial = {
        email: "",
        password: ""
    }
    const errorInitial = {
        status: false,
        message: ""
    }
    const Navigate = useNavigate();
    const [error, setError] = useState(errorInitial);
    const [userInfo, setUserInfo] = useState(initial);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    const handleEmailChange = (e) => {
        setUserInfo({ ...userInfo, email: e.target.value });
        if (error.status) {
            setError(errorInitial);
        }
    };

    const handlePasswordChange = (e) => {
        setUserInfo({ ...userInfo, password: e.target.value });
        if (error.status) {
            setError(errorInitial);
        }
    };

    const loginUser = (e) => {
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}/register?email=${userInfo.email}&password=${userInfo.password}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data.data);
            localStorage.setItem('UserData', JSON.stringify(res.data.data));
            SuccesToast("Logined Succesfully");
            setError(errorInitial);
        }).catch(err => {
            ErrorToast(err.response.data.message);
            setError({
                status: true,
                message: err.response.data.message
            })
        })
    }
    return (
        <div className='login-main-container'>
            <div className="logincontainer" id="logincontainer">
                <div className="form-logincontainer sign-in">
                    <form>
                        <h1 className='text-2xl font-bold font-sans mb-4'>Sign In</h1>
                        <input
                            style={{ border: `1px solid ${error.status ? '#ff0000' : (isFocusedEmail ? 'blue' : '#ccc')}` }}
                            onFocus={() => setIsFocusedEmail(true)}
                            onBlur={() => setIsFocusedEmail(false)}
                            onChange={handleEmailChange}
                            type="email"
                            placeholder="Email"
                            value={userInfo.email || ""}
                        />
                        <input
                            style={{ border: `1px solid ${error.status ? '#ff0000' : (isFocusedPassword ? 'blue' : '#ccc')}` }}
                            onFocus={() => setIsFocusedPassword(true)}
                            onBlur={() => setIsFocusedPassword(false)}
                            onChange={handlePasswordChange}
                            type="password"
                            placeholder="Password"
                            value={userInfo.password || ""}
                        />
                        <a href="/">Forget Your Password?</a>
                        <button onClick={loginUser} type='submit'>Sign In</button>
                        <div className='flex justify-center items-center' style={{ display: `${(!error.status) ? 'none' : ''}` }}>
                            {/* <CancelOutlinedIcon style={{ color: '#ff0000', marginRight: "10px" }} /> */}
                            <p style={{ color: "#ff0000", fontWeight: "600" }}>{error.message}</p>
                        </div>
                    </form>
                </div>
                <div className="toggle-logincontainer">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1 className='welcome-note'>Hello, All! <span style={{ fontSize: "27px" }}>👋</span></h1>
                            <p>Welcome Back, Login! To Access Resources</p>
                            <button onClick={()=>{Navigate('/register')}} style={{ border: "1px solid #ccc" }} id="login">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;