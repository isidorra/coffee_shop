import axios from "axios";
import { useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import toast from "react-hot-toast";

const useCreateOrder = () => {
  const [loadingOrderCreation, setLoading] = useState(false);
  const {authUser} = useAuthContext();

  const createOrder = async() => {
    setLoading(true);
    try {
        const response = await axios.post("/api/orders", {}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 201) {
            toast.success("Order created successfully!");
            return true;
        }
    } catch(error) {
        const errorMessage = error.response?.data;
        if(error.response?.status === 400) {
            toast.error(errorMessage);
        }
    } finally {
        setLoading(false);
    }
  }

  return {loadingOrderCreation, createOrder};
}

export default useCreateOrder