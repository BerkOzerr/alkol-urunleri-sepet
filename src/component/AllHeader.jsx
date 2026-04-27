import { Input } from "@/components/ui/input";
import {
  House,
  ShoppingCart,
  Search,
  Plus,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateThema } from "../lib/themaSlice";
import { Logout, registerClickOpen } from "../lib/userSlice";
import { getTotal, searchCard } from "../lib/cartSlice";
import { searchProduct } from "../lib/productSlice";
const AllHeader = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { thema } = useSelector((state) => state.thema);
  const { products, productsSearch } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleChanges = (e) => {
    const temp = products.filter((item) =>
      item.adi.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    const temp1 = cart.cartList.filter((item) =>
      item.adi.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    // console.log(temp);

    dispatch(searchProduct(temp));
    dispatch(searchCard(temp1));
  };

  const handleAddCartClick = () => {
    dispatch(searchCard());
  };
  const handleProductCartClick = () => {
    dispatch(searchProduct());
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart.cartList, dispatch]);
  return (
    <div className="mb-4 flex w-full items-center justify-between bg-indigo-600 p-8 text-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <Link to={"/"}>
          <h1 className="text-5xl hover:text-amber-700 font-bold">
            Shopping Cart
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4">
          {thema === "light" ? (
            <Moon
              onClick={() => {
                dispatch(updateThema("dark"));
              }}
              fill={thema === "dark" ? "#d508ec96" : "#e3e3e3"}
              className=" hover:fill-indigo-400  hover:animate-pulse transition delay-150 duration-300 ease-in-out hover:-translate-x-1 "
            />
          ) : (
            <Sun
              onClick={() => {
                dispatch(updateThema("light"));
              }}
              fill={thema === "light" ? "#f3ff0bdd" : "#e3e3e3"}
              className="hover:fill-amber-400 hover:animate-spin transition delay-150 duration-300 ease-in-out hover:-translate-x-1 "
            />
          )}
        </div>
        <Link onClick={() => handleProductCartClick()} to="/">
          <House className="hover:scale-120" />
        </Link>
        <Link to="/add-product">
          <Plus className="hover:scale-120" />
        </Link>
        <Link onClick={() => handleAddCartClick()} to="/add-cart">
          <div className="relative p-3">
            <span className="absolute top-0 right-1 font-bold hover:animate-bounce">
              {cart.totalQuantity ? cart.totalQuantity : 0}
            </span>
            <ShoppingCart />
          </div>
        </Link>

        <div className="relative">
          <Input
            onChange={(e) => handleChanges(e)}
            placeholder="Search"
            type="text"
            pattern="[a-z]+"
            className="placeholer:text-white text-start dark:placeholder:text-white  text-white hover:border-amber-400"
          />
          <Search className="cursor-pointer absolute top-1 right-1 transition-all delay-200 duration-100 hover:animate-ping" />
        </div>
        <div className="flex items-center justify-center p-3 gap-2">
          {user.login_user.authonticate ? (
            <div
              onClick={() => dispatch(Logout())}
              className=" text-xl p-1 rounded-xs   hover:text-blue-500  transition-all delay-150 duration-300 ease-in-out "
            >
              <Link to="/login">
                {" "}
                <LogOut />
              </Link>
            </div>
          ) : (
            <>
              <div className=" text-xl p-1 rounded-xs   hover:text-blue-500  transition-all delay-150 duration-300 ease-in-out ">
                <Link to="/login">Login</Link>
              </div>
              <div className="p-1 text-xl rounded-xs bg-blue-500  hover:bg-blue-600 transition-colors delay-150 duration-300 ease-in-out ">
                <Link
                  onClick={() => {
                    dispatch(registerClickOpen());
                  }}
                  to="/register"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHeader;
