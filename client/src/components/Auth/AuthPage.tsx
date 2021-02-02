import React, { useState } from "react";
import { InitialStateType } from "../../redux/auth/auth-reducer";
import { LogInPage } from "./LogIn/LogIn";
import { SignUpPage } from "./SignUp/SignUp";


export const AuthPage = () => {

    let [isRegister, setRegister] = useState<'login' |'regist'>('regist')

    
    return (
    <div className='container'> 
        <button onClick={() => setRegister('login')}>Log in</button>
        <button onClick={() =>setRegister('regist')}>Sign up</button>
        {(isRegister === 'login')
        ? <LogInPage />
        : <SignUpPage />
        }
    </div>
    ); 
}

