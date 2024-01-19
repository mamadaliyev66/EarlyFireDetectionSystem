import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import {  useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "./config/firebase";
import { Spinner } from "@material-tailwind/react";
import {collection,addDoc,doc} from "firebase/firestore"
import { Link } from "react-router-dom";
import { db } from "./config/firebase";

import {firebase,firestore} from "./config/firebase";
const Register = () => {

    const  [ nemail,SetNemail]=useState()
    const  [ npassword,SetNpassword]=useState()
    
    const [rpassword,SetRpassword]=useState()
    const [nusername,SetNusername]=useState();
    const [creatinginProgress,setCreatinginProgress]=useState(false)
    const [invalid,SetInvalid]=useState(false)
    const [isLoading, setIsLoading] = useState(true);
    
    const email=localStorage.getItem("email")
    const password=localStorage.getItem("pass")
    const [message,SetMessage]=useState()
    const [messageclass,SetMessageclass]=useState()
    const [user,SetUser]=useState();

    const checkuser=()=>{
        
        if (email && password) {
           
            window.location.href="/dashboard"
           
        }else{
            setIsLoading(false)
        }
       
    }

    setTimeout(() => {
       
        checkuser();
    }, 4000);
    


    const CollectionRef=collection(db,"Users")
    const AddUser=async(auth)=>{
    }
    
    const CreateAccout=async()=>{
        setCreatinginProgress(true)
        setTimeout(async() => {
            if (npassword == rpassword) {
                try{
                    
                    await  createUserWithEmailAndPassword(auth,nemail,npassword );
                    
                    await firestore.collection("Users").doc(auth.currentUser.uid).set({email:nemail,password:npassword,username:nusername,user_id:auth.currentUser.uid},{ merge: true }).then(() => {
                        console.log('Document successfully written!');
                      })
                      .catch((error) => {
                        console.error('Error writing document: ', error);
                      });


                    
                    
                    SetMessage("Successfully Registered Now You Redirect to Dashboard  Automatically !")
                    
                    SetUser(auth?.currentUser?.email)
                    
                    window.localStorage.setItem("email",nemail)
                    window.localStorage.setItem("pass",npassword)
                    
                    SetMessageclass("text-green-500 my-9")
                    setCreatinginProgress(true)
                    window.location.href="/dashboard"
                    
            
                    }
                    catch(error){
                        if (error.code=="auth/email-already-in-use") {
                            SetMessage("This email is already in use !")
                            SetMessageclass("text-red-500")
                        }else if(error.code=="auth/weak-password"){
                            SetMessage("Please Use Stonger Password !")
                            SetMessageclass("text-red-500")
                        }else{
                            SetMessage("Something went wrong, place try again!")
                            SetMessageclass("text-red-500")
                        }
                        setCreatinginProgress(false);
                    }
                
            }else{
                SetMessage("Passwords Don't Match !")
                SetMessageclass("text-red-500")
                setCreatinginProgress(false)
                console.log(password,rpassword);
            }
        }, 1500);
        
    }







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
            <h1 className="text-center py-4 text-3xl">Register</h1>
            <h2 className="py-2 text-xl "><span className={messageclass}>{message}</span></h2>
            <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            onChange={(e)=>{SetNemail(e.target.value)}}
            />
             <input
            className="text-sm w-full px-4 py-2 mt-3 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Username"
            onChange={(e)=>{SetNusername(e.target.value)}}
            />
            <input
            className="text-sm w-full px-4 py-2  border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            onChange={(e)=>{SetNpassword(e.target.value)}}
            />
            <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Repeat your password"
            onChange={(e)=>{SetRpassword(e.target.value)}}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
            
            <a
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
            >
                Already have an account?
            </a>
            <Link to={'/login'}>
                Login
            </Link>
            </div>
            <div className="text-center md:text-left">
            
            

                <button
                className="mt-4 bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider disabled:opacity-75 "
                type="submit"
                onClick={CreateAccout}
                disabled={creatinginProgress}
                >
                {creatinginProgress?(<Spinner className="h-6 w-6   text-gray-900/50" />):(<div></div>)}
                Create an account
                </button>
            
        
           



            </div>
        </div>
        </section>
    )}
        
    
    </div>
    );
};

export default Register;