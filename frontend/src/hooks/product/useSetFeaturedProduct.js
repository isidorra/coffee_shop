import axios from "axios";
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";

const useSetFeaturedProduct = () => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const {authUser} = useAuthContext();

  const updateProduct = async(productId) => {
    setLoadingUpdate(true);
    try {
        const response = await axios.put(`/api/products/featured/${productId}`, {}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 200) return true;
    } catch(error) {
        console.log(error);
    } finally {
        setLoadingUpdate(false);
    }
  }

  return {loadingUpdate, updateProduct};
}

export default useSetFeaturedProduct