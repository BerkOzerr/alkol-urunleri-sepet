import { CornerDownLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CartListEmpty = () => {
  return (
    <div className="flex items-center justify-center w-full h-124">
      <div className="flex items-center gap-10 justify-center w-full  dark:bg-gray-950 flex-col ">
        <Link
          className="flex gap-4 bg-indigo-600 text-white dark dark:bg-blue-500 hover:opacity-50 p-6 rounded-md my-10"
          to="/login"
        >
          <CornerDownLeft /> Start Shopping
        </Link>
        <h1 className=" animate-caret-blink">Your Cart Currently Empty </h1>
      </div>
    </div>
  );
};

export default CartListEmpty;
