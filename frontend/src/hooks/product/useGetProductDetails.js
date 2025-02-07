import axios from "axios";
import { useEffect, useState } from "react"

const useGetProductDetails = (id) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/${id}`);
            if(response.status === 200) {
                setProduct(response.data);
            }
        } catch(error) {
            console.log(error); 
        } finally {
            setLoading(false);
        }
    }

    getProductDetails();
  }, [id])

  return {loading, product};
}

export default useGetProductDetails