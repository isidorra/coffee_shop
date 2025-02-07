import axios from "axios";
import { useEffect, useState } from "react"

const useGetProductsByCategory = (categoryId) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProductsByCategory = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/filter-by-category/${categoryId}`);
            if(response.status === 200)
                setProducts(response.data);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getProductsByCategory();
  }, [categoryId]);

  return {loading, products};
}

export default useGetProductsByCategory