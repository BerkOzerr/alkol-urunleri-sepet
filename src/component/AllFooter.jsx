import { Bird } from "lucide-react";
import { Link } from "react-router-dom";
const AllFooter = () => {
  return (
    <div className="fixed bottom-8  h-18 z-9999 w-full bg-indigo-600 p-2 text-white dark:bg-gray-800">
      <div className="flex items-center justify-evenly">
        <span className="">Berk Emre Özer Tarafından oluşturuldu.</span>
        <div className="flex items-center justify-center gap-4">
          <Bird className="animate-ping" />
          <Link target="_blank" to={"https://x.com/berkemreozer1"}>
            berkemreozer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllFooter;
