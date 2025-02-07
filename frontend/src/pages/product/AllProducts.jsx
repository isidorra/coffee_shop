import { LoaderIcon } from "react-hot-toast";
import { useProductsContext } from "../../context/ProductsContext";
import useGetProducts from "../../hooks/product/useGetProducts"
import ProductCard from "../../components/product/ProductCard";
import Search from "../../components/product/Search";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
const AllProducts = () => {
    const {loading} = useGetProducts();
    const {products, setProducts} = useProductsContext();

    const sortAsc = () => {
        const sorted = [...products].sort((a, b) => a.price - b.price);
        setProducts(sorted);
    };

    const sortDesc = () => {
        const sorted = [...products].sort((a, b) => b.price - a.price);
        setProducts(sorted);
    };
    
  return (
    <div className="max-container px-5 py-3 mt-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="uppercase text-xl sm:text-2xl font-semibold text-dark-gray">Products</h1>

            <div className="flex items-center gap-3">
                <button onClick={sortAsc} className="flex items-center gap-1 text-sm border border-secondary/50 p-[2px] sm:p-2">Price <FaArrowTrendUp /></button>
                <button onClick={sortDesc} className="flex items-center gap-1 text-sm border border-secondary/50 p-[2px] sm:p-2">Price <FaArrowTrendDown /></button>
                <Search/>
            </div>
        </div>
        {loading && <LoaderIcon/>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
            {!loading && products && products.map((product) => 
                <ProductCard product={product} key={product.id} />
            )}
        </div>

    </div>
  )
}

export default AllProducts