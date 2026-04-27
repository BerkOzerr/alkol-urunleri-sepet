import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import AllBody from "@/component/AllBody";
import AddProduct from "./component/AddProduct";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import ProductDetails from "./component/ProductDetails";
import AddCart from "./component/AddCart";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { updateThema } from "./lib/themaSlice";
import { useDispatch, useSelector } from "react-redux";

export function App() {
  const { thema } = useSelector((state) => state.thema);
  const dispatch = useDispatch();
  useEffect(() => {
    if (thema) {
      dispatch(updateThema(thema));
      document.documentElement.classList.toggle("dark", thema === "dark");
    }
  }, [thema, dispatch]);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AllBody />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/add-cart" element={<AddCart />} />
      </Routes>
    </>
  );
}

export default App;
