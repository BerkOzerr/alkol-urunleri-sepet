import { useDispatch, useSelector } from "react-redux";
import AlkolCardForCart from "./AlkolCardForCart";
import { clearCartList, getTotal } from "../lib/cartSlice";
import { useEffect } from "react";
import CartListEmpty from "./CartListEmpty";
import LoginBody from "./LoginBody";
import AllHeader from "./AllHeader";
import AllFooter from "./AllFooter";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AddCart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotal());
  }, [cart.cartList]);

  // console.log(cart.cartList.length);
  return (
    <>
      <AllHeader />
      {user.login_user.authonticate ? (
        <>
          {cart.cartList.length === 0 ? (
            <div className="flex items-center justify-center w-full ">
              <CartListEmpty />
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-3">
              {cart.cartSearch.length === 0 ? (
                <>
                  {cart.cartList.map((cart) => {
                    return <AlkolCardForCart key={cart.id} cart={cart} />;
                  })}
                </>
              ) : (
                <>
                  {cart.cartSearch.map((cart) => {
                    return <AlkolCardForCart key={cart.id} cart={cart} />;
                  })}
                </>
              )}

              <Card className="flex h-64 my-4 w-fit justify-center p-4 items-center  mx-auto sm:max-w-xl lg:max-w-full  pt-0 dark:bg-gray-800 dark:text-white">
                <div className="flex  w-240  justify-evenly items-center p-4">
                  <Link to={"/"}>
                    <div className="dark:bg-gray-600 hover:opacity-60 bg-indigo-600 text-white  p-6 rounded-b-sm">
                      <h1>Contiune Shopping...</h1>
                    </div>
                  </Link>
                  <div className="flex items-center justify-center p-4 gap-2">
                    <CardDescription className="text-xl ">
                      Toplam Fiyat
                    </CardDescription>
                    <CardDescription className="text-xl font-bold dark:text-white text-gray-400 ">
                      {" "}
                      {cart.totalAmount}{" "}
                    </CardDescription>
                  </div>
                  <Link to={"/"}>
                    <div className="dark:bg-blue-600 hover:opacity-60 bg-indigo-600 text-white  p-6 rounded-b-sm">
                      <h1>Sepeti Onayla</h1>
                    </div>
                  </Link>

                  <div
                    onClick={() => {
                      dispatch(clearCartList());
                    }}
                    className="cursor-pointer dark:bg-red-600 hover:opacity-60 bg-amber-600 text-white  p-6 rounded-b-sm"
                  >
                    <h1>Sepeti Temizle</h1>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      ) : (
        <LoginBody />
      )}
      <AllFooter />
    </>
  );
};

export default AddCart;
