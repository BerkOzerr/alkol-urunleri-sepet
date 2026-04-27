import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addCartList } from "../lib/cartSlice";

const AlkolCard = ({ product }) => {
  const { id, adi, alkolOrani, fiyat, imagesUrl, alkolBoyutu } = product;

  const dispatch = useDispatch();

  return (
    <div className="flex w-full items-center justify-center p-12 ">
      <Card className="relative mx-auto w-full max-w-sm pt-0 dark:bg-gray-800 dark:text-white">
        <Link key={id} to={`/product-details/${id}`}>
          <div className="aspect-w-4 aspect-h-3 sm:aspect-w-2 sm:aspect-h-3 lg:aspect-w-5 lg:aspect-h-6 w-full items-center p-2 my-2 justify-center flex">
            <img
              alt={adi}
              loading="lazy"
              decoding="async"
              className="object-cover hover:shadow-lg shadow-gray-800  inset-0 block hover:scale-110 transition-all delay-250 duration-200 ease-in-out sm:max-h-40 lg:max-h-80"
              src={imagesUrl}
            />
          </div>
        </Link>
        <CardHeader className="flex flex-col items-center justify-center w-full gap-2">
          <CardTitle className="font-bold text-2xl">{adi}</CardTitle>
        </CardHeader>
        <div className="w-full flex font-medium text-black dark:text-white flex-col items-end justify-evenly p-2">
          <div className="w-full flex items-center  justify-evenly">
            <span>Alkol Orani : {alkolOrani}%</span>
            <span>Şişe Boyutu : {alkolBoyutu}</span>
          </div>

          <div className="w-full flex items-center mt-2 justify-between">
            <span>
              Fiyat :
              <span className="dark:text-white text-gray-900">{fiyat}</span>
            </span>
            <Button
              onClick={() => dispatch(addCartList(product))}
              className="bg-indigo-600 cursor-pointer hover:opacity-20 text-white dark:bg-gray-500 "
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlkolCard;
