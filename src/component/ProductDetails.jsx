import { useParams } from "react-router-dom";
import CardDetail from "./CardDetail";
import AllHeader from "./AllHeader";
import { useSelector } from "react-redux";
import AllFooter from "./AllFooter";
const ProductDetails = () => {
  const { id } = useParams();
  const intId = parseInt(id, 10);
  const { products, isLoading, error } = useSelector((state) => state.product);

  return (
    <div>
      <AllHeader />
      <div className="w-full p-12">
        {products.map((product) => {
          if (product.id === intId) {
            return <CardDetail key={id} product={product} />;
          }
        })}
      </div>
      <AllFooter />
    </div>
  );
};

export default ProductDetails;
