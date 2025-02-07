import { useEffect, useState } from "react"
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const useGetCart = () => {
  const [loading, setLoading] = useState(false);
  const {setCartItems} = useCartContext();
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getCart = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${authUser.jwt}`
                }
            });

            if(response.status === 200) {
                setCartItems(response.data);
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getCart();
  }, [authUser, setCartItems]);

  return {loading};
}

export default useGetCart