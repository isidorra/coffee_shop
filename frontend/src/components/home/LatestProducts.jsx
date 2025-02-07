import useGetProducts from "../../hooks/product/useGetProducts";
import { useProductsContext } from "../../context/ProductsContext";
import ProductCard from "../product/ProductCard";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const { loading } = useGetProducts();
  const { products } = useProductsContext();

  return (
    <div className="max-container px-5 py-3 mt-10">
        <div className="flex items-center justify-between">
            <h2 className="uppercase text-xl sm:text-2xl font-semibold text-dark-gray">Latest Products</h2>
            <Link to={"/all-products"} className="border-b border-secondary text-lg sm:text-xl">All Products</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {!loading && products && products.slice(0, 4).map((product) =>
                <ProductCard key={product.id} product={product}/> 
            )}
        </div>
    </div>
  )
};

export default LatestProducts;
