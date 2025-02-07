import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async(email, password) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", {email, password});

            if(response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setAuthUser(response.data);
                toast.success("Welcome back!");
            }
        } catch(error) {
            const errorMessage = error.response?.data || "Registration failed. Please try again.";
            if(error.response?.status === 400) {
                toast.error("Incorrect email or password.");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, login};

}

export default useLogin