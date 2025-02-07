import { useParams } from "react-router-dom";
import useGetProductDetails from "../../hooks/product/useGetProductDetails";
import { LoaderIcon } from "react-hot-toast";
import { useState } from "react";
import AddToCartBtn from "../../components/cart/AddToCartBtn";
import { useAuthContext } from "../../context/AuthContext";
import RandomProducts from "../../components/product/RandomProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { loading, product } = useGetProductDetails(id);
  const [quantity, setQuantity] = useState(1);
  const {authUser} = useAuthContext();

  const handleDescreaseQuantity = () => {
    if(quantity - 1 > 0) 
      setQuantity(quantity-1);
  }
  const handleIncreaseQuantity = () => {
    if(quantity + 1 < product.stockQuantity) 
      setQuantity(quantity+1);
  }

  return (
    <div>
      <div className="bg-secondary">
        {loading && <LoaderIcon />}
        {!loading && !product && <p>No product found.</p>}
        {!loading && product && (
          <div className="max-container px-5 py-16 text-primary">
            <div>
              <img
                src={`http://localhost:8080/uploads/${product.image}`}
                className="mx-auto h-64"
              />
            </div>

            <div>
              <h1 className="uppercase text-2xl font-semibold text-primary text-center">
                {product.name}
              </h1>
              <p
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="max-w-[600px] text-center mx-auto opacity-80 mt-3"
              ></p>
              <p className="text-center text-xl mt-5">$ {product.price}</p>
            </div>

            {(!authUser || authUser && authUser.role === "CUSTOMER") &&
              <div className="flex items-center gap-5 max-w-96 mx-auto mt-5">
              <AddToCartBtn quantity={quantity} productId={product.id} stockQuantity={product.stockQuantity}/>
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={handleDescreaseQuantity}
                  className="border border-primary py-[1px] px-3 hover:bg-primary/30 duration-200"
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={handleIncreaseQuantity}
                  className="border border-primary py-[1px] px-3 hover:bg-primary/30 duration-200"
                >
                  +
                </button>
              </div>
            </div>
            }
          </div>
        )}
      </div>

      {!loading && product && <RandomProducts productId={product.id}/>}
    </div>
  );
};

export default ProductDetails;
