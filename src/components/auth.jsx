import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import {  useEffect, useState } from "react";
import {signInWithEmailAndPassword,signOut} from "firebase/auth"
import { auth } from "./config/firebase";
import { Spinner } from "@material-tailwind/react";

import { Link } from "react-router-dom";
const Auth = () => {

    const [loginInProgress,SetLoginInProgress]=useState(false)
    const  [ email,SetEmail]=useState()
    const  [ password,SetPassword]=useState()
    const [user,SetUser]=useState();
    
    const [invalid,SetInvalid]=useState(false)
    const [isLoading, setIsLoading] = useState(true);
    
    setTimeout(() => {
        setInterval(() => {
            if (user){
                setIsLoading(false);
                window.location.href='/dashboard'

            }else{
                setIsLoading(false);
            }
        }, 3000);    
    }, 2000);
    
    // if (user){
    //     // window.location.href="/dashboard"
    //     // console.log(user);
    // }else{
        
    // }
    useEffect(()=>{
        
        setTimeout(() => {
            SetUser(auth?.currentUser?.email) 
           
        }, 1000);
        },[])
    const signIN = async ()=>{
        SetLoginInProgress(true)
        try{
        await  signInWithEmailAndPassword(auth,email,password );
        SetUser(auth?.currentUser?.email)
        window.localStorage.setItem("email",email)
        window.localStorage.setItem("pass",password)
        SetInvalid(false);
        SetLoginInProgress(true)

        }
        catch(error){
            console.log(error)
            SetInvalid(true);
            SetLoginInProgress(false)
        }
    };













  return (
<div>
    {isLoading?(<Spinner className="h-16 w-16 mx-auto my-auto h-screen  text-gray-900/50" />):(
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
            <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
            />
        </div>
        <div className="md:w-1/3 max-w-sm">
            <h1 className="text-center py-4 text-3xl">Login</h1>
            <h2>{invalid?(<div className="text-xl py-3 text-red-600">Your email or passowrd is invalid !</div>):(<div className="px-3 text-xl text-red-500"></div>)}</h2>
            <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            onChange={(e)=>{SetEmail(e.target.value)}}
            />
            <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            onChange={(e)=>{SetPassword(e.target.value)}}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
            
            <a
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
            >
                You don't have account ?
            </a>
            <Link to={'/register'}>
                Create an accaunt 
            </Link>
            </div>
            <div className="text-center md:text-left">
            <button
                className="mt-4 bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider disabled:opacity-75"
                type="submit"
                onClick={signIN}
                disabled={loginInProgress}
            >
                {loginInProgress?(<Spinner className="h-6 w-6   text-gray-900/50" />):(<div></div>)}Login
            </button>
            </div>
        </div>
        </section>
    )}
        
    
    </div>
    );
};

export default Auth;