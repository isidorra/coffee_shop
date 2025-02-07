import { useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();

  const addToCart = async(productId, quantity, stockQuantity) => {
    if(!quantity) return toast.error("Quantity is required.");
    if(quantity <= 0) return toast.error("Quantity must be greater than 0.");
    if(quantity > stockQuantity) return toast.error("Desired quantity not available.");

    setLoading(true);
    try {
        const response = await axios.post("/api/cart", {productId, quantity}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 201) {
            toast.success("Product added to cart!");
        }
    } catch(error) {
        console.log(error); 
    } finally {
        setLoading(false);
    }
  }

  return {loading, addToCart};
}

export default useAddToCart