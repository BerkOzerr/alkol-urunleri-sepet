import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const CardDetail = ({ product }) => {
  const {
    description,
    yearDate,
    adi,
    alkolOrani,
    fiyat,
    imagesUrl,
    alkolBoyutu,
  } = product;
  return (
    <>
      <Card className="relative mx-auto max:w-sm max:w-lg pt-0 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center p-4">
          <div className="w-full items-center p-2 my-2 justify-center flex">
            <img
              alt={adi}
              loading="lazy"
              decoding="async"
              class="object-cover hover:shadow-lg shadow-gray-800  inset-0 block hover:scale-110  transition-all delay-250 duration-200 ease-in-out sm:max-h-80 lg:max-h-160"
              src={imagesUrl}
            />
          </div>

          <div className="w-full items-center p-2 my-2 justify-end-safe flex flex-col gap-4 ">
            <CardHeader className="w-full ">
              <CardTitle className="text-8xl w-full text-gray-700 font-bold mb-4">
                {adi}
              </CardTitle>
            </CardHeader>

            <CardDescription className="lg:text-2xl sm:text-md">
              {description}
            </CardDescription>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-4 gap-5 sm:gap-3 ">
              <CardDescription className="lg:text-2xl sm:text-md">
                Boyutu : {alkolBoyutu}
              </CardDescription>
              <CardDescription className="lg:text-2xl sm:text-md">
                Alkol oranı : {alkolOrani}
              </CardDescription>
              <CardDescription className="lg:text-2xl sm:text-md">
                Year : {yearDate}
              </CardDescription>
              <CardDescription className="lg:text-2xl sm:text-md">
                Fiyat : {fiyat}
              </CardDescription>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardDetail;
