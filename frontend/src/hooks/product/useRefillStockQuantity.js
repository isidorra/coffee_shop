import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import {useAuthContext} from "../../context/AuthContext";
import { useProductsContext } from "../../context/ProductsContext";

const useRefillStockQuantity = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {products, setProducts} = useProductsContext();

  const refillStockQuantity = async(productId, refillQuantity) => {
    if(refillQuantity <= 0) {
        toast.error("Refill quantity must be greater than 0.")
        return false;
    }

    setLoading(true); 
    try {
        const response = await axios.put(`/api/products/refill/${productId}?refillQuantity=${refillQuantity}`, {}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        })

        if(response.status === 200) {
            const updatedProducts = products.map((product) =>
                product.id === productId
                  ? { ...product, stockQuantity: product.stockQuantity + refillQuantity }
                  : product
            );
            setProducts(updatedProducts);
            toast.success("Stock refilled!");
            return true;
        }
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return {loading, refillStockQuantity};
}

export default useRefillStockQuantity