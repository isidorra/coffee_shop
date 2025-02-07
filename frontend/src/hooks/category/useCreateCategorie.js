import { useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import {useCategoriesContext} from "../../context/CategoriesContext";
import toast from "react-hot-toast";
import axios from "axios";

const useCreateCategorie = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {setCategories} = useCategoriesContext();

  const createCategory = async(name) => {
    setLoading(true);
    try {
        const response = await axios.post("/api/categories", {name}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 201) {
            setCategories((prevCategories) => [...prevCategories, response.data]);
            return true;
        }
    } catch(error) {
        toast.error(error);
    } finally {
        setLoading(false);
    }
  }

  return {loading, createCategory};
}

export default useCreateCategorie