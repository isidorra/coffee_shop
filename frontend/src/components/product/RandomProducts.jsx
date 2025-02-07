import useGetRandomProducts from "../../hooks/product/useGetRandomProducts"
import ProductCard from "./ProductCard";

const RandomProducts = ({productId}) => {
  const {loading, products} = useGetRandomProducts(productId);

  return (
    <div className="max-container px-5 py-12">
      <h3 className="text-2xl font-semibold">You may also like</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {!loading && products && products.map((product) => 
          <ProductCard product={product} key={product.id}/>
        )}
      </div>
    </div>
  )
}

export default RandomProducts