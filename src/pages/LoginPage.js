import './LoginPage.css'
import React from 'react';
import { useState , useRef } from 'react';

var username = "" ;
var password = "";

function LoginPage() {

    const [usernameError , setUsernameError] = useState("");
    const [passwordError , setPasswordError] = useState("");
    
    const usernameValidation = useRef();
    const passwordValidation = useRef();

    
    const getUserName = (event) => {    username = event.target.value;  }
    const getPassword = (event) => {    password = event.target.value;  }

    function loginfunction(event){
       
        event.preventDefault();

        
        // Username Validation

        if(username.length < 6){
            setUsernameError("At least 6 char long"); //username inccorect
            usernameValidation.current.style.display = "block";
            return;
        }else {
            setUsernameError("");
            usernameValidation.current.style.display = "none";
        }

        // Password Validation

        if(password.length < 10){
            setPasswordError("At least 10 char long");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else {
            setPasswordError("");
            passwordValidation.current.style.display = "none";
        }

        // Send data to backend
        console.log(username);
        console.log(password);
        
    }

    return(
        <div className='loginpage'>
            <div className='hero_content'>
                <h1>Sign In</h1>
                <p>Let's Connect With the World</p>
            </div>

            <form className='login'>
                
                <div className='input-container'>
                    <label>Username</label>
                    <input className="form_input" type="text" id="username" name="username" 
                            placeholder="Username" required="" onChange={getUserName}/>  
                    <div className="field-validation-error" id="email-validation" ref={usernameValidation}>
                        <p>{usernameError}</p>
                    </div>
                </div>

                <div className='input-container'>
                    <label>Password</label>
                    <input className="form_input" type="password" id="password" name="password"
                            placeholder="Your Password" required="" onChange={getPassword} />

                    <div className="field-validation-error" id="password-validation" ref={passwordValidation}>
                        <p>{passwordError}</p>
                    </div>
                </div>

                <div className="submit-btn-continer" onClick={loginfunction} >
                    <button>Create account</button>
                </div>
                

            </form>    
                
        </div>
    );

}

export default LoginPage;