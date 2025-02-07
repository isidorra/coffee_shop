import { LoaderIcon } from "react-hot-toast";
import useGetFeaturedProduct from "../../hooks/product/useGetFeaturedProduct";
import { Link } from "react-router-dom";
import AddToCartBtn from "../cart/AddToCartBtn";

const FeaturedProduct = () => {
  const { loading, featuredProduct } = useGetFeaturedProduct();
  return (
    <>
      {loading && <LoaderIcon />}
      {!loading && !featuredProduct && <></>}
      {!loading && featuredProduct && (
        <div className="bg-secondary text-primary">
          <div className="max-container px-5 py-16">
            <img src={`http://localhost:8080/uploads/${featuredProduct.image}`} className="mx-auto h-64"/>
            <p className="uppercase text-center text-sm text-accent">Featured</p>
            <h1 className="text-2xl md:text-4xl text-center">{featuredProduct.name}</h1>
            <p className="text-center text-xl md:text-2xl opacity-70">${featuredProduct.price}</p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mt-7 max-w-[500px] w-full mx-auto">
            <AddToCartBtn productId={featuredProduct.id} quantity={1} stockQuantity={featuredProduct.quantity}/>
            <Link to={`/product/${featuredProduct.id}`} className="bg-dark-gray text-primary w-full p-2 uppercase text-center">See more</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProduct;
