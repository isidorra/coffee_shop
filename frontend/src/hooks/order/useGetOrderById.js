import axios from "axios";
import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext";

const useGetOrderById = (id) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getOrderById = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${authUser.jwt}`
                }
            });

            if(response.status === 200) {
                setOrder(response.data);
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    getOrderById();
  }, [id, authUser]);

  return {loading, order};
}

export default useGetOrderById