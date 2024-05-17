import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom"
import { RocketIcon } from "@radix-ui/react-icons"
import { helix } from 'ldrs'

const Login = () => {
  const { user, dispatch } = useAuthContext();
  const [loading, setLoading] = useState(true);
  helix.register()



  const handleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_API_BACKEND}/auth`;
  };

  useEffect(() => {
    // Loading effect for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);


  }, [user]);


  if (loading) {
    return (
      <div class="flex items-center justify-center h-screen">
        <l-helix
          size="45"
          speed="2.5"
          color="blue"
        ></l-helix>
      </div>

    );
  }


  return (

      <div className="flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md mt-[100px]">
          <h2 className="text-4xl font-extrabold text-center mb-6">Welcome to 161 Notes!</h2>
          <p className="text-sm text-center mb-6">Log in or automatically sign up using your Google account</p>

          <div className="my-4 flex items-center justify-center">
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span className="flex-none uppercase px-4 text-sm text-gray-400">continue with</span>
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          </div>
          <div className="flex justify-center">
            <button onClick={handleButtonClick} aria-label="Sign in with Google"
              className="p-2 transition duration-100 ease-in-out transform hover:scale-105"
            >
              <img src="/glog.png" alt="Google" className="h-10" />
            </button>
          </div>


        </div>
      </div>

  );



}

export default Login;
