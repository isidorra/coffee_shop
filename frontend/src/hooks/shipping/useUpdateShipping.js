import axios from "axios";
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";

const useUpdateShipping = () => {
  const [loadingUpdateShipping, setLoading] = useState(false);
  const {authUser} = useAuthContext();

  const updateShipping = async(price) => {
    setLoading(true);
    try {
        const response = await axios.put("/api/shipping-price", {price}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 200)
            return true;
    } catch(error) {    
        console.log(error);
    } finally {
         setLoading(false);
    }
  }

  return {loadingUpdateShipping, updateShipping};
}

export default useUpdateShipping