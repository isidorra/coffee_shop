import axios from "axios";
import { useEffect, useState } from "react"
import {useProductsContext} from "../../context/ProductsContext";

const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const {setProducts} = useProductsContext();

  useEffect(() => {
    const getProducts = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/products");
            if(response.status === 200) {
                setProducts(response.data);
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getProducts();
  }, [setProducts])

  return {loading};
}

export default useGetProducts