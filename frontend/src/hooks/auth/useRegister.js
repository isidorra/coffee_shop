import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import {useAuthContext} from "../../context/AuthContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const register = async(firstName, lastName, email, password, confirmPassword) => {
    if(!validateInputs(firstName, lastName, email, password, confirmPassword)) return;

    setLoading(true);
    try {
        const response = await axios.post("/api/auth/register", {firstName, lastName, email, password, confirmPassword});

        if(response.status === 201) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setAuthUser(response.data);
            toast.success("Registration successfull!");
        }
    } catch(error) {
        const errorMessage = error.response?.data || "Registration failed. Please try again.";
        if(error.response?.status === 400) {
            toast.error("Email is already taken.");
        } else {
            toast.error(errorMessage);
        }
    } finally {
        setLoading(false);
    }
  }

  return {loading, register};
}

const validateInputs = (firstName, lastName, email, password, confirmPassword) => {
    if(!firstName || !lastName || !email || !password || !confirmPassword) {
        toast.error("All fields are required.")
        return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return false;
    }

    if(password.length < 7) {
        toast.error("Password must be at least 7 characters long.");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Passwords must match.");
        return false;
    }

    return true;
}

export default useRegister