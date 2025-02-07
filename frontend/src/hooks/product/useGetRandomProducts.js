import axios from "axios";
import { useEffect, useState } from "react"

const useGetRandomProducts = (productId) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getRandomProducts = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/random?productId=${productId}`);
            if(response.status === 200) 
                setProducts(response.data);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getRandomProducts();
  }, [productId]);

  return {loading, products};
}

export default useGetRandomProducts