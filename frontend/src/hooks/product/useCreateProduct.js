import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useCreateProduct = () => {
  const [loadingCreating, setLoading] = useState(false);
  const {authUser} = useAuthContext();

  const createProduct = async(name, description, category, price, stockQuantity, file) => {
    if(!validateInputs(name, description, category, price, stockQuantity, file)) return;

    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("file", file);
        const createProductDto = {name, description, categoryId: category, price: parseFloat(price), stockQuantity: parseInt(stockQuantity)};

        formData.append("createProductDto", new Blob([JSON.stringify(createProductDto)], { type: "application/json" }));
        
        const response = await axios.post("/api/products", formData, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`,
                "Content-Type": "multipart/form-data",
            }
        })

        if (response.status === 201) {
            toast.success("Product created successfully.");
            return true;
        }
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return {loadingCreating, createProduct};
}

const validateInputs = (name, description, category, price, stockQuantity, file) => {
    if(!name || !description || !category || !price || !stockQuantity || !file) {
        toast.error("All fields are required.");
        return false;
    }

    if(price <= 0) {
        toast.error("Price must be greater than 0.");
        return false;
    }

    if(stockQuantity <= 0) {
        toast.error("Stock quantity must be greater than 0.");
        return false;
    }

    return true;
}

export default useCreateProduct