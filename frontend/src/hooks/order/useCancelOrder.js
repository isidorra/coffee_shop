import axios from "axios";
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import { useOrdersContext } from "../../context/OrdersContext";

const useCancelOrder = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {orders, setOrders} = useOrdersContext();

  const cancelOrder = async(id) => {
    setLoading(true);
    try {
        const response = await axios.put(`/api/orders/customer/cancel/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });

        if(response.status === 200) {
            const updatedOrders = orders.map((order) =>
                order.id === id ? response.data : order
              );
      
              setOrders(updatedOrders);
        }
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return {loading, cancelOrder};
}

export default useCancelOrder