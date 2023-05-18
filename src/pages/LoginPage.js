import './LoginPage.css'
import React from 'react';
import { useState , useRef } from 'react';

var username = "" ;
var password = "";

    const storedToken = localStorage.getItem('token');

function LoginPage() {  
    
    if(storedToken){
        window.location.href = "/home";
    }

    const [usernameError , setUsernameError] = useState("");
    const [passwordError , setPasswordError] = useState("");
    
    const usernameValidation = useRef();
    const passwordValidation = useRef();

    const getUserName = (event) => {    username = event.target.value;  }
    const getPassword = (event) => {    password = event.target.value;  }

    async function signin(data){
        console.log("hey");
        const fetchData = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: data
            });
        const response = await fetchData.json();
        console.log(response);

        if(response.token){
            localStorage.setItem('token', response.token.key);
            localStorage.setItem('username', response.user_profile.username);
            window.location.href = "/home";
        
        }else if(response.error){
            setPasswordError(response.error);   
            passwordValidation.current.style.display = "block";
            return;
        }
    }   

    function loginfunction(event){
       
        event.preventDefault();
  
        // Username Validation

        if(username.length == 0){
            setUsernameError("Please Enter Username"); //username inccorect
            usernameValidation.current.style.display = "block";
            return;
        }else {
            setUsernameError("");
            usernameValidation.current.style.display = "none";
        }

        // Password Validation

        if(password.length == 0){
            setPasswordError("Please Enter Password");      //password inccorect
            passwordValidation.current.style.display = "block";
            return;
        }else {
            setPasswordError("");
            passwordValidation.current.style.display = "none";
        }

        // Send data to backend
        console.log(username);
        console.log(password);

        const data = JSON.stringify({
            username: username ,
            password: password
        });

        signin(data);

        
        
    }

    return(
        <div className='loginpage'>
            <div className='hero_content'>
                <h1>Sign In</h1>
                <p>Let's Connect World with Words</p>
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
                    <button>Sign In</button>
                </div>
                

            </form>    
                
        </div>
    );

}

export default LoginPage;