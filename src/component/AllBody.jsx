import AlkolList from "./AlkolList";
import AllFooter from "./AllFooter";
import AllHeader from "./AllHeader";

const AllBody = () => {
  return (
    <>
      <div className="w-full text-black dark:text-white">
        <AllHeader />
        <AlkolList />
        <AllFooter />
      </div>
    </>
  );
};

export default AllBody;
