import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartList,
  removeCartList,
  decrementCartList,
} from "../lib/cartSlice";

import { Minus, Plus, Trash } from "lucide-react";

const AlkolCardForCart = ({ cart }) => {
  const { id, adi, alkolOrani, fiyat, imagesUrl, alkolBoyutu, quantity } = cart;

  const dispatch = useDispatch();

  return (
    <>
      <Card className="flex h-64 w-fit justify-center p-4 items-center  mx-auto sm:max-w-xl lg:max-w-full  pt-0 dark:bg-gray-800 dark:text-white">
        <div className="flex w-240  justify-evenly items-center p-4">
          <div className=" sm:aspect-w-3 sm:aspect-h-4 lg:aspect-w-3 lg:aspect-h-4 w-fit items-center p-2 my-2 flex">
            <Link key={id} to={`/product-details/${id}`}>
              <img
                alt={adi}
                loading="lazy"
                decoding="async"
                className="object-cover hover:shadow-lg sm:mx-4 lg:mx-6 shadow-gray-800  inset-0 block hover:scale-110 mx-4 transition-all delay-250 duration-200 ease-in-out sm:max-h-40  lg:max-h-50"
                src={imagesUrl}
              />
            </Link>
            <CardHeader className=" ">
              <CardTitle className=" dark:text-white text-4xl w-full text-gray-700 font-bold mb-4">
                {adi}
              </CardTitle>
            </CardHeader>
          </div>{" "}
          <div className=" flex flex-col  items-center justify-center ">
            <div className="flex lg:text-2xl sm:text-sm dark:text-white text-black items-center justify-center p-4 gap-2">
              <CardDescription> Boyutu </CardDescription>
              <CardDescription> {alkolBoyutu}</CardDescription>
            </div>
            <div className="flex items-center justify-center p-4 gap-2">
              <CardDescription>Alkol orani </CardDescription>
              <CardDescription> {alkolOrani}</CardDescription>
            </div>
            <div className="flex items-center justify-center p-4 gap-2">
              <CardDescription>Fiyat</CardDescription>
              <CardDescription>{fiyat}</CardDescription>
            </div>

            <div className="flex lg:text-2xl sm:text-sm dark:text-white text-black items-center justify-center p-4 gap-2">
              <CardDescription> Toplam Fiyat </CardDescription>
              <CardDescription> {fiyat * quantity}</CardDescription>
            </div>
            <div className="flex gap-4 lg:text-sm sm:text-xs items-center ">
              <Button
                onClick={() => dispatch(removeCartList(cart))}
                className="bg-indigo-600 cursor-pointer hover:opacity-20 text-white dark:bg-gray-500 "
              >
                <Trash />
              </Button>
              <Button
                onClick={() => dispatch(decrementCartList(cart))}
                className="bg-indigo-600 cursor-pointer hover:opacity-20 text-white dark:bg-gray-500 "
              >
                <Minus />
              </Button>
              <CardDescription className="mx-2 hover:bg-indigo-600 transition-colors delay-200 rounded-sm ease-linear hover:text-white dark:hover:bg-gray-500 lg:text-sm sm:text-sm ">
                Quantity : {quantity}
              </CardDescription>
              <Button
                onClick={() => dispatch(addCartList(cart))}
                className="bg-indigo-600 cursor-pointer hover:opacity-20 text-white dark:bg-gray-500 "
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AlkolCardForCart;
