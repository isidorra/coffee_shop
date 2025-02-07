import { useState } from "react"
import {useProductsContext} from "../../context/ProductsContext";
import axios from "axios";

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const {setProducts} = useProductsContext();

  const search = async(query) => {
    setLoading(true);
    try {
        const response = await axios.get(`/api/products/search?query=${query}`);
        if(response.status === 200) {
            setProducts(response.data);
        }
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return {loading, search};

}

export default useSearch