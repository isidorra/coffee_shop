import { Link } from "react-router-dom"
import AddToCartBtn from "../cart/AddToCartBtn"

const ProductCard = ({product}) => {
  return (
    <div className="bg-secondary text-primary px-5 py-10">
        <img src={`http://localhost:8080/uploads/${product.image}`} className="h-40 mx-auto"/>
        <p className="text-center text-xl">{product.name}</p>
        <p className="opacity-75 text-center">$ {product.price}</p>

        <div className="flex flex-col items-center gap-3 justify-center mt-7">
            <AddToCartBtn productId={product.id} quantity={1} stockQuantity={product.quantity}/>
            <Link to={`/product/${product.id}`} className="bg-dark-gray text-primary w-full p-2 uppercase text-center">See more</Link>
        </div>
    </div>
  )
}

export default ProductCard