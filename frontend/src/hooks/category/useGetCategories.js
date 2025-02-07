import { useEffect, useState } from "react"
import {useCategoriesContext} from "../../context/CategoriesContext";
import axios from "axios";

const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const {setCategories} = useCategoriesContext();

  useEffect(() => {
    const getCategories = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/categories");
            if(response.status === 200) {
                setCategories(response.data);
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getCategories();
  }, [setCategories])

  return {loading};
}

export default useGetCategories