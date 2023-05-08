import './SignupPage.css'
import React from 'react';
import { useState , useRef } from 'react';

var username = "" ;
var password = "";
var confirmPassword = "" ;

function SignupPage() {

    const [usernameError , setUsernameError] = useState("");
    const [passwordError , setPasswordError] = useState("");
    
    const usernameValidation = useRef();
    const passwordValidation = useRef();

    
    const getUserName = (event) => {    username = event.target.value; }
    const getPassword = (event) => {    password = event.target.value;  }
    const getConfirmPassword = (event) => {     confirmPassword = event.target.value;   }



    function signupfunction(event){
       
        event.preventDefault();

        
        // Username Validation

        if(username.length < 6){
            setUsernameError("At least 6 char long"); //check if username already exists
            usernameValidation.current.style.display = "block";
            return;
        }else {
            setUsernameError("");
            usernameValidation.current.style.display = "none";
        }

        // Password Validation

        if(password.length < 10){
            setPasswordError("At least 10 char long");
            passwordValidation.current.style.display = "block";
            return;
        }else if(password !== confirmPassword){
            setPasswordError("Passwords do not match");
            passwordValidation.current.style.display = "block";
            return;
        }else {
            setPasswordError("");
            passwordValidation.current.style.display = "none";
        }

        // Send data to backend
        console.log(username);
        console.log(password);
        console.log(confirmPassword);
       

        
    }

    return(
        <div className='signuppage'>
            <div className='hero_content'>
                <h1>Sign Up</h1>
                <p>Let's Connect With the World</p>
            </div>

            <form className='signup'>
                
                <div className='input-container'>
                    <label>Create Username</label>
                    <input className="form_input" type="text" id="username" name="username" 
                            placeholder="Username" required="" onChange={getUserName}/>  
                    <div className="field-validation-error" id="email-validation" ref={usernameValidation}>
                        <p>{usernameError}</p>
                    </div>
                </div>

                <div className='input-container'>
                    <label>Create a password</label>
                    <input className="form_input" type="password" id="password" name="password"
                            placeholder="Your Password" required="" onChange={getPassword} />
                    <input className="form_input" type="password" id="confirmpassword" name="confirmpassword"
                            placeholder="Confirm Password" required="" onChange={getConfirmPassword}/>

                    <p className='info'>At least 10 Characters</p>
                    
                    <div className="field-validation-error" id="password-validation" ref={passwordValidation}>
                        <p>{passwordError}</p>
                    </div>
                </div>

                <div className="submit-btn-continer" onClick={signupfunction} >
                    <button>Create account</button>
                </div>
                

            </form>    
                
        </div>
    );

}

export default SignupPage;