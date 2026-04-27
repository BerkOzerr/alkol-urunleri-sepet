import React from "react";
import { Link } from "react-router-dom";

const LoginBody = () => {
  return (
    <div className="flex items-center justify-center w-full h-124">
      <div className="flex items-center gap-10 justify-center w-full  dark:bg-gray-950 flex-col ">
        <Link
          className="bg-indigo-600 text-white dark dark:bg-blue-500 hover:opacity-50 p-6 rounded-md my-10"
          to="/login"
        >
          Login
        </Link>
        <h1 className=" animate-caret-blink">Please Login...</h1>
      </div>
    </div>
  );
};

export default LoginBody;
