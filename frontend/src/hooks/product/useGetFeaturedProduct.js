import axios from "axios";
import { useEffect, useState } from "react"

const useGetFeaturedProduct = () => {
  const [loading, setLoading] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    const getFeaturedProduct = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/products/featured");
            if(response.status === 200)
                setFeaturedProduct(response.data);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getFeaturedProduct();
  }, [])

  return {loading, featuredProduct};
}

export default useGetFeaturedProduct